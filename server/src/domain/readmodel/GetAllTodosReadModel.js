import db from '../../infrastructure/db/index.js';

class GetAllTodosReadModel {
  static async query() {
    // The GWT description provided ("Given a client wants to create a new todo, when the task is longer than 40 characters, then the task should not be created.")
    // describes a command-side validation rule and is not applicable to a read model for fetching all todos.
    // Therefore, this read model simply retrieves all 'Todo' items without additional filtering based on this GWT.
    return await db.findAll('Todo');
  }
}

export default GetAllTodosReadModel;