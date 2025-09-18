import Todo from '../entity/Todo.js';
import db from '../../infrastructure/db/index.js';
import crypto from 'crypto';

class CreateTodoCommand {
  static async execute({ task }) {
    if (task.length > 40) {
      throw new Error("Task cannot be longer than 40 characters.");
    }

    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    
    const todo = new Todo({ id, task, createdAt: now, updatedAt: now });
    await db.insert('Todo', todo.toJSON());
    return todo.toJSON();
  }
}

export default CreateTodoCommand;