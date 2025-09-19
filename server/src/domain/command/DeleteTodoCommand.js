import db from '../../infrastructure/db/index.js';

class DeleteTodoCommand {
  static async execute({ id }) {
    const existingTodo = await db.findById('Todo', id);
    if (!existingTodo) {
      throw new Error('Todo Not Found');
    }

    const removed = await db.remove('Todo', id);
    if (!removed) {
      throw new Error('Failed to delete Todo');
    }

    return existingTodo;
  }
}

export default DeleteTodoCommand;