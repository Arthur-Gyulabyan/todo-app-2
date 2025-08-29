import express from 'express';
import CreateTodoCommand from '../../../domain/command/CreateTodoCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { task } = req.body;

    if (!task) {
      return res.status(400).json({ message: 'Task is required.' });
    }

    const result = await CreateTodoCommand.execute({ task });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/create-todo',
  router,
};