import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'delete-todo-given-no-todo-exists.feature'));

defineFeature(feature, test => {
  let nonExistentTodoId;
  let response;

  test(
    'Given no todo exists with a specific ID, when a client sends a \'Delete Todo\' command with that ID, then an error indicating \'Todo Not Found\' should be returned and no \'Todo Deleted\' event should be published.',
    ({ given, when, then }) => {
      given('no todo exists with a specific ID', () => {
        nonExistentTodoId = uuidv4(); // Generate a unique ID that we know doesn't exist
      });

      when('a client sends a \'Delete Todo\' command with that ID', async () => {
        response = await request(app)
          .post('/api/v1/delete-todo')
          .send({ id: nonExistentTodoId });
      });

      then('an error indicating \'Todo Not Found\' should be returned and no \'Todo Deleted\' event should be published.', async () => {
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message');
        expect(typeof response.body.message).toBe('string');
        // Specific message for not found is "Todo Not Found" as per typical convention for 404 in this context.
        expect(response.body.message).toBe('Todo Not Found');
      });
    }
  );
});