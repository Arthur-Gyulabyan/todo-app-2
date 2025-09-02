import Todo from '../entity/Todo.js';
import db from '../../infrastructure/db/index.js';

class UpdateTodoCommand {
  static async execute({ id, task }) {
    // GWT: When a client sends an 'Update Todo' command with a new task that is longer than 40 characters
    if (task.length > 40) {
      // GWT: Then the todo's task should not be updated and an error indicating 'Task Too Long' should be returned.
      throw new Error('Task Too Long');
    }

    // GWT: Given a todo exists
    const existingTodoData = await db.findById('Todo', id);
    if (!existingTodoData) {
      throw new Error('Todo not found');
    }

    const todo = new Todo(existingTodoData);

    // Update the task field (note: entity field is 'Task', input is 'task')
    todo.Task = task;
    // Update timestamp
    todo.updatedAt = new Date().toISOString();

    await db.update('Todo', todo.id, todo.toJSON());
    return todo.toJSON();
  }
}

export default UpdateTodoCommand;