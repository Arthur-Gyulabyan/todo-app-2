import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'given-a-todo-exists-when-a-client-sends-an-update-todo-command-with-a-new-task-that-is-longer-than-40-characters.feature'));

defineFeature(feature, test => {
  let todoId;
  let initialTask;
  let updateResponse;
  let getTodoResponse;

  test(
    'Given a todo exists, when a client sends an \'Update Todo\' command with a new task that is longer than 40 characters, then the todo\'s task should not be updated and an error indicating \'Task Too Long\' should be returned.',
    ({ given, when, then }) => {
      given('a todo exists', async () => {
        initialTask = 'Initial short task for validation';
        const createResponse = await request(app)
          .post('/api/v1/create-todo')
          .send({ task: initialTask })
          .expect(200);

        todoId = createResponse.body.id;
        expect(todoId).toBeDefined();
      });

      when('a client sends an \'Update Todo\' command with a new task that is longer than 40 characters', async () => {
        const longTask = 'This is a very very very long task description that definitely exceeds forty characters in length and will trigger the validation error.'; // Length > 40
        updateResponse = await request(app)
          .post('/api/v1/update-todo')
          .send({ id: todoId, task: longTask })
          .expect(400); // Expect a Bad Request due to validation error
      });

      then('the todo\'s task should not be updated and an error indicating \'Task Too Long\' should be returned', async () => {
        expect(updateResponse.status).toBe(400);
        expect(updateResponse.body.message).toBeDefined();
        expect(updateResponse.body.message).toContain('Task Too Long');

        // Verify that the todo's task was not updated
        getTodoResponse = await request(app)
          .get(`/api/v1/get-todo-by-id?id=${todoId}`)
          .expect(200);

        expect(getTodoResponse.body.id).toBe(todoId);
        expect(getTodoResponse.body.task).toBe(initialTask);
      });
    }
  );
});