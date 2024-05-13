const addFroms = document.querySelectorAll('.add-form');

addFroms.forEach(addFrom => {
    addFrom.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskObj = createTaskObj(addFrom)
        const taskList = updateStorage(e.target.id, taskObj);
        fillTaskList(e.target, taskList);
        addFrom.reset();
    })
})


// Fill tasks from localStorage on first loading
const taskIds = [...addFroms].map(addFrom => addFrom.id)
taskIds.forEach(id => {
    const taskList = JSON.parse(localStorage.getItem(id)) || [];
    fillTaskList(document.getElementById(id), taskList);
})

// TMP
const delBtns = document.querySelectorAll('.mb-task-delete');
console.log(delBtns.length)


function fillTaskList(addForm, taskList) {
    const curList = addForm.nextElementSibling;
    curList.innerHTML = '';
    console.log(taskList)
    const taskItems = taskList.map(t => createTaskItem(t))
    curList.append(...taskItems);
}

function updateStorage(itemName, taskObj) {
    // localStorage.clear();
    const curData = localStorage.getItem(itemName) || "[]";
    const data = JSON.parse(curData);
    data.push(taskObj);
    localStorage.setItem(itemName, JSON.stringify(data));
    return JSON.parse(localStorage.getItem(itemName))
}

function createTaskObj(addFrom) {
    const formData = new FormData(addFrom);
    const data = Object.fromEntries(formData);
    data.complete = false;
    data.id = crypto.randomUUID();
    return data;
}

function createTaskItem(task) {
    const li = document.createElement('li');
    li.classList.add('mb-task');
    li.id = task.id;
    // Task name
    const taskName = document.createElement('p');
    taskName.classList.add('mb-task-name', 'mb-checked');
    taskName.textContent = task.task;
    // Status area
    const statusArea = document.createElement('div');
    statusArea.classList.add('mb-task-status-area');

    // Status
    const taskStatus = document.createElement('div');
    taskStatus.classList.add('mb-task-status');

    const statusIconChk = document.createElement('i');
    statusIconChk.classList.add('fa-regular', 'fa-square-check', 'status-check');

    const statusIconUnchk = document.createElement('i');
    statusIconUnchk.classList.add('fa-regular', 'fa-square', 'status-uncheck');

    const statusText = document.createElement('p')
    statusText.textContent = 'Incomplete';

    taskStatus.append(statusIconChk, statusIconUnchk, statusText);

    // Edit 
    const taskEdit = document.createElement('div');
    taskEdit.classList.add('mb-task-edit');
    
    const editIcon = document.createElement('i');
    editIcon.classList.add('fa-regular', 'fa-pen-to-square');

    const editText = document.createElement('p')
    editText.textContent = 'Edit';

    taskEdit.append(editIcon, editText);
    // Delete
    const taskDelete = document.createElement('div');
    taskDelete.classList.add('mb-task-delete');
    taskDelete.addEventListener('click', delHandler)

    const delIcon = document.createElement('i');
    delIcon.classList.add('fa-regular', 'fa-trash-can');

    const delText = document.createElement('p');
    delText.textContent = 'Delete';

    taskDelete.append(delIcon, delText);

    statusArea.append(taskStatus, taskEdit, taskDelete);
    li.append(taskName, statusArea);
    return li
}

function delHandler(e) {
    const curTask = e.currentTarget.parentElement.parentElement;
    const curList = curTask.parentElement;
    const listId = curList.previousElementSibling.id;
    // console.log(listId)
    // console.log(curTask, curTask.id)
    const taskList = JSON.parse(localStorage.getItem(listId)) || [];
    const newTaskList = taskList.filter(t => t.id !== curTask.id);
    // console.log(taskList.length, newTaskList.length)
    localStorage.setItem(listId, JSON.stringify(newTaskList));
    curList.removeChild(curTask);
}
