import db from '../../infrastructure/db/index.js';

class GetAllTodosReadModel {
  static async query() {
    const todos = await db.findAll('Todo');
    // Transform field names to match OpenAPI specification (camelCase)
    return todos.map(todo => ({
      id: todo.id,
      task: todo['Task'],
      createdAt: todo['Created At'],
      updatedAt: todo['Updated At'],
    }));
  }
}

export default GetAllTodosReadModel;