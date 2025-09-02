import express from 'express';
import GetTodoByIdReadModel from '../../../domain/readmodel/GetTodoByIdReadModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  // The OpenAPI specification for '/get-todo-by-id' does not define any parameters.
  // Therefore, an ID cannot be extracted from the request (e.g., req.params.id, req.query.id).
  // In this strict interpretation, the GetTodoByIdReadModel.query will be called without a specific ID.
  // This will result in the read model returning null as no specific todo can be found without an ID.
  // The GWT description for "Todo Not Found" supports returning an error in such cases.
  try {
    const todo = await GetTodoByIdReadModel.query(undefined); // No ID available from request due to OpenAPI spec

    if (!todo) {
      // Return 400 Bad Request as per allowed status codes and 'Todo Not Found' scenario.
      return res.status(400).json({ message: 'Todo not found or ID not provided' });
    }

    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/get-todo-by-id',
  router,
};