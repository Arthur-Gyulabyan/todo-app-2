import express from 'express';
import GetTodoByIdReadModel from '../../../domain/readmodel/GetTodoByIdReadModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const todo = await GetTodoByIdReadModel.query();
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(400).json({ message: 'Todo not found' });
    }
  } catch (err) {
    // In a real application, log the error for debugging
    res.status(400).json({ message: 'An unexpected error occurred' });
  }
});

export default {
  routeBase: '/get-todo-by-id',
  router,
};