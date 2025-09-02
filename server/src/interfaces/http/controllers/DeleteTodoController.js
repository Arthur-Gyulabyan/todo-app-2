import express from 'express';
import DeleteTodoCommand from '../../../domain/command/DeleteTodoCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { todoID } = req.body;

    if (!todoID) {
      return res.status(400).json({ message: 'todoID is required' });
    }

    await DeleteTodoCommand.execute({ todoID });
    res.status(200).send();
  } catch (err) {
    if (err.message === 'Todo Not Found') {
      return res.status(400).json({ message: 'Todo Not Found' });
    }
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/delete-todo',
  router,
};