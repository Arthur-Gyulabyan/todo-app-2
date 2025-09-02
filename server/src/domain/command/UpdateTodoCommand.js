import Todo from '../entity/Todo.js';
import db from '../../infrastructure/db/index.js';

class UpdateTodoCommand {
  static async execute({ todoID, task }) {
    // GWT: When a client sends an 'Update Todo' command with a new task that is longer than 40 characters,
    // then the todo's task should not be updated and an error indicating 'Task Too Long' should be returned.
    if (task && task.length > 40) {
      throw new Error('Task Too Long');
    }

    // GWT: Given a todo exists
    const existingTodo = await db.findById('Todo', todoID);
    if (!existingTodo) {
      throw new Error('Todo not found');
    }

    const todoToUpdate = new Todo(existingTodo);
    todoToUpdate.task = task;
    todoToUpdate.updatedAt = new Date().toISOString();

    await db.update('Todo', todoToUpdate.toJSON());
    return todoToUpdate.toJSON();
  }
}

export default UpdateTodoCommand;