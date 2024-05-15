// const mbTasksArr = JSON.parse(localStorage.getItem("task-list")) || [];

// addBtn.addEventListener("click", () => {
//   let taskName = inputBox.value;
//   if (taskName === "") {
//     alert("Please add your task. Your task input area is empty!");
//     return;
//   } else {
//     showTaskMb();
//   }
// });

// showTaskMb();

// function showTaskMb() {
//   const taskName = inputBox.value;

//   let html = "";
//   const x = mbTasksArr?.map((task) => {
//     html += `<li class="mb-task">
//       <div>
//       <div class="mb-task-name">
//       <p class="mb-checked">
//       ${taskName}
//       </p>
//       </div>
//         <div class="mb-task-status-area">
//           <div class="mb-task-status">
//           <i class="fa-regular fa-square-check status-check"></i>
//           <i class="fa-regular fa-square status-uncheck"></i>
//           <p>Incomplete</p>
//           </div>
//           <div class="mb-task-edit">
//           <i class="fa-regular fa-pen-to-square"></i>
//           <p>Edit</p>
//           </div>
//           <div class="mb-task-delete">
//           <i class="fa-regular fa-trash-can"></i>
//           <p>Delete</p>
//           </div>
//           </div>
//           </div>
//           </li>`;
//   });

//   console.log(x);
//   console.log(html);
// mbTasksContainer.innerHTML = html.trim();
// mbTasksArr.push(html);
// localStorage.setItem("task-list", JSON.stringify(mbTasksArr));
// inputBox.value = "";
// }

// const editBtn = document.querySelector(".amb-task-edit");
// editBtn.addEventListener("click", () => {
//   console.log("edit button clicked");
// });

// function addMbTask() {
//     // If input is valid, add item to items array
//     mbTaskItemsArr.push({});
//   }
// }

