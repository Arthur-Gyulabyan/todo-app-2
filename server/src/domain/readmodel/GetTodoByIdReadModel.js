import db from '../../infrastructure/db/index.js';

class GetTodoByIdReadModel {
  static async query(todoID) {
    if (!todoID) {
      throw new Error("Todo ID is required for GetTodoByIdReadModel.");
    }
    // Assuming 'Todo' is the entity name and db.findById expects a string ID.
    // The db layer is expected to return an object with keys matching OpenAPI spec (todoID, task, createdAt, updatedAt).
    return await db.findById('Todo', todoID);
  }
}

export default GetTodoByIdReadModel;