import { v4 as uuidv4 } from 'uuid';

class Todo {
  constructor({ todoID = uuidv4(), task, createdAt = new Date(), updatedAt = new Date() }) {
    if (!task) {
      throw new Error('Task is required');
    }

    this.id = todoID; // Internal primary key
    this.todoID = todoID; // API field name
    this.task = task;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      todoID: this.todoID,
      task: this.task,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

export default Todo;