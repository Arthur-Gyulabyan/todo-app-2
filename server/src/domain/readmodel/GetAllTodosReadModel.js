import db from '../../infrastructure/db/index.js';

class GetAllTodosReadModel {
  static async query() {
    const todosFromDb = await db.findAll('Todo'); 
    
    // Map database fields (e.g., 'Todo ID') to OpenAPI specification fields (e.g., 'todoID')
    return todosFromDb.map(todo => ({
      todoID: todo['Todo ID'],
      task: todo['Task'],
      createdAt: todo['Created At'],
      updatedAt: todo['Updated At'],
    }));
  }
}

export default GetAllTodosReadModel;