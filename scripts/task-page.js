// let task = document.querySelector('input[name="task"]:checked');
// if (task) {
//   console.log(task.value);
// }

const id = crypto.randomUUID();
let modelInput = document.getElementById("edited-tasks");

let todoList = [
  { userTask: "Go to emily's house", id: crypto.randomUUID() },
  { userTask: "Zoom meeting with client", id: crypto.randomUUID() },
  { userTask: "Code javascript", id: crypto.randomUUID() },
];
renderTodo();
editTask();
addEvent();
let saveID;
function editTask() {
  document.querySelectorAll(".edit").forEach((editButton) => {
    editButton.addEventListener("click", () => {
      //when the user clicks edit we get the id of the task the user clicked
      const taskId = editButton.dataset.taskId;
      saveID = taskId;

      todoList.forEach((task) => {
        if (taskId === task.id) {
          document
            .querySelector(".overlay-container")
            .classList.remove("hidden");
          modelInput.value = task.userTask;
        }
      });
    });
  });
}

function editUserTask(taskId, editedMessage) {
  todoList.forEach((task) => {
    if (task.id === taskId) {
      task.userTask = editedMessage;
    }
  });
}

document.querySelector(".save").addEventListener("click", () => {
  editUserTask(saveID, modelInput.value);
  renderTodo();
  editTask();
  addEvent();
  document.querySelector(".overlay-container").classList.add("hidden");
});

let todoInput = document.getElementById("todo");
todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    let userTask = todoInput.value;
    // we get the user data and store it
    // we store each  data with a unique id

    todoList.push({
      userTask,
      id: crypto.randomUUID(),
    });

    todoInput.value = "";
    renderTodo();
    editTask();
    addEvent();
  }
});

// for each data we generate a html to the user

function renderTodo() {
  let todoListHTML = "";
  todoList.forEach((todo) => {
    const task = todo.userTask;

    let html = `
<div class="tasks">
    <div class="task-checked">
      <input type="radio" name="task" value="${task}" />
      <div class="main-task">${task}</div>
    </div>
    <div>
      <button class="edit" data-task-id="${todo.id}">edit</button>
      <span class="delete" data-task-id="${todo.id}">delete</span>
    </div>
  </div>
  
  `;
    todoListHTML += html;
  });
  document.querySelector(".content").innerHTML = todoListHTML;
}
function addEvent() {
  document.querySelectorAll(".delete").forEach((deleteButton) => {
    deleteButton.addEventListener("click", () => {
      const taskId = deleteButton.dataset.taskId;
      deleteTask(taskId);
    });
  });
}

function deleteTask(taskId) {
  let newTodo = todoList.filter((task) => {
    return task.id !== taskId;
  });
  todoList = newTodo;
  renderTodo();
  editTask();
  addEvent();
}

function outerFunction() {
  let outerVariable = "I'm outside!";
  function innerFunction() {
    let innerVariable = "I'm inside!";
    console.log(innerVariable);
    console.log(outerVariable);
  }
  console.log(innerVariable);
  innerFunction();
}
outerFunction();
//we go through our list of data looking for a matching id
//when we find a matching id we re-render the task in a pop up and the task in a input filed
// any changes made to the task will be saved in our list
