import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'delete-todo-given-a-todo-exists.feature'));

defineFeature(feature, test => {
  let todoIdToDelete;
  let createTodoResponse;
  let deleteTodoResponse;

  // Use a unique task name for each test to avoid conflicts
  const uniqueTask = `Prepare Q4 budget report ${Date.now()}`;

  test(
    'Given a todo exists, when a client sends a \'Delete Todo\' command with the todo ID, then a \'Todo Deleted\' event occurs and the todo is removed from the system.',
    ({ given, when, then }) => {
      given('a todo exists', async () => {
        const createResponse = await request(app)
          .post('/api/v1/create-todo')
          .send({ task: uniqueTask })
          .expect(200);

        createTodoResponse = createResponse.body;
        expect(createTodoResponse).toHaveProperty('todoID');
        expect(createTodoResponse).toHaveProperty('task', uniqueTask);
        expect(createTodoResponse).toHaveProperty('createdAt');
        expect(createTodoResponse).toHaveProperty('updatedAt');

        todoIdToDelete = createTodoResponse.todoID;
      });

      when('a client sends a \'Delete Todo\' command with the todo ID', async () => {
        deleteTodoResponse = await request(app)
          .post('/api/v1/delete-todo')
          .send({ todoID: todoIdToDelete });
      });

      then('a \'Todo Deleted\' event occurs and the todo is removed from the system.', async () => {
        // Assert the delete response status and body
        expect(deleteTodoResponse.status).toBe(200);
        expect(deleteTodoResponse.body).toEqual(expect.objectContaining({
          todoID: todoIdToDelete,
          task: uniqueTask,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }));

        // Verify the todo is no longer in the system by fetching all todos
        const getAllResponse = await request(app)
          .get('/api/v1/get-all-todos')
          .expect(200);

        const todos = getAllResponse.body;
        const foundTodo = todos.find(todo => todo.todoID === todoIdToDelete);
        expect(foundTodo).toBeUndefined();
      });
    }
  );
});