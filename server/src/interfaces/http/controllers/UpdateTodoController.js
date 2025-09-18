import express from 'express';
import UpdateTodoCommand from '../../../domain/command/UpdateTodoCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { id, task } = req.body;
    const result = await UpdateTodoCommand.execute({ id, task });
    res.status(200).json(result);
  } catch (err) {
    if (err.message === 'Todo not found') {
      return res.status(404).json({ message: err.message });
    }
    if (err.message === 'Task Too Long') {
      return res.status(400).json({ message: err.message });
    }
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/update-todo',
  router,
};