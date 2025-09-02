import Todo from '../entity/Todo.js';
import db from '../../infrastructure/db/index.js';
import { v4 as uuidv4 } from 'uuid';

class CreateTodoCommand {
  static async execute({ task }) {
    if (task.length > 40) {
      throw new Error('Task must not be longer than 40 characters.');
    }

    const id = uuidv4();
    const now = new Date().toISOString();

    const todo = new Todo({ id, task, createdAt: now, updatedAt: now });
    await db.insert('todos', todo.toJSON());
    return todo.toJSON();
  }
}

export default CreateTodoCommand;