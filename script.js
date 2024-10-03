// Sélection des éléments du DOM
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const filterButtons = document.querySelectorAll('.filters button');

let todos = [];

// Fonction pour ajouter une tâche
function addTodo(e) {
    e.preventDefault();
    const todoText = todoInput.value.trim();

    if (todoText) {
        todos.push({ text: todoText, completed: false });
        todoInput.value = ''; // Réinitialiser l'input
        renderTodos(); // Afficher la liste mise à jour
    }
}

// Fonction pour afficher les tâches
function renderTodos(filter = 'all') {
    todoList.innerHTML = ''; // Vider la liste avant de la recharger

    todos
        .filter(todo => {
            if (filter === 'all') return true;
            if (filter === 'active') return !todo.completed;
            if (filter === 'completed') return todo.completed;
        })
        .forEach((todo, index) => {
            const li = document.createElement('li');
            li.classList.toggle('completed', todo.completed);

            li.innerHTML = `
                <span>${todo.text}</span>
                <div>
                    <button onclick="toggleComplete(${index})">${todo.completed ? 'Actif' : 'Complété'}</button>
                    <button onclick="deleteTodo(${index})">Supprimer</button>
                </div>
            `;
            todoList.appendChild(li);
        });
}

// Fonction pour marquer une tâche comme complétée
function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos(); // Réafficher la liste
}

// Fonction pour supprimer une tâche
function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos(); // Réafficher la liste
}

// Gestion des filtres (toutes, actives, complétées)
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        renderTodos(filter); // Afficher selon le filtre choisi
    });
});

// Écouteur d'événement sur le formulaire d'ajout de tâche
todoForm.addEventListener('submit', addTodo);
