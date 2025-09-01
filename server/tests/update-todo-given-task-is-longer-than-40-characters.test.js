import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'update-todo-given-task-is-longer-than-40-characters.feature'));

defineFeature(feature, test => {
  let todoId;
  const initialTask = "Initial task for update validation";
  const longTask = "This is a very very very very very very very long task that exceeds forty characters in length."; // 90 characters long
  let response;
  let originalTodo;

  test(
    "Given a todo exists, when a client sends an 'Update Todo' command with a new task that is longer than 40 characters, then the todo's task should not be updated and an error indicating 'Task Too Long' should be returned.",
    ({ given, when, then }) => {
      given('a todo exists', async () => {
        const createResponse = await request(app)
          .post('/api/v1/create-todo')
          .send({ task: initialTask });

        expect(createResponse.statusCode).toBe(200);
        expect(createResponse.body).toHaveProperty('todoID');
        expect(createResponse.body.task).toBe(initialTask);
        todoId = createResponse.body.todoID;

        const getResponse = await request(app)
          .get(`/api/v1/get-todo-by-id?todoID=${todoId}`);
        expect(getResponse.statusCode).toBe(200);
        originalTodo = getResponse.body;
        expect(originalTodo.todoID).toBe(todoId);
        expect(originalTodo.task).toBe(initialTask);
      });

      when("a client sends an 'Update Todo' command with a new task that is longer than 40 characters", async () => {
        response = await request(app)
          .post('/api/v1/update-todo')
          .send({
            todoID: todoId,
            task: longTask,
          });
      });

      then("the todo's task should not be updated and an error indicating 'Task Too Long' should be returned.", async () => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('Task Too Long');

        const getResponseAfterUpdate = await request(app)
          .get(`/api/v1/get-todo-by-id?todoID=${todoId}`);
        expect(getResponseAfterUpdate.statusCode).toBe(200);
        const currentTodo = getResponseAfterUpdate.body;
        expect(currentTodo.todoID).toBe(todoId);
        expect(currentTodo.task).toBe(initialTask); // Verify task remains unchanged
        expect(currentTodo.updatedAt).toBe(originalTodo.updatedAt); // Verify updatedAt is also unchanged
      });
    }
  );
});