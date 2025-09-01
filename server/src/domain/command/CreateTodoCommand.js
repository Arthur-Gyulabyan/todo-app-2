import Todo from '../entity/Todo.js';
import db from '../../infrastructure/db/index.js';

class CreateTodoCommand {
  static async execute({ task }) {
    if (task.length > 40) {
      throw new Error('Task cannot be longer than 40 characters.');
    }

    const todo = new Todo({ task });
    await db.insert('Todo', todo.toJSON());
    return todo.toJSON();
  }
}

export default CreateTodoCommand;