// mbTask added function
const mbTaskAdded = () => {
  let html = "";
  html += `<li class="mb-task">
      <div>
      <div class="mb-task-name">
      <p class="mb-checked" id="taskName">
      ${taskName}
      </p>
      </div>
        <div class="mb-task-status-area">
          <div id="mbSaskStatus" class="mb-task-status">
          <i id="statusCheck" class="fa-regular fa-square-check status-check"></i>
          <i id="statusUnCheck" class="fa-regular fa-square status-uncheck"></i>
          <p id="Incomplete">Incomplete</p>
          </div>
          <div id="mbTaskEdit" class="mb-task-edit">
          <i class="fa-regular fa-pen-to-square"></i>
          <p>Edit</p>
          </div>
          <div class="mb-task-delete">
          <i class="fa-regular fa-trash-can"></i>
          <p>Delete</p>
          </div>
          </div>
          </div>
          </li>`;

  // // create task li element here
  // let mbTaskListElm = document.createElement("li");
  // mbTaskListElm.classList.add("mb-task");
  // mbTasksContainer.appendChild(mbTaskListElm);

  // // create main task div element inside li element here
  // const mbTaskDivContainer = document.createElement("div");
  // mbTaskListElm.appendChild(mbTaskDivContainer);

  // // create task name div element inside main div element here
  // const mbTaskNameDiv = document.createElement("div");
  // mbTaskNameDiv.classList.add("mb-task-name");
  // mbTaskDivContainer.appendChild(mbTaskNameDiv);

  // // create P tag inside task-name div elmt
  // const mbTaskPara = document.createElement("p");
  // mbTaskPara.classList.add("mb-checked");
  // mbTaskPara.innerHTML = inputBox.value;
  // mbTaskNameDiv.appendChild(mbTaskPara);

  // // create another main div for task status container
  // const mbTaskStatusDivContainer = document.createElement("div");
  // mbTaskStatusDivContainer.classList.add("mb-task-status-area");
  // mbTaskDivContainer.appendChild(mbTaskStatusDivContainer);

  // // create task status-complete div for task complete section
  // const mbTaskCompleteDiv = document.createElement("div");
  // mbTaskCompleteDiv.classList.add("mb-task-status");
  // mbTaskStatusDivContainer.appendChild(mbTaskCompleteDiv);

  // // create icon for complete status
  // const mbTaskCompletIcon1 = document.createElement("i");
  // mbTaskCompletIcon1.classList.add(
  //   "fa-regular",
  //   "fa-square-check",
  //   "status-check"
  // );
  // mbTaskCompleteDiv.appendChild(mbTaskCompletIcon1);

  // const mbTaskCompletIcon2 = document.createElement("i");
  // mbTaskCompletIcon2.classList.add("fa-regular", "fa-square", "status-uncheck");
  // mbTaskCompleteDiv.appendChild(mbTaskCompletIcon2);

  // // create P for complete status
  // const mbTaskCompletePara = document.createElement("p");
  // mbTaskCompletePara.innerText = "Incomplete";
  // mbTaskCompleteDiv.appendChild(mbTaskCompletePara);

  // Complet task button work
  const Incomplete = document.getElementById("Incomplete");
  const taskName = document.getElementById("taskName");
  const statusCheck = document.getElementById("statusCheck");
  const statusUnCheck = document.getElementById("statusUnCheck");
  const mbSaskStatus = document.getElementById("mbSaskStatus");
  const mbTaskEdit = document.getElementById("mbTaskEdit");
  Incomplete.addEventListener("click", () => {
    taskName.style.color = "red";
    taskName.style.textDecoration = "line-through";
    Incomplete.innerText = "Complete";
    statusCheck.style.display = "block";
    statusUnCheck.style.display = "none";
    mbSaskStatus.style.backgroundColor = "#949494";
    mbTaskEdit.style.display = "none";

    console.log("complete area clickecd");
  });

  // edit div create
  const mbTaskEditDiv = document.createElement("div");
  mbTaskEditDiv.classList.add("mb-task-edit");
  mbTaskStatusDivContainer.appendChild(mbTaskEditDiv);

  // Edit button work
  mbTaskEditDiv.addEventListener("click", () => {
    inputBox.value = mbTaskPara.innerText;
    const parent = mbTaskEditDiv.parentElement;
    parent.parentElement.remove();
  });

  const mbTaskEditIcon = document.createElement("i");
  mbTaskEditIcon.classList.add("fa-regular", "fa-pen-to-square");
  mbTaskEditDiv.appendChild(mbTaskEditIcon);

  // create P for edit status
  const mbTaskEditPara = document.createElement("p");
  mbTaskEditPara.innerText = "Edit";
  mbTaskEditDiv.appendChild(mbTaskEditPara);

  // Delete div create
  const mbTaskDeleteDiv = document.createElement("div");
  mbTaskDeleteDiv.classList.add("mb-task-delete");
  mbTaskStatusDivContainer.appendChild(mbTaskDeleteDiv);

  // Delete button work
  mbTaskDeleteDiv.addEventListener("click", () => {
    alert("Do you realy want to delete your task?");
    const parent = mbTaskDeleteDiv.parentElement;
    parent.parentElement.remove();
  });

  const mbTaskDeleteIcon = document.createElement("i");
  mbTaskDeleteIcon.classList.add("fa-regular", "fa-trash-can");
  mbTaskDeleteDiv.appendChild(mbTaskDeleteIcon);

  // create P for edit status
  const mbTaskDeletePara = document.createElement("p");
  mbTaskDeletePara.innerText = "Delete";
  mbTaskDeleteDiv.appendChild(mbTaskDeletePara);

  console.log(inputBox.value);
  inputBox.value = "";
};

// addTask from input
const addTask = () => {
  if (inputBox.value === "") {
    alert("Please add your task. Your task input area is empty!");
  } else {
    mbTaskAdded();
  }
};

// button activities
addBtn.addEventListener("click", addTask);

// LocalStorage
// localStorage.setItem("mbtask", mbTask());
