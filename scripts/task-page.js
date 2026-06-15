// FEATURES TO ADD NEXT //
/* 
1.WHEN YOU HOVER OVER TASK OR CLICK THE TASK CONTAINER IT SHOULD MAKE THE DELETE AND EDIT ICON VISIBLE // DONE//
2.IF THERE NO TASK ON THE PAGE THE MAIN ADD BUTTON STYLES SHOULD BE SHOWN ALONG WITH AN ILLUSTRATION AND A WRITE UP /
3.WHEN THE BUTTON IS CLICKED IT GENERATE A POPUP WITH THE INPUT ELEMENT INSIDE  AND A "ADD task" BUTTON THAT ADD'S TASK TO THE TODOLIST// DONE/
4.MAKE THE NEW DESINGED BUTTON ACTIVE// DONE//
5.ASK THE USER IF HIS SURE HE WANTS TO DELETE THE TASK BEFORE DELETING // DONE //
6. GIVE FEEDBACK WHEN A TASK IS DELETED
---------------------------OR ---------------
DISPLAY THE INPUT WHEN THERE IS NO  TASK YET WITH THE MAIN BUTTON IN A CONTAINER
*/

const id = crypto.randomUUID();
const modelInput = document.getElementById("editing-input");

let todoInput = document.querySelector(".todo");
const renderBtn = document.querySelector(".render-card-button");
const overlayContainer = document.querySelector(".overlay-container");
const deleteOverlay = document.querySelector(".delete-overlay-container");
const deletedTask = document.querySelector(".js-delete-task");
const confirmDeleteBtn = document.querySelector(".confirm-delete");
const cancelDeleteBtn = document.querySelector(".cancel-delete");
const jsContent = document.querySelector(".js-content");
const addTaskCard = document.querySelector(".add-task-card");
const jsCancelTask = document.querySelector(".js-cancel-task");
const sideBarOverlay = document.querySelector(".sidebar-overlay");
const nav = document.querySelector(".nav");
const menu = document.querySelector(".hamburgar-menu");
const navMenu = document.querySelector(".hamburgar-menu2");

let todoList;
todoList = JSON.parse(localStorage.getItem("todolist")) || [];

const completedTask = [];
renderTodo();
jsContent.addEventListener("click", deleteTask);
jsContent.addEventListener("click", renderOverlay);

let saveID;

document.querySelector(".save").addEventListener("click", () => {
  editUserTask(saveID, modelInput.value);
  renderTodo();
  saveToStorage();
  overlayContainer.classList.remove("show");
});

todoInput.addEventListener("keydown", (e) => {
  if (todoInput.value === "") return;

  if (e.key === "Enter") {
    let userTask = todoInput.value;
    // we get the user data and store it
    // we store each  data with a unique id
    todoList.push({
      userTask,
      id: crypto.randomUUID(),
    });
    saveToStorage();

    todoInput.value = "";
    renderTodo();
  }
});

jsCancelTask.addEventListener("click", () => {
  todoInput.value = "";
  addTaskCard.classList.remove("show");
  todoInput.classList.remove("show");
  renderBtn.classList.remove("hidden");
});

renderBtn.addEventListener("click", () => {
  addTaskCard.classList.add("show");
  todoInput.classList.add("show");
  renderBtn.classList.add("hidden");
});

document.querySelector(".js-add-task").addEventListener("click", () => {
  if (todoInput.value === "") return;
  let userTask = todoInput.value;
  // we get the user data and store it

  // we store each  data with a unique id
  todoList.push({
    userTask,
    id: crypto.randomUUID(),
  });

  todoInput.value = "";
  renderTodo();
  saveToStorage();
});

// for each data we generate a html to the user

