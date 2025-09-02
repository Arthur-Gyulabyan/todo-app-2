import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'delete-todo-given-no-todo-exists-with-id.feature'));

defineFeature(feature, test => {
  let nonExistentTodoId;
  let response;

  test(
    'Given no todo exists with a specific ID, when a client sends a \'Delete Todo\' command with that ID, then an error indicating \'Todo Not Found\' should be returned and no \'Todo Deleted\' event should be published.',
    ({ given, when, then }) => {
      given('no todo exists with a specific ID', async () => {
        // Generate a unique ID that is highly unlikely to exist
        nonExistentTodoId = `todo-${crypto.randomUUID()}`;
      });

      when('a client sends a \'Delete Todo\' command with that ID', async () => {
        response = await request(app)
          .post('/api/v1/delete-todo')
          .send({ todoID: nonExistentTodoId });
      });

      then('an error indicating \'Todo Not Found\' should be returned and no \'Todo Deleted\' event should be published.', async () => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toMatch(/Todo Not Found/i);
      });
    }
  );
});