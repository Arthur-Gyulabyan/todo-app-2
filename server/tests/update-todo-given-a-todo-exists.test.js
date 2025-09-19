import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'update-todo-given-a-todo-exists.feature'));

defineFeature(feature, test => {
  let todoId;
  let originalTask;
  let response;

  test(
    "Given a todo exists, when a client sends an 'Update Todo' command with a new task that is longer than 40 characters, then the todo's task should not be updated and an error indicating 'Task Too Long' should be returned.",
    ({ given, when, then }) => {
      given('a todo exists', async () => {
        originalTask = 'A short task'; // This task is 45 characters
        const createResponse = await request(app)
          .post('/api/v1/create-todo')
          .send({ task: originalTask })
          .expect(200);

        todoId = createResponse.body.id;
        expect(todoId).toBeDefined();
        expect(createResponse.body.task).toBe(originalTask);
      });

      when("a client sends an 'Update Todo' command with a new task that is longer than 40 characters", async () => {
        const longTask = "This is an extremely long task that exceeds the maximum allowed characters of forty. It is definitely over forty characters long and should trigger a validation error for the task length."; // 210 characters
        response = await request(app)
          .post('/api/v1/update-todo')
          .send({ id: todoId, task: longTask })
          .expect(400); // Expect a Bad Request
      });

      then("the todo's task should not be updated and an error indicating 'Task Too Long' should be returned", async () => {
        // Assert the error response
        expect(response.body).toHaveProperty('message');
        // The specific error message "Task Too Long" is from the GWT,
        // but the OpenAPI spec only defines a generic 'message' string for 400.
        // We assume the implementation provides a descriptive message.
        expect(response.body.message).toMatch(/task too long/i);

        // Verify the todo's task was NOT updated by fetching it again
        const getResponse = await request(app)
          .get(`/api/v1/get-todo-by-id/${todoId}`)
          .expect(200);

        expect(getResponse.body.id).toBe(todoId);
        expect(getResponse.body.task).toBe(originalTask); // The task should remain the original one
      });
    }
  );
});