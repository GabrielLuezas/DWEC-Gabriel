import { DOMFacade } from './domFacade.js';

export class TaskListView {
    constructor(container) {
        this.container = container;
    }

    update(tasks) {
        DOMFacade.renderTasks(this.container, tasks);
    }
}