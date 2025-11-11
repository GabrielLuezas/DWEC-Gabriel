import { Task } from '../models/task.js';

export class TaskFactory {
    static createTask(title, description, priority) {
        const id = Date.now();
        return new Task(id, title, description, priority);
    }
}