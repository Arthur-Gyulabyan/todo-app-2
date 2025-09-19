import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'delete-todo-given-no-todo-with-id-exists.feature'));

defineFeature(feature, test => {
  let todoIdToDelete;
  let response;

  test(
    'Given no todo exists with a specific ID, when a client sends a \'Delete Todo\' command with that ID, then an error indicating \'Todo Not Found\' should be returned.',
    ({ given, when, then }) => {
      given('no todo exists with a specific ID', () => {
        // We ensure no todo with this ID exists by using a unique, non-existent ID.
        // In a real scenario, you might query to ensure non-existence, but for a
        // 'not found' case, a fresh, unlikely-to-exist ID is sufficient.
        todoIdToDelete = 'non-existent-todo-id-12345';
      });

      when('a client sends a \'Delete Todo\' command with that ID', async () => {
        response = await request(app)
          .post('/api/v1/delete-todo')
          .send({ id: todoIdToDelete });
      });

      then('an error indicating \'Todo Not Found\' should be returned', async () => {
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('message');
        expect(typeof response.body.message).toBe('string');
      });
    }
  );
});