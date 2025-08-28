import Todo from '../entity/Todo.js';
import db from '../../infrastructure/db/index.js';

class UpdateTodoCommand {
  static async execute({ todoID, task }) {
    const existingTodo = await db.findById('Todo', todoID);

    if (!existingTodo) {
      throw new Error(`Todo with ID ${todoID} not found.`);
    }

    const todo = new Todo(existingTodo);
    todo.task = task;
    todo.updatedAt = new Date().toISOString();

    await db.update('Todo', todo.todoID, todo.toJSON());

    return todo.toJSON();
  }
}

export default UpdateTodoCommand;