import db from '../../infrastructure/db/index.js';

class DeleteTodoCommand {
  static async execute({ id }) {
    const existingTodo = await db.findById('Todo', id);

    if (!existingTodo) {
      throw new Error('Todo Not Found');
    }

    await db.remove('Todo', id);
    return { id }; // Return the ID of the deleted todo
  }
}

export default DeleteTodoCommand;