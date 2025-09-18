import express from 'express';
import DeleteTodoCommand from '../../../domain/command/DeleteTodoCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { id } = req.body;
    const result = await DeleteTodoCommand.execute({ id });
    res.status(200).json(result);
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