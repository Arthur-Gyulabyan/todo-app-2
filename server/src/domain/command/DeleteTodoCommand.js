import db from '../../infrastructure/db/index.js';

class DeleteTodoCommand {
  static async execute({ todoID }) {
    const result = await db.remove('Todo', todoID);
    if (!result) {
      throw new Error(`Todo with ID ${todoID} not found.`);
    }
    return { success: true, message: `Todo with ID ${todoID} deleted.` };
  }
}

export default DeleteTodoCommand;