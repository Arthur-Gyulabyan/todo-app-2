import express from 'express';
import DeleteTodoCommand from '../../../domain/command/DeleteTodoCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { todoID } = req.body;
    
    if (!todoID) {
      return res.status(400).json({ message: 'todoID is required in the request body.' });
    }

    await DeleteTodoCommand.execute({ todoID });
    res.status(200).json({ message: `Todo with ID ${todoID} deleted successfully.` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/delete-todo',
  router,
};