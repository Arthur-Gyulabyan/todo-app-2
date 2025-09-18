import db from '../../infrastructure/db/index.js';

class DeleteTodoCommand {
  static async execute({ id }) {
    const todoToDelete = await db.findById('Todo', id);

    if (!todoToDelete) {
      throw new Error('Todo Not Found');
    }

    await db.remove('Todo', id);
    return todoToDelete;
  }
}

export default DeleteTodoCommand;