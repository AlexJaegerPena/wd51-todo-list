const inputBox = document.getElementById("mb-input-box");
const mbForm = document.getElementById("mbForm");
const addBtn = document.querySelector(".add-btn");
const mbTasksContainer = document.getElementById("mb-task-container");

// Tasks Array and local store
let arrFromLocal = JSON.parse(localStorage.getItem("mbtask-list")) || [];

// AddEventListener in form input
mbForm.addEventListener("submit", (e) => {
  e.preventDefault();
  inputValidation();
});

// Input data Validation
const inputValidation = () => {
  addBtn.innerHTML = "Add";
  let taskName = inputBox.value;
  if (taskName === "") {
    alert("Please add your task. Your task input area is empty!");
    return;
  } else {
    arrFromLocal.unshift(taskName);
    localStorage.setItem("mbtask-list", JSON.stringify(arrFromLocal));
    createTasksMb();
    inputBox.value = "";
  }
};

// create tasks
function createTasksMb() {
  let htmlOutput = "";
  arrFromLocal.map((task, index) => {
    htmlOutput += `<li id =${index} class="mb-task">
      <div>
      <div class="mb-task-name">
      <p class="mb-checked">
      ${task}
      </p>
      </div>
        <div class="mb-task-status-area">
          <div class="mb-task-status" onclick = "completeTask(this)">
          <i class="fa-regular fa-square-check status-check"></i>
          <i class="fa-regular fa-square status-uncheck"></i>
          <p>Incomplete</p>
          </div>
          <div class="mb-task-edit" onclick = "editTask(this)" >
          <i class="fa-regular fa-pen-to-square"></i>
          <p>Edit</p>
          </div>
          <div id = "deleteBtn" class="mb-task-delete" onclick = "deleteTask(this)">
          <i class="fa-regular fa-trash-can"></i>
          <p>Delete</p>
          </div>
          </div>
          </div>
          </li>`;
  });

  mbTasksContainer.innerHTML = htmlOutput.trim();

  // console.log(htmlOutput);
}

// Complete task
function completeTask(e) {
  console.log("complete button clicked");

  e.style.backgroundColor = "#e07a5f";
  const nextElement = e.nextElementSibling;
  const TaskNameElm = e.parentElement.previousElementSibling;
  nextElement.remove();
  e.lastElementChild.innerHTML = "Task is completed";
  TaskNameElm.style.textDecoration = "line-through";
  TaskNameElm.style.backgroundColor = "#f5ebe0";
  TaskNameElm.style.color = "red";
  e.children.item(0).style.display = "block";
  e.children.item(1).style.display = "none";

  // console.log(e.parentElement.previousElementSibling);
  // console.log(e.children.item(0));
  // console.log(e.children.item(1));
  // console.log(e.nextElementSibling);
  // console.log(e.lastElementChild);
}

// Edit task
function editTask(e) {
  console.log("edit button clicked");
  const taskNamePara = document.querySelector(".mb-checked");
  inputBox.value = taskNamePara.innerText;
  addBtn.innerHTML = "Update";
  deleteTask(e);
}

// Delete task
function deleteTask(e) {
  let selectListContainer = e.parentElement.parentElement.parentElement;
  selectListContainer.remove();

  // alert("Do you realy want to delete your task?");
  arrFromLocal.splice(selectListContainer.id, 1);
  localStorage.setItem("mbtask-list", JSON.stringify(arrFromLocal));

  console.log(`The tast index number is: ${selectListContainer.id}`);
}

(() => {
  arrFromLocal = JSON.parse(localStorage.getItem("mbtask-list")) || [];
  createTasksMb();
  console.log(arrFromLocal);
})();
