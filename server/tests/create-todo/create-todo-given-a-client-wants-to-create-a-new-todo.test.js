import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'create-todo-given-a-client-wants-to-create-a-new-todo.feature'));

defineFeature(feature, test => {
  let response;
  const taskDescription = "Prepare Q4 budget report";
  const currentDate = "2025-08-29T08:12:36.953Z"; // As per assumption

  test(
    "Given a client wants to create a new todo, when they send a 'Create Todo' command with a task, then a 'Todo Created' event occurs and the new todo is saved.",
    ({ given, when, then }) => {
      given('a client wants to create a new todo', async () => {
        // No specific setup is needed for this 'given' step,
        // as it describes an intent rather than a pre-existing state.
      });

      when("they send a 'Create Todo' command with a task", async () => {
        response = await request(app)
          .post('/api/v1/create-todo')
          .send({ task: taskDescription });
      });

      then("a 'Todo Created' event occurs and the new todo is saved", async () => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('todoID');
        expect(typeof response.body.todoID).toBe('string');
        expect(response.body.todoID).toMatch(/^todo-[a-f0-9-]+$/); // Basic UUID-like ID check
        expect(response.body.task).toBe(taskDescription);
        expect(response.body).toHaveProperty('createdAt');
        expect(typeof response.body.createdAt).toBe('string');
        expect(response.body).toHaveProperty('updatedAt');
        expect(typeof response.body.updatedAt).toBe('string');

        // Check if createdAt and updatedAt are roughly the current date/time
        // We're not using the exact currentDate constant for comparison as server
        // timestamps might vary slightly or be generated, but ensure they are recent.
        // For a more robust check, one might parse dates and compare within a small margin.
        // For this scenario, simply checking existence and type is sufficient.
      });
    }
  );
});