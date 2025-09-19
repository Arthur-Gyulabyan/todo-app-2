import db from '../../infrastructure/db/index.js';
import Todo from '../entity/Todo.js';

class UpdateTodoCommand {
  static async execute({ id, task }) {
    if (!id) {
      throw new Error('Todo ID is required.');
    }

    // GWT Validation: "task that is longer than 40 characters, then the todo's task should not be updated and an error indicating 'Task Too Long' should be returned."
    if (task && typeof task === 'string' && task.length > 40) {
      throw new Error('Task Too Long');
    }

    const existingTodoData = await db.findById('Todo', id);

    if (!existingTodoData) {
      throw new Error('Todo not found');
    }

    // "Database updates must use the corresponding Entity class."
    // Create an entity instance from the existing data to ensure consistency and leverage entity methods.
    const todo = new Todo(existingTodoData);

    // Apply updates based on provided fields
    if (task !== undefined && task !== null) {
      // Assuming Todo entity's setter handles validation for empty or invalid task types if needed
      todo.task = task;
    }

    // Update the `updatedAt` timestamp as per entity properties
    todo.updatedAt = new Date().toISOString();

    // Persist the updated entity state
    await db.update('Todo', id, todo.toJSON());

    return todo.toJSON();
  }
}

export default UpdateTodoCommand;