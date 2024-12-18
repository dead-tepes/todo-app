import "./style.css";

// define the state of app
const todos = [
  { id: 1, text: "Buy milk", completed: false },
  { id: 2, text: "Buy bread", completed: false },
  { id: 3, text: "Buy jam", completed: true },
];
let nextTodoId = 4;
let filter = "all"; // can be 'all', 'active' 'completed'

// function to render the todos
function renderTodos() {
  const todoListElement = document.getElementById("todo-list");
  todoListElement.innerHTML = ""; // clear the current list

  // filter todos based on the current filter setting
  let filteredTodos = [];
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    if (filter === "all") {
      filteredTodos.push(todo);
    } else if (filter === "completed" && todo.completed) {
      filteredTodos.push(todo);
    } else if (filter === "active" && !todo.completed) {
      filteredTodos.push(todo);
    }
  }

  // loop through the filtered todos and add them to the dom
  for (let i = 0; i < filteredTodos.length; i++) {
    const todo = filteredTodos[i];

    const todoItem = document.createElement("div");
    todoItem.classList.add("p-4", "todo-item");
    todoListElement.appendChild(todoItem);

    const todoText = document.createElement("div");
    todoText.id = `todo-text-${todo.id}`;
    todoText.classList.add("todo-text");
    if (todo.completed) {
      todoText.classList.add("line-through");
    }
    todoText.textContent = todo.text;
    todoItem.appendChild(todoText);

    const todoEdit = document.createElement("input");
    todoEdit.classList.add("hidden", "todo-edit");
    todoEdit.value = todo.text;
    todoItem.appendChild(todoEdit);
  }
}

// add a new todo
function handleNewTodoKeydown(event) {
  const newTodoInput = event.target;
  const todoText = newTodoInput.value.trim();
  if (event.key === "Enter" && todoText !== "") {
    todos.push({ id: nextTodoId++, text: todoText, completed: false });
    newTodoInput.value = ""; // clear the input
    renderTodos();
  }
}

// function to mark a todo as completed
function handleClickOnNavBar(event) {
  // if the clicked element is an anchor tab
  if (event.target.tagName === "A") {
    const hrefValue = event.target.href;
    const action = hrefValue.split("/").pop();
    filter = action === "" ? "all" : action;
    // console.log(filter);
    renderTodos();
    renderTodoNavBar(hrefValue);
  }
}

// function that updates appearance of current filter
function renderTodoNavBar(href) {
  const elements = todoNav.children;
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element.href === href) {
      element.classList.add(
        "underline",
        "underline-offset-4",
        "decoration-rose-800",
        "decoration-2",
      );
    } else {
      element.classList.remove(
        "underline",
        "underline-offset-4",
        "decoration-rose-800",
        "decoration-2",
      );
    }
  }
}

// function to toggle the completed status of todo
function handleClickOnTodoList(event) {
  let todo = null;
  if (event.target.id !== null && event.target.id.includes("todo-text")) {
    todo = event.target;
  }
  let todoIdNumber = -1;
  if (todo) {
    const todoId = event.target.id.split("-").pop();
    todoIdNumber = Number(todoId);
  }

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === todoIdNumber) {
      todos[i].completed = !todos[i].completed;
    }
  }

  // render app ui
  renderTodos();
}

const todoListElement = document.getElementById("todo-list");
todoListElement.addEventListener("click", handleClickOnTodoList);

const todoNav = document.getElementById("todo-nav");
todoNav.addEventListener("click", handleClickOnNavBar);

const newTodoInput = document.getElementById("new-todo");
newTodoInput.addEventListener("keydown", handleNewTodoKeydown);

document.addEventListener("DOMContentLoaded", renderTodos);
