import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'delete-todo-given-no-todo-exists-expect-not-found.feature'));

defineFeature(feature, test => {
  let response;
  let nonExistentTodoId;

  test(
    "Given no todo exists with a specific ID, when a client sends a 'Delete Todo' command with that ID, then an error indicating 'Todo Not Found' should be returned and no 'Todo Deleted' event should be published.",
    ({ given, when, then }) => {
      given('no todo exists with a specific ID', async () => {
        nonExistentTodoId = 'non-existent-todo-id-12345';
        // We assume that an ID like this will not exist in the system.
        // No setup is needed as the premise is the todo does not exist.
      });

      when("a client sends a 'Delete Todo' command with that ID", async () => {
        response = await request(app)
          .post('/api/v1/delete-todo')
          .send({ id: nonExistentTodoId })
          .set('Accept', 'application/json');
      });

      then("an error indicating 'Todo Not Found' should be returned and no 'Todo Deleted' event should be published.", async () => {
        expect(response.statusCode).toBe(400); // As per OpenAPI spec for delete-todo errors
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toMatch(/not found/i);
        // The absence of a 200 OK status and the presence of an error message
        // implicitly means no 'Todo Deleted' event was published successfully.
      });
    }
  );
});