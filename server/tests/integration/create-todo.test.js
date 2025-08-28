import request from 'supertest';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';

import CreateTodoCommand from '../../src/domain/command/CreateTodoCommand.js';
import CreateTodoController from '../../src/interfaces/http/controllers/CreateTodoController.js';
import db from '../../src/infrastructure/db/index.js';

// Mock uuidv4 to return a predictable ID for testing
jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

// Mock the database insert operation
jest.mock('../../src/infrastructure/db/index.js', () => ({
  insert: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use(CreateTodoController.routeBase, CreateTodoController.router);

describe('CreateTodo Scenario', () => {
  const mockTodoId = 'test-todo-id-123';
  const mockTask = 'Buy groceries';

  beforeEach(() => {
    // Reset mocks before each test
    uuidv4.mockReturnValue(mockTodoId);
    db.insert.mockClear();
    db.insert.mockResolvedValue(true); // Default successful db insert
  });

  describe('CreateTodoCommand', () => {
    it('should create and save a new todo with a unique ID and timestamps', async () => {
      const result = await CreateTodoCommand.execute({ task: mockTask });

      // Verify uuidv4 was called
      expect(uuidv4).toHaveBeenCalledTimes(1);

      // Verify db.insert was called with the correct data
      expect(db.insert).toHaveBeenCalledTimes(1);
      expect(db.insert).toHaveBeenCalledWith('Todo', expect.objectContaining({
        todoID: mockTodoId,
        task: mockTask,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }));

      // Verify the returned todo matches the expected structure
      expect(result).toEqual(expect.objectContaining({
        todoID: mockTodoId,
        task: mockTask,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }));
    });
  });

  describe('CreateTodoController', () => {
    it('should respond with 200 and the created todo for a valid request', async () => {
      const expectedTodo = {
        todoID: mockTodoId,
        task: mockTask,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      };

      const response = await request(app)
        .post('/create-todo')
        .send({ task: mockTask });

      // Verify HTTP status code
      expect(response.status).toBe(200);

      // Verify response body contains the created todo
      expect(response.body).toEqual(expect.objectContaining(expectedTodo));

      // Verify that the command interaction with the database occurred
      expect(db.insert).toHaveBeenCalledTimes(1);
    });

    it('should respond with 400 and an error message if task is missing', async () => {
      const response = await request(app)
        .post('/create-todo')
        .send({}); // No task provided

      // Verify HTTP status code
      expect(response.status).toBe(400);

      // Verify error message
      expect(response.body).toEqual({ message: 'Task is required.' });

      // Verify that the command was not executed (db.insert not called)
      expect(db.insert).not.toHaveBeenCalled();
    });

    it('should respond with 400 and an error message for other command execution errors', async () => {
      const errorMessage = 'Database connection failed';
      db.insert.mockRejectedValue(new Error(errorMessage)); // Simulate a DB error

      const response = await request(app)
        .post('/create-todo')
        .send({ task: mockTask });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: errorMessage });
      expect(db.insert).toHaveBeenCalledTimes(1);
    });
  });
});