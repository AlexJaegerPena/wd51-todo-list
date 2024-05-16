const inputBox = document.getElementById("mb-input-box");
const mbForm = document.getElementById("mbForm");
const addBtn = document.querySelector(".add-btn");
const updateTaskBtn = document.querySelector(".update-btn");
const mbTasksContainer = document.getElementById("mb-task-container");

// Tasks Array and local store
let arrFromLocal = JSON.parse(localStorage.getItem("mbtask-list")) || [];

// AddEventListener in form input
addBtn.addEventListener("click", (e) => {
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
          <div class="mb-task-edit" onclick = "editTask(${index},this)" >
          <i class="fa-regular fa-pen-to-square"></i>
          <p>Edit</p>
          </div>
          <div id = "deleteBtn" class="mb-task-delete" onclick = "deleteTask(${index})">
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
  localStorage.setItem("mbtask-list", JSON.stringify(arrFromLocal));
  // createTasksMb();

  // console.log(e.parentElement.previousElementSibling);
  // console.log(e.children.item(0));
  // console.log(e.children.item(1));
  // console.log(e.nextElementSibling);
  // console.log(e.lastElementChild);
}

// Edit task
function editTask(index) {
  let editTaskContent = arrFromLocal[index];
  console.log(editTaskContent);
  console.log(typeof editTaskContent);
  arrFromLocal = JSON.parse(localStorage.getItem("mbtask-list"));
  const saveIndex = document.getElementById("saveIndex");
  // console.log(`"edit button clicked" ${index}`);
  saveIndex.value = index;
  inputBox.value = arrFromLocal[index];
  updateTaskBtn.style.display = "block";
  updateTaskBtn.style.backgroundColor = "#fb8500";
  addBtn.style.display = "none";
  // console.log(arrFromLocal[index]);

  // addBtn.innerHTML = "Update";
  // console.log("edit button clicked");
  // const taskNamePara = document.querySelector(".mb-checked");
  // inputBox.value = taskNamePara.innerText;
  // addBtn.innerHTML = "Update";
  // deleteTask(e);
  localStorage.setItem("mbtask-list", JSON.stringify(arrFromLocal));
}

// Update Task
updateTaskBtn.addEventListener("click", () => {
  const saveIndex = document.getElementById("saveIndex").value;
  addBtn.style.display = "block";
  updateTaskBtn.style.display = "none";

  console.log(`"Update button clicked" ${saveIndex}`);

  arrFromLocal[saveIndex] = inputBox.value;
  localStorage.setItem("mbtask-list", JSON.stringify(arrFromLocal));
  inputBox.value = "";
  createTasksMb();
});
// Delete task
function deleteTask(index) {
  // let selectListContainer = e.parentElement.parentElement.parentElement;
  // selectListContainer.remove();

  // alert("Do you realy want to delete your task?");
  arrFromLocal.splice(index, 1);
  localStorage.setItem("mbtask-list", JSON.stringify(arrFromLocal));
  addBtn.style.display = "block";
  updateTaskBtn.style.display = "none";
  inputBox.value = "";
  createTasksMb();

  // console.log(`The tast index number is: ${selectListContainer.id}`);
}

(() => {
  arrFromLocal = JSON.parse(localStorage.getItem("mbtask-list")) || [];
  createTasksMb();
  // console.log(arrFromLocal);
})();
