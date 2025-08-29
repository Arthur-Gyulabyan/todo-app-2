import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'create-todo-client-creates-new-todo-and-is-saved.feature'));

defineFeature(feature, test => {
  let response;
  let createdTodoId;
  let requestBody;

  test(
    "Given a client wants to create a new todo, when they send a 'Create Todo' command with a task, then a 'Todo Created' event occurs and the new todo is saved.",
    ({ given, when, then }) => {
      given('a client wants to create a new todo', () => {
        // No specific setup needed for this given step as we are creating a new todo.
      });

      when(/^they send a 'Create Todo' command with a task "([^"]*)"$/, async (task) => {
        requestBody = { task };
        response = await request(app)
          .post('/api/v1/create-todo')
          .send(requestBody);
      });

      then(/^a 'Todo Created' event occurs and the new todo is saved$/, async () => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('todoID');
        expect(response.body).toHaveProperty('task', requestBody.task);
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('updatedAt');

        createdTodoId = response.body.todoID;

        // Verify dates against the specified current date, allowing for small processing delays
        const expectedDateString = '2025-08-29T07:47:37.816Z';
        const expectedDate = new Date(expectedDateString);
        const createdAt = new Date(response.body.createdAt);
        const updatedAt = new Date(response.body.updatedAt);

        // Allow a small tolerance for the date comparison (e.g., 100 milliseconds)
        const dateToleranceMs = 100;
        expect(Math.abs(createdAt.getTime() - expectedDate.getTime())).toBeLessThanOrEqual(dateToleranceMs);
        expect(Math.abs(updatedAt.getTime() - expectedDate.getTime())).toBeLessThanOrEqual(dateToleranceMs);

        // Verify the newly created todo can be retrieved by its ID
        const getResponse = await request(app).get(`/api/v1/get-todo-by-id?todoID=${createdTodoId}`);
        expect(getResponse.statusCode).toBe(200);
        expect(getResponse.body).toEqual(response.body); // Ensure the fetched todo matches the one from the creation response
      });
    }
  );
});