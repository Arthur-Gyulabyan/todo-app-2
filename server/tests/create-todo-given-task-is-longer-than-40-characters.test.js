import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'create-todo-given-task-is-longer-than-40-characters.feature'));

defineFeature(feature, test => {
  let requestBody;
  let response;

  test(
    'Given a client wants to create a new todo, when the task is longer than 40 characters, then the task should not be created.',
    ({ given, when, then }) => {
      given('a client wants to create a new todo', async () => {
        // No setup needed beyond preparing for the 'when' step
      });

      when('the task is longer than 40 characters', async () => {
        const longTask = 'This is an excessively long task description that definitely goes beyond forty characters in length.'; // 97 characters
        requestBody = {
          task: longTask,
        };

        response = await request(app)
          .post('/api/v1/create-todo')
          .send(requestBody);
      });

      then('the task should not be created.', async () => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(typeof response.body.message).toBe('string');
      });
    }
  );
});