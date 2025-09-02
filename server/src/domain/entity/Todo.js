import { v4 as uuidv4 } from 'uuid';

class Todo {
  constructor({ id = uuidv4(), task, createdAt = new Date(), updatedAt = new Date() }) {
    if (!task) throw new Error('Task is required');

    this.id = id;
    this.task = task;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      task: this.task,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    };
  }
}

export default Todo;