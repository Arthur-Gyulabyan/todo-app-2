import express from 'express';
import UpdateTodoCommand from '../../../domain/command/UpdateTodoCommand.js';

const router = express.Router();
const routeBase = '/update-todo'; // Strictly follow OpenAPI path for this operation

router.post('/', async (req, res) => {
  try {
    const { id, task } = req.body;

    // OpenAPI request body for /update-todo defines `id` and `task`.
    // Basic validation for presence of `id` and `task` as they are essential for an update.
    if (!id) {
      return res.status(400).json({ message: 'Todo ID is required.' });
    }
    if (task === undefined || task === null) { // Task is required by Todo schema
      return res.status(400).json({ message: 'Task is required.' });
    }

    const updatedTodo = await UpdateTodoCommand.execute({ id, task });

    // As per OpenAPI, 200 description is "Success". Returning the updated resource is standard practice.
    res.status(200).json(updatedTodo);
  } catch (err) {
    // Handle specific business logic errors from the command
    if (err.message === 'Task Too Long') {
      res.status(400).json({ message: err.message }); // Corresponds to OpenAPI 400 BadRequest
    } else if (err.message === 'Todo not found') {
      res.status(404).json({ message: err.message }); // Corresponds to OpenAPI 404 NotFound
    } else if (err.message.includes('required')) { // Catch command-level validations for required fields
      res.status(400).json({ message: err.message });
    }
    else {
      // For any other unexpected errors, return a generic 400 Bad Request or log and return 500
      // Given allowed codes are 200, 400, 404, we'll map unexpected errors to 400.
      console.error(`Error processing Update Todo command: ${err.message}`, err);
      res.status(400).json({ message: 'An unexpected error occurred during the update process.' });
    }
  }
});

export default {
  routeBase,
  router,
};