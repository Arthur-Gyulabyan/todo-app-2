import express from 'express';
import GetTodoByIdReadModel from '../../../domain/readmodel/GetTodoByIdReadModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // The OpenAPI specification for /get-todo-by-id does not define any parameters.
    // As such, no 'todoID' can be extracted from the request.
    // The GetTodoByIdReadModel.query() method requires a 'todoID' argument.
    // Calling it without an argument will cause the ReadModel to throw an error.
    const todo = await GetTodoByIdReadModel.query(); // This line will likely throw an error
    res.status(200).json(todo); // This line will only be reached if ReadModel.query() somehow succeeds without an ID
  } catch (err) {
    // Catch the error thrown by the ReadModel if 'todoID' is missing.
    // Respond with a 400 Bad Request, as per the allowed status codes.
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/get-todo-by-id', // Route matches the lowercase kebab-case name from the OpenAPI path
  router,
};