document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const taskInput = document.getElementById('new-task');
    const categoryInput = document.getElementById('category');
    const taskList = document.getElementById('task-list');
    const searchInput = document.getElementById('search-task');
    const totalTasksCompleted = document.getElementById('total-tasks-completed');
    const tasksByCategory = {
        work: document.getElementById('work-completed'),
        personal: document.getElementById('personal-completed'),
        shopping: document.getElementById('shopping-completed'),
        other: document.getElementById('other-completed')
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(taskInput.value, categoryInput.value);
        taskInput.value = '';
    });

    searchInput.addEventListener('input', () => {
        searchTask(searchInput.value);
    });

    function addTask(text, category) {
        const li = document.createElement('li');
        li.classList.add('task-item');
        li.dataset.category = category;
        li.innerHTML = `
            <span class="task-text">${text} (${category})</span>
            <div class="task-buttons">
                <button class="complete-button">✓</button>
                <button class="delete-button">🗑️</button>
            </div>
        `;
        
        const completeButton = li.querySelector('.complete-button');
        const deleteButton = li.querySelector('.delete-button');

        completeButton.addEventListener('click', () => {
            li.classList.toggle('completed');
            updateProductivityDashboard();
        });

        deleteButton.addEventListener('click', () => {
            li.remove();
            updateProductivityDashboard();
        });

        taskList.appendChild(li);
        updateProductivityDashboard();
    }

    function searchTask(query) {
        const tasks = document.querySelectorAll('.task-item');
        tasks.forEach(task => {
            const text = task.textContent.toLowerCase();
            if (text.includes(query.toLowerCase())) {
                task.style.display = 'flex';
            } else {
                task.style.display = 'none';
            }
        });
    }

    function updateProductivityDashboard() {
        const tasks = document.querySelectorAll('.task-item');
        let completedCount = 0;
        const categoryCount = {
            work: 0,
            personal: 0,
            shopping: 0,
            other: 0
        };

        tasks.forEach(task => {
            const category = task.dataset.category;
            if (task.classList.contains('completed')) {
                completedCount++;
                categoryCount[category]++;
            }
        });

        totalTasksCompleted.textContent = completedCount;
        for (const category in categoryCount) {
            tasksByCategory[category].textContent = categoryCount[category];
        }
    }
});
