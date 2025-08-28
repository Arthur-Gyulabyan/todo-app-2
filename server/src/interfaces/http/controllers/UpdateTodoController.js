import express from 'express';
import UpdateTodoCommand from '../../../domain/command/UpdateTodoCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { todoID, task } = req.body;

    if (!todoID || !task) {
      return res.status(400).json({ message: 'Both todoID and task are required.' });
    }

    const result = await UpdateTodoCommand.execute({ todoID, task });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/update-todo',
  router,
};