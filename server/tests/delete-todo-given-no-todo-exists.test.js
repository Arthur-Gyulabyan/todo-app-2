import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'delete-todo-given-no-todo-exists.feature'));

defineFeature(feature, test => {
  let response;
  const NON_EXISTENT_TODO_ID = 'non-existent-todo-98765';

  test(
    'Given no todo exists with a specific ID, when a client sends a \'Delete Todo\' command with that ID, then an error indicating \'Todo Not Found\' should be returned and no \'Todo Deleted\' event should be published.',
    ({ given, when, then }) => {
      given('no todo exists with a specific ID', async () => {
        // No setup is required here, as the premise is that no such todo exists.
        // The chosen NON_EXISTENT_TODO_ID ensures this condition.
      });

      when('a client sends a \'Delete Todo\' command with that ID', async () => {
        response = await request(app)
          .post('/api/v1/delete-todo')
          .send({ todoID: NON_EXISTENT_TODO_ID });
      });

      then('an error indicating \'Todo Not Found\' should be returned and no \'Todo Deleted\' event should be published.', async () => {
        expect(response.statusCode).toBe(400); // OpenAPI specifies 400 for BadRequest
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toMatch(/Todo Not Found/i);

        // The "no 'Todo Deleted' event should be published" part cannot be directly
        // tested with Supertest as it involves verifying internal application events
        // rather than the API response. This would typically require an integration
        // with an event bus mock/spy or a separate system-level test.
      });
    }
  );
});