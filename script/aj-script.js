const ajInputBox = document.getElementById("aj-input-box");
const ajListContainer = document.getElementById("aj-list-container");
// const ajListItem = document.getElementById("aj-listitem");

// creates task list element
function addAjTask() {
  if (ajInputBox.value === "") {
    alert("Please add a task!");
  } else {
    let ajListItem = document.createElement("li");
    ajListItem.innerHTML = ajInputBox.value;
    ajListContainer.appendChild(ajListItem);
    let ajSpan = document.createElement("span");
    ajSpan.innerHTML = "\u00d7";
    ajListItem.appendChild(ajSpan);
  }
  ajInputBox.value = "";
}

const alexButton = document.querySelector(".aj-add-button");

alexButton.addEventListener("click", addAjTask());
