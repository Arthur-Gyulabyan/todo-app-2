import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'update-todo-task-longer-than-40-chars.feature'));

const CURRENT_DATE = '2025-09-18T07:40:14.819Z';

defineFeature(feature, test => {
  let todoId;
  let apiResponse;
  const initialTask = 'Original task for validation test';
  const longTask = 'This is a very very long task exceeding the forty character limit by a considerable margin.'; // Length: 91

  test(
    "Given a todo exists, when a client sends an 'Update Todo' command with a new task that is longer than 40 characters, then the todo's task should not be updated and an error indicating 'Task Too Long' should be returned.",
    ({ given, when, then }) => {
      given('a todo exists', async () => {
        const createResponse = await request(app)
          .post('/api/v1/create-todo')
          .send({
            task: initialTask
          });

        expect(createResponse.statusCode).toBe(200);
        expect(createResponse.body).toHaveProperty('id');
        expect(createResponse.body.task).toBe(initialTask);
        todoId = createResponse.body.id;
      });

      when("a client sends an 'Update Todo' command with a new task that is longer than 40 characters", async () => {
        apiResponse = await request(app)
          .post('/api/v1/update-todo')
          .send({
            id: todoId,
            task: longTask
          });
      });

      then("the todo's task should not be updated and an error indicating 'Task Too Long' should be returned.", async () => {
        expect(apiResponse.statusCode).toBe(400);
        expect(apiResponse.body).toHaveProperty('message');
        expect(apiResponse.body.message).toMatch(/Task Too Long/i);

        const getTodoResponse = await request(app)
          .get(`/api/v1/get-todo-by-id/${todoId}`);
        
        expect(getTodoResponse.statusCode).toBe(200);
        expect(getTodoResponse.body.task).toBe(initialTask);
      });
    }
  );
});