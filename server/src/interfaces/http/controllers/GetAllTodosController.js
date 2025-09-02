import express from 'express';
import GetAllTodosReadModel from '../../../domain/readmodel/GetAllTodosReadModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const todos = await GetAllTodosReadModel.query();
    res.status(200).json(todos);
  } catch (err) {
    // As per rules, only 200 and 400 status codes are allowed.
    // An internal error would typically be 500, but we default to 400.
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/get-all-todos',
  router,
};