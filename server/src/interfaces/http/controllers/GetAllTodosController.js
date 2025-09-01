import express from 'express';
import GetAllTodosReadModel from '../../../domain/readmodel/GetAllTodosReadModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const todos = await GetAllTodosReadModel.query();
    res.status(200).json(todos);
  } catch (err) {
    // Only use status codes 200 and 400 as per rules
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/get-all-todos',
  router,
};