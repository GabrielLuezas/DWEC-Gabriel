export const DOMFacade = {
    renderTasks(container, tasks) {
        container.innerHTML = '';
        tasks.forEach(task => {
            const div = document.createElement('div');
            div.className = 'task' + (task.done ? ' done' : '');
            div.innerHTML = `<div>
                                <h3>${task.title}</h3>
                                <p>${task.description}</p>
                                <small>Prioridad: ${task.priority}</small>
                            </div>
                            <div>
                                <button data-id="${task.id}" class="toggle">✔</button>
                                <button data-id="${task.id}" class="delete">🗑</button>
                            </div>`;
            container.appendChild(div);
        });
    },
    clearInputs() {
        document.getElementById('task-title').value = '';
        document.getElementById('task-desc').value = '';
        document.getElementById('task-priority').value = 'normal';
    }
};