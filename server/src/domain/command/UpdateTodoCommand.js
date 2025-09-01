import Todo from '../entity/Todo.js';
import db from '../../infrastructure/db/index.js';

class UpdateTodoCommand {
  static async execute({ todoID, task }) {
    if (task.length > 40) {
      throw new Error('Task Too Long');
    }

    const existingTodoData = await db.findById('Todo', todoID);

    if (!existingTodoData) {
      throw new Error('Todo not found');
    }

    const todo = new Todo(existingTodoData);
    todo.task = task; // Direct assignment, assuming Todo entity handles `updatedAt` or will be handled implicitly
    todo.updatedAt = new Date().toISOString(); // Explicitly update updatedAt

    await db.update('Todo', todo.toJSON());

    return todo.toJSON();
  }
}

export default UpdateTodoCommand;