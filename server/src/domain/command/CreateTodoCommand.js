import { v4 as uuidv4 } from 'uuid';
import Todo from '../entity/Todo.js';
import db from '../../infrastructure/db/index.js';

class CreateTodoCommand {
  static async execute({ task }) {
    // GWT: Given a client wants to create a new todo, when the task is longer than 40 characters, then the task should not be created.
    if (task && task.length > 40) {
      throw new Error('Task must not be longer than 40 characters.');
    }

    const now = new Date().toISOString();
    const newTodo = new Todo({
      id: uuidv4(),
      task,
      createdAt: now,
      updatedAt: now,
    });

    await db.insert('Todo', newTodo.toJSON());

    return newTodo.toJSON();
  }
}

export default CreateTodoCommand;