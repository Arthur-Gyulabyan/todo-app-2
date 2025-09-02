import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'create-todo-when-task-is-longer-than-40-characters.feature'));

defineFeature(feature, test => {
  let longTask;
  let response;

  test(
    'Given a client wants to create a new todo, when the task is longer than 40 characters, then the task should not be created.',
    ({ given, when, then }) => {
      given('a client wants to create a new todo', () => {
        // No specific setup needed for this given step as we are testing a creation failure.
        // We assume the system is in a state where a new todo can be attempted.
      });

      when(/^the task is "([^"]*)" which is longer than 40 characters$/, async (taskString) => {
        longTask = taskString;
        response = await request(app)
          .post('/api/v1/create-todo')
          .send({ task: longTask })
          .set('Accept', 'application/json');
      });

      then('the task should not be created', async () => {
        expect(response.status).toBe(400); // Expect a Bad Request status
        expect(response.body).toHaveProperty('message'); // Expect an error message

        // Verify that the todo was not created by trying to fetch all todos
        const getAllResponse = await request(app)
          .get('/api/v1/get-all-todos')
          .set('Accept', 'application/json');

        expect(getAllResponse.status).toBe(200);
        const todos = getAllResponse.body;
        const found = todos.some(todo => todo.task === longTask);
        expect(found).toBe(false); // Assert that the long task is not in the list of todos
      });
    }
  );
});