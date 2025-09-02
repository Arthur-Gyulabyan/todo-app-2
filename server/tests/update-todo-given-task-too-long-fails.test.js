import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'update-todo-given-task-too-long-fails.feature'));

defineFeature(feature, test => {
  let todoId;
  const originalTask = "Review project proposal";
  const tooLongTask = "This is a very, very long task that definitely exceeds forty characters for a todo item, so it should fail.";
  let updateResponse;
  let getResponse;

  test(
    "Given a todo exists, when a client sends an 'Update Todo' command with a new task that is longer than 40 characters, then the todo's task should not be updated and an error indicating 'Task Too Long' should be returned.",
    ({ given, when, then }) => {
      given('a todo exists', async () => {
        const createResponse = await request(app)
          .post('/api/v1/create-todo')
          .send({ task: originalTask });

        expect(createResponse.statusCode).toBe(200);
        expect(createResponse.body).toHaveProperty('todoID');
        expect(createResponse.body.task).toBe(originalTask);
        todoId = createResponse.body.todoID;
      });

      when("a client sends an 'Update Todo' command with a new task that is longer than 40 characters", async () => {
        updateResponse = await request(app)
          .post('/api/v1/update-todo')
          .send({ todoID: todoId, task: tooLongTask });
      });

      then("the todo's task should not be updated and an error indicating 'Task Too Long' should be returned.", async () => {
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body).toHaveProperty('message');
        expect(updateResponse.body.message).toBe("Task Too Long"); // Assuming the exact error message from the API implementation

        // Verify the todo's task was not updated by retrieving all todos and checking the specific one
        getResponse = await request(app)
          .get('/api/v1/get-all-todos');

        expect(getResponse.statusCode).toBe(200);
        const retrievedTodo = getResponse.body.find(todo => todo.todoID === todoId);
        expect(retrievedTodo).toBeDefined();
        expect(retrievedTodo.task).toBe(originalTask); // Ensure the task remains the original one
      });
    }
  );
});