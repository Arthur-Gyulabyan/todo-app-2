import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'create-todo-given-a-client-wants-to-create-a-new-todo.feature'));

defineFeature(feature, test => {
  let response;
  let todoData = {};
  const fixedCurrentDate = '2025-08-29T07:23:37.779Z'; // Fixed date as per instructions

  test(
    'Given a client wants to create a new todo, when they send a \'Create Todo\' command with a task, then a \'Todo Created\' event occurs and the new todo is saved.',
    ({ given, when, then }) => {
      given('a client wants to create a new todo', () => {
        todoData = {
          task: 'Review project proposal',
        };
      });

      when('they send a \'Create Todo\' command with a task', async () => {
        response = await request(app)
          .post('/api/v1/create-todo')
          .send(todoData);
      });

      then('a \'Todo Created\' event occurs and the new todo is saved', async () => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(typeof response.body.todoID).toBe('string');
        expect(response.body.todoID.length).toBeGreaterThan(0);
        expect(response.body.task).toBe(todoData.task);
        expect(response.body.createdAt).toBe(fixedCurrentDate);
        expect(response.body.updatedAt).toBe(fixedCurrentDate);

        // Optionally, verify by fetching the created todo
        const getResponse = await request(app)
          .get(`/api/v1/get-todo-by-id?todoID=${response.body.todoID}`);
        
        expect(getResponse.statusCode).toBe(200);
        expect(getResponse.body).toEqual(response.body);
      });
    }
  );
});