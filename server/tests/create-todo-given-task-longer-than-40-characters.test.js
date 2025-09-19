import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'create-todo-given-task-longer-than-40-characters.feature'));

defineFeature(feature, test => {
  let requestBody;
  let response;

  test(
    'Given a client wants to create a new todo, when the task is longer than 40 characters, then the task should not be created.',
    ({ given, when, then }) => {
      given('a client wants to create a new todo', () => {
        // No specific setup needed for this 'given' step, requestBody will be defined in 'when'.
      });

      when('the task is longer than 40 characters', async () => {
        requestBody = {
          task: 'This is a very, very, very, very long task that clearly exceeds the forty character limit and should trigger a validation error.'
        };
        response = await request(app).post('/api/v1/create-todo').send(requestBody);
      });

      then('the task should not be created.', async () => {
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(typeof response.body.message).toBe('string');
      });
    }
  );
});