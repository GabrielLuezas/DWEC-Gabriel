import { TaskFactory } from "./patterns/factory.js";
import { TaskObserver } from "./patterns/observer.js";
import { TaskListView } from "./ui/taskListView.js";
import { DOMFacade } from "./ui/domFacade.js";

const taskObserver = new TaskObserver();
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const view = new TaskListView(document.getElementById("task-list"));

taskObserver.subscribe((updated) => {
  localStorage.setItem("tasks", JSON.stringify(updated));
  view.update(updated);
});

function addTask() {
  const title = document.getElementById("task-title").value;
  const desc = document.getElementById("task-desc").value;
  const priority = document.getElementById("task-priority").value;
  if (!title.trim()) return;

  const task = TaskFactory.createTask(title, desc, priority);
  tasks.push(task);
  taskObserver.notify(tasks);
  DOMFacade.clearInputs();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id == id);
  task.done = !task.done;
  taskObserver.notify(tasks);
}

function deleteTask(id) {
  const index = tasks.findIndex((t) => t.id == id);
  tasks.splice(index, 1);
  taskObserver.notify(tasks);
}

document.getElementById("add-task").addEventListener("click", addTask);
document.getElementById("task-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("toggle")) toggleTask(e.target.dataset.id);
  if (e.target.classList.contains("delete")) deleteTask(e.target.dataset.id);
});

view.update(tasks);

document.getElementById("apply-filters").addEventListener("click", () => {
  const priority = document.getElementById("filter-priority").value;
  const status = document.getElementById("filter-status").value;

  const filtered = tasks.filter((task) => {
    const byPriority = priority === "all" || task.priority === priority;
    const byStatus =
      status === "all" ||
      (status === "done" && task.done) ||
      (status === "pending" && !task.done);
    return byPriority && byStatus;
  });

  view.update(filtered);
});
