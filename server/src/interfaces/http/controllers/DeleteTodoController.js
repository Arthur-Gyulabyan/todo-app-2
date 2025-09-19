import express from 'express';
import DeleteTodoCommand from '../../../domain/command/DeleteTodoCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Todo ID is required.' });
    }

    const deletedTodo = await DeleteTodoCommand.execute({ id });
    res.status(200).json(deletedTodo);
  } catch (err) {
    if (err.message === 'Todo Not Found') {
      res.status(404).json({ message: err.message });
    } else {
      res.status(400).json({ message: err.message });
    }
  }
});

export default {
  routeBase: '/delete-todo',
  router,
};