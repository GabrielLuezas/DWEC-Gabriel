export function UrgentTask(task) {
    task.priority = 'high';
    task.isUrgent = true;
    return task;
}