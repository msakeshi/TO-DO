document.addEventListener('DOMContentLoaded', () => {
    const newTodoInput = document.getElementById('new-todo');
    const addTodoButton = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');

    const MIN_TODOS = 1;
    const MAX_TODOS = 999;

    // Load todos from local storage
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    const renderTodos = () => {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.textContent = todo;
            const deleteButton = document.createElement('button');
            const deleteIcon = document.createElement('i');
            deleteIcon.className = 'fas fa-trash';
            deleteButton.appendChild(deleteIcon);
            deleteButton.addEventListener('click', () => {
                todos.splice(index, 1);
                localStorage.setItem('todos', JSON.stringify(todos));
                renderTodos();
            });
            li.appendChild(deleteButton);
            todoList.appendChild(li);
        });
    };

    addTodoButton.addEventListener('click', () => {
        const newTodo = newTodoInput.value.trim();
        if (newTodo !== '') {
            if (todos.length < MAX_TODOS) {
                todos.push(newTodo);
                localStorage.setItem('todos', JSON.stringify(todos));
                renderTodos();
                newTodoInput.value = '';
            } else {
                alert(`You can only have a maximum of ${MAX_TODOS} todos.`);
            }
        }
    });

    renderTodos();
});
