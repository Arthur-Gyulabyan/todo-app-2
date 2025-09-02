import db from '../../infrastructure/db/index.js';

class GetTodoByIdReadModel {
  static async query() {
    // The OpenAPI specification for '/get-todo-by-id' defines no parameters.
    // To satisfy the 'one-to-one' cardinality and the Read Model's name "Get Todo By ID"
    // while adhering strictly to the OpenAPI, this implementation retrieves the first todo found.
    // In a typical RESTful scenario, an ID would be passed, but the spec prevents this.
    const todos = await db.findAll('Todo');
    return todos.length > 0 ? todos[0] : null;
  }
}

export default GetTodoByIdReadModel;