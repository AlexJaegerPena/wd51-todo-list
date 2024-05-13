const inputBox = document.getElementById("mb-input-box");
const addBtn = document.querySelector(".add-btn");
const mbTasksContainer = document.getElementById("mb-task-container");

const addTask = () => {
  if (inputBox.value === "") {
    alert("Please add your task. Your task input area is empty!");
  } else {
    // create task li element here
    let mbTaskListElm = document.createElement("li");
    mbTaskListElm.classList.add("mb-task");
    mbTasksContainer.appendChild(mbTaskListElm);

    // create main task div element inside li element here
    const mbTaskDivContainer = document.createElement("div");
    mbTaskListElm.appendChild(mbTaskDivContainer);

    // create task name div element inside main div element here
    const mbTaskNameDiv = document.createElement("div");
    mbTaskNameDiv.classList.add("mb-task-name");
    mbTaskDivContainer.appendChild(mbTaskNameDiv);

    // create P tag inside task-name div elmt
    const mbTaskPara = document.createElement("p");
    mbTaskPara.classList.add("mb-checked");
    mbTaskPara.innerHTML = inputBox.value;
    mbTaskNameDiv.appendChild(mbTaskPara);

    // create another main div for task status container
    const mbTaskStatusDivContainer = document.createElement("div");
    mbTaskStatusDivContainer.classList.add("mb-task-status-area");
    mbTaskDivContainer.appendChild(mbTaskStatusDivContainer);

    // create task status-complete div for task complete section
    const mbTaskCompleteDiv = document.createElement("div");
    mbTaskCompleteDiv.classList.add("mb-task-status");
    mbTaskStatusDivContainer.appendChild(mbTaskCompleteDiv);

    // create icon for complete status
    const mbTaskCompletIcon1 = document.createElement("i");
    mbTaskCompletIcon1.classList.add(
      "fa-regular",
      "fa-square-check",
      "status-check"
    );
    mbTaskCompleteDiv.appendChild(mbTaskCompletIcon1);

    const mbTaskCompletIcon2 = document.createElement("i");
    mbTaskCompletIcon2.classList.add(
      "fa-regular",
      "fa-square",
      "status-uncheck"
    );
    mbTaskCompleteDiv.appendChild(mbTaskCompletIcon2);

    // create P for complete status
    const mbTaskCompletePara = document.createElement("p");
    mbTaskCompletePara.innerText = "Incomplete";
    mbTaskCompleteDiv.appendChild(mbTaskCompletePara);

    // Complet task button work
    mbTaskCompleteDiv.addEventListener("click", () => {
      mbTaskPara.style.color = "red";
      mbTaskPara.style.textDecoration = "line-through";
      mbTaskCompletePara.innerText = "Complete";
      mbTaskCompletIcon1.style.display = "block";
      mbTaskCompletIcon2.style.display = "none";
      mbTaskCompleteDiv.style.backgroundColor = "#949494";
      mbTaskEditDiv.style.display = "none";

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
  }
};

addBtn.addEventListener("click", addTask);
