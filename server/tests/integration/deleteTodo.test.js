import request from 'supertest';
import express from 'express';
import DeleteTodoController from '../../src/interfaces/http/controllers/DeleteTodoController.js';
import DeleteTodoCommand from '../../src/domain/command/DeleteTodoCommand.js';

// Mock the DeleteTodoCommand to control its behavior during tests
jest.mock('../../src/domain/command/DeleteTodoCommand.js');

const app = express();
app.use(express.json());
app.use(DeleteTodoController.routeBase, DeleteTodoController.router);

describe('DeleteTodoController', () => {
  beforeEach(() => {
    // Clear all mock calls and reset mock implementations before each test
    jest.clearAllMocks();
  });

  describe('Scenario: Successfully delete an existing todo', () => {
    test('should delete an existing todo and return 200 OK', async () => {
      // Given a todo with ID "123" exists in the system
      const todoID = '123';
      DeleteTodoCommand.execute.mockResolvedValue({ success: true, message: `Todo with ID ${todoID} deleted.` });

      // When I send a POST request to "/delete-todo" with body { "todoID": "123" }
      const response = await request(app)
        .post('/delete-todo')
        .send({ todoID });

      // Then the response status code should be 200
      expect(response.statusCode).toBe(200);
      // And the response body should contain { "message": "Todo with ID 123 deleted successfully." }
      expect(response.body).toEqual({ message: `Todo with ID ${todoID} deleted successfully.` });
      // And the todo with ID "123" should no longer exist in the system
      // (This is verified by checking if the command was called correctly)
      expect(DeleteTodoCommand.execute).toHaveBeenCalledTimes(1);
      expect(DeleteTodoCommand.execute).toHaveBeenCalledWith({ todoID });
    });
  });

  describe('Scenario: Attempt to delete a non-existent todo', () => {
    test('should return 400 Bad Request if todo does not exist', async () => {
      // Given no todo with ID "nonExistentID" exists in the system
      const todoID = 'nonExistentID';
      DeleteTodoCommand.execute.mockRejectedValue(new Error(`Todo with ID ${todoID} not found.`));

      // When I send a POST request to "/delete-todo" with body { "todoID": "nonExistentID" }
      const response = await request(app)
        .post('/delete-todo')
        .send({ todoID });

      // Then the response status code should be 400
      expect(response.statusCode).toBe(400);
      // And the response body should contain { "message": "Todo with ID nonExistentID not found." }
      expect(response.body).toEqual({ message: `Todo with ID ${todoID} not found.` });
      expect(DeleteTodoCommand.execute).toHaveBeenCalledTimes(1);
      expect(DeleteTodoCommand.execute).toHaveBeenCalledWith({ todoID });
    });
  });

  describe('Scenario: Attempt to delete a todo with missing ID', () => {
    test('should return 400 Bad Request if todoID is missing from the body', async () => {
      // When I send a POST request to "/delete-todo" with an empty body
      const response = await request(app)
        .post('/delete-todo')
        .send({}); // Empty body

      // Then the response status code should be 400
      expect(response.statusCode).toBe(400);
      // And the response body should contain { "message": "todoID is required in the request body." }
      expect(response.body).toEqual({ message: 'todoID is required in the request body.' });
      // The command should not be executed if input validation fails
      expect(DeleteTodoCommand.execute).not.toHaveBeenCalled();
    });
  });
});