export class Task {
    constructor(id, title, description, priority, done = false, createdAt = new Date()) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.done = done;
        this.createdAt = createdAt;
    }
}