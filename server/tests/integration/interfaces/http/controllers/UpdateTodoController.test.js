import request from 'supertest';
import express from 'express';
import UpdateTodoController from '../../../../../src/interfaces/http/controllers/UpdateTodoController.js';
import db from '../../../../../src/infrastructure/db/index.js';

// Mock the database dependency for isolation
jest.mock('../../../../../src/infrastructure/db/index.js', () => ({
  findById: jest.fn(),
  update: jest.fn(),
}));

// Setup Express app to test the controller
const app = express();
app.use(express.json());
app.use(UpdateTodoController.routeBase, UpdateTodoController.router);

describe('UpdateTodoController', () => {
  const GWT_ID = 'a4d6e0e8-d85b-4e2d-accc-aef7edbb01b5';

  beforeEach(() => {
    // Clear all mocks before each test to ensure isolation
    jest.clearAllMocks();
  });

  it(`[${GWT_ID}] Scenario: Successfully update an existing todo's task`, async () => {
    // Given a todo with ID "todo-123" and task "Buy groceries" exists
    const todoID = 'todo-123';
    const initialTask = 'Buy groceries';
    const updatedTask = 'Buy organic groceries';
    const existingTodo = { todoID, task: initialTask, createdAt: new Date().toISOString() };

    db.findById.mockResolvedValue(existingTodo);
    db.update.mockImplementation((collection, id, data) => {
      return Promise.resolve({ ...existingTodo, ...data, updatedAt: new Date().toISOString() });
    });

    // When a client sends an "Update Todo" command for todo ID "todo-123" with new task "Buy organic groceries"
    const response = await request(app)
      .post('/update-todo')
      .send({ todoID, task: updatedTask });

    // Then the system should respond with a "200 OK" status
    expect(response.statusCode).toEqual(200);

    // Then the todo with ID "todo-123" should have task "Buy organic groceries"
    expect(response.body).toHaveProperty('todoID', todoID);
    expect(response.body).toHaveProperty('task', updatedTask);
    expect(response.body).toHaveProperty('updatedAt');
    expect(new Date(response.body.updatedAt).getTime()).toBeGreaterThan(new Date(existingTodo.createdAt).getTime()); // Ensure updatedAt is later

    // And a "Todo Updated" event should occur (implicitly, by verifying database operations)
    expect(db.findById).toHaveBeenCalledTimes(1);
    expect(db.findById).toHaveBeenCalledWith('Todo', todoID);

    expect(db.update).toHaveBeenCalledTimes(1);
    const [collection, id, updateData] = db.update.mock.calls[0];
    expect(collection).toBe('Todo');
    expect(id).toBe(todoID);
    expect(updateData).toMatchObject({
      todoID,
      task: updatedTask,
    });
    expect(updateData).toHaveProperty('updatedAt');
  });

  it(`[${GWT_ID}] Scenario: Attempt to update a non-existent todo`, async () => {
    // Given no todo with ID "non-existent-todo" exists
    const todoID = 'non-existent-todo';
    const updatedTask = 'New task';

    db.findById.mockResolvedValue(null); // Simulate todo not found

    // When a client sends an "Update Todo" command for todo ID "non-existent-todo" with new task "New task"
    const response = await request(app)
      .post('/update-todo')
      .send({ todoID, task: updatedTask });

    // Then the system should respond with a "400 Bad Request" status
    expect(response.statusCode).toEqual(400);

    // And the response message should indicate "Todo with ID non-existent-todo not found."
    expect(response.body).toHaveProperty('message', `Todo with ID ${todoID} not found.`);

    expect(db.findById).toHaveBeenCalledTimes(1);
    expect(db.findById).toHaveBeenCalledWith('Todo', todoID);
    expect(db.update).not.toHaveBeenCalled(); // Ensure no update operation occurred
  });

  it(`[${GWT_ID}] Scenario: Attempt to update a todo with missing todo ID`, async () => {
    // When a client sends an "Update Todo" command with missing todo ID and task "Some task"
    const updatedTask = 'Some task';
    const response = await request(app)
      .post('/update-todo')
      .send({ task: updatedTask }); // todoID is missing

    // Then the system should respond with a "400 Bad Request" status
    expect(response.statusCode).toEqual(400);

    // And the response message should indicate "Both todoID and task are required."
    expect(response.body).toHaveProperty('message', 'Both todoID and task are required.');

    expect(db.findById).not.toHaveBeenCalled();
    expect(db.update).not.toHaveBeenCalled();
  });

  it(`[${GWT_ID}] Scenario: Attempt to update a todo with missing task`, async () => {
    // Given a todo with ID "todo-456" and task "Existing task" exists (context, but not mocked for this negative test)
    const todoID = 'todo-456';

    // When a client sends an "Update Todo" command for todo ID "todo-456" with missing task
    const response = await request(app)
      .post('/update-todo')
      .send({ todoID }); // task is missing

    // Then the system should respond with a "400 Bad Request" status
    expect(response.statusCode).toEqual(400);

    // And the response message should indicate "Both todoID and task are required."
    expect(response.body).toHaveProperty('message', 'Both todoID and task are required.');

    expect(db.findById).not.toHaveBeenCalled();
    expect(db.update).not.toHaveBeenCalled();
  });
});