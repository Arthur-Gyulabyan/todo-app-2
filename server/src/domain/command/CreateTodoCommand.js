import Todo from '../entity/Todo.js';
import db from '../../infrastructure/db/index.js';

class CreateTodoCommand {
  static async execute({ task }) {
    const todo = new Todo({ task });
    await db.insert('todos', todo.toJSON());
    return todo.toJSON();
  }
}

export default CreateTodoCommand;