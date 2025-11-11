export class TaskObserver {
    constructor() {
        this.subscribers = [];
    }
    subscribe(fn) { this.subscribers.push(fn); }
    notify(data) { this.subscribers.forEach(fn => fn(data)); }
}