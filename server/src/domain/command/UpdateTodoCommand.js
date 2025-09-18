import Todo from '../entity/Todo.js';
import db from '../../infrastructure/db/index.js';

class UpdateTodoCommand {
  static async execute({ id, task }) {
    const existingTodo = await db.findById('Todo', id);

    if (!existingTodo) {
      throw new Error('Todo not found');
    }

    if (task && task.length > 40) {
      throw new Error('Task Too Long');
    }

    const updatedTodoData = {
      ...existingTodo,
      task: task || existingTodo.task, // Only update task if provided, otherwise retain existing
      updatedAt: new Date().toISOString(),
    };

    const updatedTodo = new Todo(updatedTodoData);
    await db.update('Todo', id, updatedTodo.toJSON());

    return updatedTodo.toJSON();
  }
}

export default UpdateTodoCommand;