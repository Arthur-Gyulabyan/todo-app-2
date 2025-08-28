import { v4 as uuidv4 } from 'uuid';
import Todo from '../entity/Todo.js';
import db from '../../infrastructure/db/index.js';

class CreateTodoCommand {
  static async execute({ task }) {
    const todoID = uuidv4();
    const now = new Date().toISOString(); // Consistent with example ISO string format
    
    const todo = new Todo({
      todoID,
      task,
      createdAt: now,
      updatedAt: now,
    });
    
    await db.insert('Todo', todo.toJSON());
    return todo.toJSON();
  }
}

export default CreateTodoCommand;