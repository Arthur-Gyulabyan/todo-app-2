import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'create-todo-given-a-client-wants-to-create-a-new-todo.feature'));

defineFeature(feature, test => {
  let requestBody;
  let response;
  let createdTodo;

  test(
    'Given a client wants to create a new todo, when they send a \'Create Todo\' command with a task, then a \'Todo Created\' event occurs and the new todo is saved.',
    ({ given, when, then }) => {
      given('a client wants to create a new todo', () => {
        requestBody = {
          task: "Prepare Q4 budget report",
        };
      });

      when("they send a 'Create Todo' command with a task", async () => {
        response = await request(app)
          .post('/api/v1/create-todo')
          .send(requestBody);
        createdTodo = response.body;
      });

      then("a 'Todo Created' event occurs and the new todo is saved", async () => {
        expect(response.statusCode).toBe(200);
        expect(createdTodo).toHaveProperty('todoID');
        expect(typeof createdTodo.todoID).toBe('string');
        expect(createdTodo.todoID).not.toBe('');
        expect(createdTodo.task).toBe(requestBody.task);
        expect(createdTodo).toHaveProperty('createdAt');
        expect(createdTodo).toHaveProperty('updatedAt');

        // Validate date formats
        expect(() => new Date(createdTodo.createdAt).toISOString()).not.toThrow();
        expect(() => new Date(createdTodo.updatedAt).toISOString()).not.toThrow();

        // Ensure createdAt and updatedAt are roughly the current time (2025-08-29T11:01:28.626Z)
        const expectedDate = new Date('2025-08-29T11:01:28.626Z');
        const receivedCreatedAt = new Date(createdTodo.createdAt);
        const receivedUpdatedAt = new Date(createdTodo.updatedAt);

        // Allow a small margin (e.g., 5 seconds) for processing time differences
        const timeToleranceMs = 5000;
        expect(Math.abs(receivedCreatedAt.getTime() - expectedDate.getTime())).toBeLessThanOrEqual(timeToleranceMs);
        expect(Math.abs(receivedUpdatedAt.getTime() - expectedDate.getTime())).toBeLessThanOrEqual(timeToleranceMs);
        expect(receivedUpdatedAt.getTime()).toBeGreaterThanOrEqual(receivedCreatedAt.getTime());
      });
    }
  );
});