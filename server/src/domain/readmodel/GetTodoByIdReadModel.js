import db from '../../infrastructure/db/index.js';

class GetTodoByIdReadModel {
  static async query(id) {
    const todo = await db.findById('Todo', id);

    if (!todo) {
      return null;
    }

    // Map entity fields to OpenAPI response schema
    return {
      id: todo.id,
      task: todo.Task,
      createdAt: todo['Created At'],
      updatedAt: todo['Updated At'],
    };
  }
}

export default GetTodoByIdReadModel;