import db from '../../infrastructure/db/index.js';

class GetTodoByIdReadModel {
  /**
   * Queries the database for a single Todo item.
   * Due to the OpenAPI specification not providing a parameter for the Todo ID,
   * this query will return the first Todo found in the database.
   * @returns {Promise<object|null>} The first Todo object found, or null if no Todos exist.
   */
  static async query() {
    const todos = await db.findAll('Todo');
    if (todos && todos.length > 0) {
      return {
        todoID: todos[0].todoID,
        task: todos[0].task,
        createdAt: todos[0].createdAt,
        updatedAt: todos[0].updatedAt,
      };
    }
    return null;
  }
}

export default GetTodoByIdReadModel;