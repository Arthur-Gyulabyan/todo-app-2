import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'update-todo-given-a-todo-exists.feature'));

defineFeature(feature, test => {
  let createdTodoId;
  let initialCreatedAt;
  let response;

  test(
    'Given a todo exists, when a client sends an \'Update Todo\' command with a new task and the todo ID, then a \'Todo Updated\' event occurs and the todo\'s task is modified.',
    ({ given, when, then }) => {
      given('a todo exists', async () => {
        const createResponse = await request(app)
          .post('/api/v1/create-todo')
          .send({ task: 'Initial Task' })
          .expect(200);

        createdTodoId = createResponse.body.todoID;
        initialCreatedAt = createResponse.body.createdAt;
      });

      when(/^a client sends an 'Update Todo' command with a new task "([^"]*)" and the todo ID$/, async (newTask) => {
        response = await request(app)
          .post('/api/v1/update-todo')
          .send({ todoID: createdTodoId, task: newTask })
          .expect(200);
      });

      then(/^a 'Todo Updated' event occurs and the todo's task is modified to "([^"]*)"$/, async (expectedTask) => {
        expect(response.body).toBeDefined();
        expect(response.body.todoID).toBe(createdTodoId);
        expect(response.body.task).toBe(expectedTask);
        
        // Ensure updatedAt timestamp is updated and after createdAt
        expect(response.body.updatedAt).toBeDefined();
        expect(new Date(response.body.updatedAt).getTime()).toBeGreaterThanOrEqual(new Date(initialCreatedAt).getTime());

        // Optionally, verify by fetching the todo
        const fetchResponse = await request(app)
          .get('/api/v1/get-todo-by-id?todoID=' + createdTodoId)
          .expect(200);
        
        // The get-todo-by-id endpoint returns an array, so check the first item
        expect(fetchResponse.body).toBeInstanceOf(Array);
        expect(fetchResponse.body.length).toBe(1);
        expect(fetchResponse.body[0].todoID).toBe(createdTodoId);
        expect(fetchResponse.body[0].task).toBe(expectedTask);
        expect(new Date(fetchResponse.body[0].updatedAt).getTime()).toBeGreaterThanOrEqual(new Date(initialCreatedAt).getTime());
      });
    }
  );
});