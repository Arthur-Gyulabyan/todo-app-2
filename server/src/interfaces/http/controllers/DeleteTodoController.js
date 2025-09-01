import express from 'express';
import DeleteTodoCommand from '../../../domain/command/DeleteTodoCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { todoID } = req.body; // Extract todoID from request body as per OpenAPI spec

    if (!todoID) {
      return res.status(400).json({ message: 'todoID is required' });
    }

    await DeleteTodoCommand.execute({ todoID });
    res.status(200).json({ message: 'Todo Deleted Successfully' }); // OpenAPI 200 response description is 'Success'
  } catch (err) {
    // Catch specific error 'Todo Not Found' from command, and other potential errors.
    // GWT: "then an error indicating 'Todo Not Found' should be returned"
    res.status(400).json({ message: err.message }); // OpenAPI 400 response description is 'Bad Request'
  }
});

export default {
  routeBase: '/delete-todo', // Path from OpenAPI specification
  router,
};