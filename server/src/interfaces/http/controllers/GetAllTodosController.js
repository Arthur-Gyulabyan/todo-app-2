import express from 'express';
import GetAllTodosReadModel from '../../../domain/readmodel/GetAllTodosReadModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const todos = await GetAllTodosReadModel.query();

    // The OpenAPI spec describes a single object with properties, but the cardinality is 'one-to-many'
    // and the path is 'get-all-todos', suggesting an array of todos.
    // Given the 'properties' keyword is used directly under 'schema' for the 200 response,
    // and it lists todoID, task, createdAt, updatedAt, this implies the schema is for the *items* in the array.
    // The spec uses `type: array` and then `properties` directly under it, which is not strictly correct
    // for an array of objects (it should be `items: { type: object, properties: ... }`).
    // However, adhering strictly to the literal interpretation, if it expects an array *of objects defined by these properties*,
    // the response will be an array of objects matching the fields `todoID`, `task`, `createdAt`, `updatedAt`.
    res.status(200).json(todos);
  } catch (err) {
    // As per rules, only 200 and 400 status codes are allowed.
    // A database or internal error is typically 500, but we must use 40