import { v4 as uuidv4 } from 'uuid';

class Todo {
  constructor({ id = uuidv4(), task, createdAt, updatedAt }) {
    if (!task) {
      throw new Error('Task is required');
    }

    this.id = id;
    this.task = task;
    // Convert createdAt to Date object if it's an ISO string or default to current date
    this.createdAt = createdAt ? (createdAt instanceof Date ? createdAt : new Date(createdAt)) : new Date();
    // Convert updatedAt to Date object if it's an ISO string or default to createdAt
    this.updatedAt = updatedAt ? (updatedAt instanceof Date ? updatedAt : new Date(updatedAt)) : this.createdAt;
  }

  update({ task }) {
    if (task !== undefined) {
      this.task = task;
    }
    this.updatedAt = new Date(); // Update the updatedAt timestamp
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