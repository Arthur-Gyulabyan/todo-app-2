import db from '../../infrastructure/db/index.js';

class DeleteTodoCommand {
  static async execute({ todoID }) {
    // Given no todo exists with a specific ID, when a client sends a 'Delete Todo' command with that ID,
    // then an error indicating 'Todo Not Found' should be returned.
    const todo = await db.findById('Todo', todoID);

    if (!todo) {
      throw new Error('Todo Not Found');
    }

    await db.remove('Todo', todoID);
    // As per the GWT description, no 'Todo Deleted' event is published.
    // The successful deletion returns a simple confirmation.
    return { message: 'Todo Deleted Successfully' };
  }
}

export default DeleteTodoCommand;