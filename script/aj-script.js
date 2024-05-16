const form = document.getElementById("form");
const ajErrMsg = document.getElementById("aj-msg");
const ajTextInput = document.getElementById("aj-textInput");
const ajDateInput = document.getElementById("aj-dateInput");
const ajTextArea = document.getElementById("aj-textarea");
const ajTasks = document.getElementById("aj-tasks");
const ajAddBtnBehave = document.getElementById("aj-add-btn-behave");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  ajFormValidation();
});

const ajFormValidation = () => {
  if (ajTextInput.value === "") {
    console.log("failure");
    ajErrMsg.innerHTML = "Task cannot be blank";
  } else {
    console.log("success");
    ajErrMsg.innerHTML = "";
    ajAcceptData();
    ajAddBtnBehave.setAttribute("data-bs-dismiss", "modal"); //sets attribute to add button, causes to close form
    ajAddBtnBehave.click();
    (() => {
      ajAddBtnBehave.setAttribute("data-bs-dismiss", ""); //prevents form to close without input, form only closes when we have success state
    })();
  }
};

// here the data is stored as objects in an array
let ajData = [];

// collect data and push into ajData
const ajAcceptData = () => {
  ajData.push({
    text: ajTextInput.value,
    date: ajDateInput.value,
    description: ajTextArea.value,
  });

  // pushing and storing data in localStorage
  localStorage.setItem("ajData", JSON.stringify(ajData)); //JSON.stringify to store an array and see what is inside of object

  console.log(ajData);
  ajCreateTasks();
};

const ajCreateTasks = () => {
  ajTasks.innerHTML = ""; // += to not replace the old content
  ajData.map((x, y) => {
    // x targets all objects one by one in data, y counts the index numbers
    return (ajTasks.innerHTML += `<div id=${y}>      
    <span class="fw-bold">${x.text}</span>
    <span class="small text-secondary">${x.date}</span>
    <p>${x.description}</p>
    <span class="aj-options">
      <i onClick="ajCheckTask(this)" class="fa-regular fa-square status-uncheck"></i>
      <i onClick= "ajEditTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-regular fa-pen-to-square"></i>
      <i onClick="ajDeleteTask(this)" class="fa-regular fa-trash-can"></i>
    </span>
  </div>`);
  });
  ajResetForm();
};

// --------  needs revision (also line 57) ----------
const ajCheckTask = (e) => {
  e.parentElement.parentElement.style["text-decoration"] = "line-through";
};

// selects the parent div and removes it
const ajDeleteTask = (e) => {
  e.parentElement.parentElement.remove();
  ajData.splice(e.parentElement.parentElement.id, 1); //deleted the id, 1 stands for the number of items i want to delete
  localStorage.setItem("ajData", JSON.stringify(ajData));
};
// edit opens the form with the already inserted inputs
const ajEditTask = (e) => {
  const ajSelectedTask = e.parentElement.parentElement; //ajSelectedTask is the div parent
  ajTextInput.value = ajSelectedTask.children[0].innerHTML; //first child of div
  ajDateInput.value = ajSelectedTask.children[1].innerHTML; //second child of div
  ajTextArea.value = ajSelectedTask.children[2].innerHTML; //third child of div
  ajData.splice(ajSelectedTask.id, 1); // Remove the task from the data array
  ajSelectedTask.remove(); //removes the old edited task
};

// resets the form to empty fields after submitting
const ajResetForm = () => {
  ajTextInput.value = "";
  ajDateInput.value = "";
  ajTextArea.value = "";
};

// retrieve data from localStorage into the app
// JSON.parse convert data into an array and || [] initializes empty array when there is no data in localStorage
(() => {
  ajData = JSON.parse(localStorage.getItem("ajData")) || [];
  ajCreateTasks();
  console.log(ajData);
})();
