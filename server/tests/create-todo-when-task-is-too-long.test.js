import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'create-todo-when-task-is-too-long.feature'));

defineFeature(feature, test => {
  let response;
  // A task longer than 40 characters
  const longTask = "This is a very, very long task that definitely exceeds forty characters in length, demonstrating an invalid input scenario.";

  test(
    'Given a client wants to create a new todo, when the task is longer than 40 characters, then the task should not be created.',
    ({ given, when, then }) => {
      given('a client wants to create a new todo', async () => {
        // No specific setup is needed here as the scenario describes an attempt to create
        // that is expected to fail due to validation.
      });

      when('the task is longer than 40 characters', async () => {
        response = await request(app)
          .post('/api/v1/create-todo')
          .send({
            task: longTask,
          })
          .set('Accept', 'application/json');
      });

      then('the task should not be created.', async () => {
        expect(response.statusCode).toBe(400); // Expect a Bad Request status
        expect(response.body).toHaveProperty('message'); // The API should return an error message
        expect(typeof response.body.message).toBe('string');
        // Optionally, if the API has a specific error message for this validation:
        // expect(response.body.message).toContain('Task cannot exceed 40 characters');
      });
    }
  );
});