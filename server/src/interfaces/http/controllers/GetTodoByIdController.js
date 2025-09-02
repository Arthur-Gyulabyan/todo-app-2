import express from 'express';
import GetTodoByIdReadModel from '../../../domain/readmodel/GetTodoByIdReadModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const todo = await GetTodoByIdReadModel.query();

    if (!todo) {
      // As per rules, return 400 for errors or not found scenarios.
      return res.status(400).json({ message: 'No todo found.' });
    }

    // Response schema matches OpenAPI definition.
    res.status(200).json(todo);
  } catch (err) {
    // Catch any unexpected errors and return a 400 status.
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/get-todo-by-id', // Matches read model name in lowercase kebab-case
  router,
};