import express from 'express';
import DeleteTodoCommand from '../../../domain/command/DeleteTodoCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { id } = req.body;
    await DeleteTodoCommand.execute({ id });
    res.status(200).json({ message: `Todo with ID ${id} deleted successfully.` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/delete-todo',
  router,
};