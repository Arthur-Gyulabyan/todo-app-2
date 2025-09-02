import express from 'express';
import UpdateTodoCommand from '../../../domain/command/UpdateTodoCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { id, task } = req.body; // id and task from OpenAPI spec requestBody

    const result = await UpdateTodoCommand.execute({ id, task });
    res.status(200).json(result); // OpenAPI spec for success: 200
  } catch (err) {
    res.status(400).json({ message: err.message }); // OpenAPI spec for error: 400
  }
});

export default {
  routeBase: '/update-todo', // From OpenAPI spec path: /update-todo
  router,
};