function renderTodo() {
  let todoListHTML = "";

  todoList.forEach((todo) => {
    const task = todo.userTask;

    let html = `
  <div class="tasks-container" data-task-id="${todo.id}">
   <div class="checkbox-container">
      <input class="check-box" type="checkbox" name="task" value="${task}" data-task-id="${todo.id}" />
     <div class="task">${task}</div>
    </div>

    <div class="editing-container-${todo.id}">
        <span class="edit" data-task-id="${todo.id}">
          <img class="edit-icon" src="images/icons8-pencil-24.png" alt="edit-task" data-task-id="${todo.id}" />
        </span>

        <span class="delete" data-task-id="${todo.id}"> 
          <img data-task-id="${todo.id}" class="delete-icon" src="images/icons8-trash-24.png" alt="trash icon">
        </span>

    </div>
</div> `;

    todoListHTML += html;
  });
  document.querySelector(".js-content").innerHTML = todoListHTML;
}

function deleteTask(e) {
  const deleteBtn = e.target.closest(".delete-icon");

  if (deleteBtn) {
    const taskId = deleteBtn.dataset.taskId;
    const taskItem = deleteBtn.closest(".tasks-container");

    todoList.forEach((task) => {
      if (taskId === task.id) {
        deletedTask.innerText = task.userTask;
      }
    });
    deleteOverlay.classList.add("show");

    function handleDelete() {
      taskItem.remove();

      let newTodo = todoList.filter((task) => {
        return task.id !== taskId;
      });
      todoList = newTodo;
      saveToStorage();
      deleteOverlay.classList.remove("show");
      cleanUp();
    }

    function handleCancel() {
      deleteOverlay.classList.remove("show");
      cleanUp();
    }

    function cleanUp() {
      confirmDeleteBtn.removeEventListener("click", handleDelete);
      cancelDeleteBtn.removeEventListener("click", handleCancel);
    }
    confirmDeleteBtn.addEventListener("click", handleDelete);
    cancelDeleteBtn.addEventListener("click", handleCancel);
  }
}

function renderOverlay(e) {
  const editBtn = e.target.closest(".edit-icon");
  if (editBtn) {
    const taskId = editBtn.dataset.taskId;
    saveID = taskId;

    todoList.forEach((task) => {
      if (taskId === task.id) {
        //when we find a matching id we re-render the task in a pop up and the task in the input filed
        overlayContainer.classList.add("show");
        modelInput.value = task.userTask;
      }
    });
  }
}

function editUserTask(taskId, editedMessage) {
  todoList.forEach((task) => {
    if (task.id === taskId) {
      task.userTask = editedMessage;
    }
  });
}

jsContent.addEventListener("click", finishedToDo);

function finishedToDo(e) {
  const finishedTask = e.target.closest(".check-box");

  if (finishedTask) {
    const taskContainer = finishedTask.closest(".tasks-container");
    const checkBoxId = e.target.dataset.taskId;

    let newTodo = todoList.filter((task) => {
      return task.id !== checkBoxId;
    });
    todoList.forEach((task) => {
      if (task.id === checkBoxId) {
        completedTask.push(task);
        console.log(completedTask);
      }
    });

    todoList = newTodo;
    taskContainer.remove();
    saveToStorage();
  }
}

function saveToStorage() {
  localStorage.setItem("todolist", JSON.stringify(todoList));
}

menu.addEventListener("click", () => {
  nav.classList.add("nav-show");
  navMenu.classList.add("show");
  sideBarOverlay.classList.add("side-bar-show");
});

navMenu.addEventListener("click", () => {
  sideBarOverlay.classList.remove("side-bar-show");
  nav.classList.remove("nav-show");
  navMenu.classList.remove("show");
});

sideBarOverlay.addEventListener("click", () => {
  nav.classList.remove("nav-show");
  sideBarOverlay.classList.remove("side-bar-show");
});
let calender = document.getElementById("calender");
document.querySelector(".calender-page").addEventListener("click", () => {
  console.log("calender");
  calender.style.display = "initial";
  console.log(calender);
});
