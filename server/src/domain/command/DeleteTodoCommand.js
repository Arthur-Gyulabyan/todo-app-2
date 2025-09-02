import db from '../../infrastructure/db/index.js';

class DeleteTodoCommand {
  static async execute({ todoID }) {
    const existingTodo = await db.findById('Todo', todoID);

    if (!existingTodo) {
      throw new Error('Todo Not Found');
    }

    await db.remove('Todo', todoID);
    // No specific return value needed for delete operation on success
  }
}

export default DeleteTodoCommand;