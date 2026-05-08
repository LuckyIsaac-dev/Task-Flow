// FEATURES TO ADD NEXT //
/* 
1.WHEN YOU HOVER OVER TASK OR CLICK THE TASK CONTAINER IT SHOULD MAKE THE DELETE AND EDIT ICON VISIBLE
2.IF THERE NO TASK ON THE PAGE THE MAIN ADD BUTTON STYLES SHOULD BE SHOWN ALONG WITH AN ILLUSTRATION AND A WRITE UP 
3.WHEN THE BUTTON IS CLICKED IT GENERATE A POPUP WITH THE INPUT ELEMENT INSIDE  AND A "ADD task" BUTTON THAT ADD'S TASK TO THE TODOLIST
4.MAKE THE NEW DESINGED BUTTON ACTIVE
---------------------------OR ---------------
DISPLAY THE INPUT WHEN THERE IS NO  TASK YET WITH THE MAIN BUTTON IN A CONTAINER
*/

const id = crypto.randomUUID();
let modelInput = document.getElementById("edited-tasks");

// PRACTICE CODE FOR WHEN AN ELEMENT LOSES FOCUS

let todoInput = document.getElementById("todo");
todoInput.addEventListener("focus", (e) => {
  console.log(e);
  document.querySelector(".add-task").classList.remove("hidden");
});
todoInput.addEventListener("focusout", () => {
  document.querySelector(".add-task").classList.add("hidden");
});

let todoList = [
  { userTask: "Go to emily's house", id: crypto.randomUUID() },
  { userTask: "Zoom meeting with client", id: crypto.randomUUID() },
  { userTask: "Code javascript", id: crypto.randomUUID() },
];
renderTodo();

let saveID;
function renderOverlay() {
  document.querySelectorAll(".edit").forEach((editButton) => {
    editButton.addEventListener("click", () => {
      //when the user clicks edit we get the id of the task the user clicked
      const taskId = editButton.dataset.taskId;
      saveID = taskId;
      //we go through our list of data looking for a matching id

      todoList.forEach((task) => {
        if (taskId === task.id) {
          //when we find a matching id we re-render the task in a pop up and the task in a input filed
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

  document.querySelector(".overlay-container").classList.add("hidden");
});

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
  }
});

// for each data we generate a html to the user

function renderTodo() {
  let todoListHTML = "";
  todoList.forEach((todo) => {
    const task = todo.userTask;

    let html = `
<div class="tasks-container" data-task-id="${todo.id}">
    <div class="checkbox-container">
      <input type="checkbox" name="task" value="${task}" />
      <div class="task">${task}</div>
    </div>
    <div class="editing-container-${todo.id}">
      <span class="edit" data-task-id="${todo.id}">
      <img class="edit-icon js-edit-icon-${todo.id} hidden " src="images/icons8-pencil-24.png" alt="edit-task" />
      </span>
      <span class="delete" data-task-id="${todo.id}"> 
          <img class="delete-icon js-icon-${todo.id} hidden " src="images/icons8-trash-24.png" alt="trash icon">
      </span>
    </div>
  </div>
  
  `;
    todoListHTML += html;
  });
  document.querySelector(".js-content").innerHTML = todoListHTML;
  renderOverlay();
  addDeleteEvent();
}
document.querySelectorAll(".tasks-container").forEach((container) => {
  container.addEventListener("mouseover", (e) => {
    let containerId = e.target.dataset.taskId;
    document
      .querySelector(`.js-icon-${containerId}`)
      .classList.remove("hidden");
    document
      .querySelector(`.js-edit-icon-${containerId}`)
      .classList.remove("hidden");
  });
});
document.querySelectorAll(".tasks-container").forEach((container) => {
  container.addEventListener("mouseout", (e) => {
    let containerId = e.target.dataset.taskId;
    document.querySelector(`.js-icon-${containerId}`).classList.add("hidden");
    document
      .querySelector(`.js-edit-icon-${containerId}`)
      .classList.add("hidden");
  });
});

function addDeleteEvent() {
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
}

if (todoList.length > 0) {
  todoInput.classList.add("hidden");
}

// any changes made to the task will be saved in our list
function makeCounter() {
  let count = 0;
  return {
    increment() {
      count++;
    },
    getCount() {
      return count;
    },
  };
}

const a = makeCounter();
const b = makeCounter();

a.increment();
a.increment();
b.increment();

console.log(a.getCount());
console.log(b.getCount());

class Dog {
  constructor(name, breed, weight) {
    this.name = name;
    this.breed = breed;
    this.weight = weight;
  }
}

class Duck {
  constructor(type, canFly) {
    this.type = type;
    this.canFly = canFly;
  }
}

const fido = new Dog("fido", "mixed", "30ps");
console.log(fido);
