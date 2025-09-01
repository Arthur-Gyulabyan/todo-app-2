import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'create-todo-given-client-wants-to-create-new-todo-when-task-is-longer-than-40-characters-then-task-should-not-be-created.feature'));

defineFeature(feature, test => {
  let response;
  const longTask = "This is a very, very long task that definitely exceeds forty characters in length as per the requirements.";

  test(
    'Given a client wants to create a new todo, when the task is longer than 40 characters, then the task should not be created.',
    ({ given, when, then }) => {
      given('a client wants to create a new todo', async () => {
        // No specific setup needed for this 'given' step, as it states intent.
      });

      when('the task is longer than 40 characters', async () => {
        response = await request(app)
          .post('/api/v1/create-todo')
          .send({ task: longTask });
      });

      then('the task should not be created.', async () => {
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBeDefined();

        // Further verify that the todo was not created by checking if no todoID is returned
        expect(response.body).not.toHaveProperty('todoID');
      });
    }
  );
});