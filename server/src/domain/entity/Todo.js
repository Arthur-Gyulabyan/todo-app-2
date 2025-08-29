import { v4 as uuidv4 } from 'uuid';

class Todo {
  constructor({ todoID = uuidv4(), task, createdAt = new Date().toISOString(), updatedAt = new Date().toISOString() }) {
    if (!task) throw new Error('Task is required');

    this.id = todoID;
    this.todoID = todoID;
    this.task = task;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      todoID: this.todoID,
      task: this.task,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

export default Todo;