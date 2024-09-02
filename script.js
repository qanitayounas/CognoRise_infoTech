document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    let tasks = [];

    // Fetch tasks from the server
    function fetchTasks() {
        fetch('http://localhost:3000/tasks')
            .then(res => res.json())
            .then(data => {
                tasks = data;
                renderTasks();
            });
    }

    // Render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="task-details">
                    <input type="checkbox" class="complete-task" ${task.completed ? 'checked' : ''}>
                    <strong>${task.name}</strong>
                    <span>Category: ${task.category}</span>
                    <span>Priority: ${task.priority}</span>
                    <span>Due: ${task.dueDate}</span>
                </div>
                <button class="edit-task">Edit</button>
                <button class="delete-task">Delete</button>
            `;
            taskList.appendChild(li);

            // Mark task as completed
            li.querySelector('.complete-task').addEventListener('change', function() {
                task.completed = this.checked;
                updateTask(index, task);
            });

            // Handle task deletion
            li.querySelector('.delete-task').addEventListener('click', function() {
                deleteTask(index);
            });

            // Handle task editing
            li.querySelector('.edit-task').addEventListener('click', function() {
                editTask(index, task);
            });
        });

        new Sortable(taskList, {
            animation: 150,
            onEnd: function (evt) {
                const movedTask = tasks.splice(evt.oldIndex, 1)[0];
                tasks.splice(evt.newIndex, 0, movedTask);
                // Optional: Save new order to the server or localStorage
            }
        });
    }

    // Add new task
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const task = {
            id: Date.now(),
            name: taskInput.value,
            category: document.getElementById('category-select').value,
            priority: document.getElementById('priority-select').value,
            dueDate: document.getElementById('due-date-input').value,
            completed: false
        };

        fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        }).then(res => res.json())
          .then(newTask => {
              tasks.push(newTask);
              renderTasks();
              taskForm.reset();
          });
    });

    // Update task on the server
    function updateTask(index, task) {
        fetch(`http://localhost:3000/tasks/${task.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        }).then(() => {
            tasks[index] = task;
            renderTasks();
        });
    }

    // Delete task from the server
    function deleteTask(index) {
        const task = tasks[index];
        fetch(`http://localhost:3000/tasks/${task.id}`, {
            method: 'DELETE'
        }).then(() => {
            tasks.splice(index, 1);
            renderTasks();
        });
    }

    // Edit task
    function editTask(index, task) {
        taskInput.value = task.name;
        document.getElementById('category-select').value = task.category;
        document.getElementById('priority-select').value = task.priority;
        document.getElementById('due-date-input').value = task.dueDate;

        deleteTask(index);
    }

    // Initial fetch of tasks
    fetchTasks();
});
