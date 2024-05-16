const addFroms = document.querySelectorAll('.add-form');

// Fill tasks from localStorage on first loading
const taskIds = [...addFroms].map(addFrom => addFrom.id)
taskIds.forEach(id => {
    const taskList = JSON.parse(localStorage.getItem(id)) || [];
    fillTaskList(document.getElementById(id), taskList);
})

// Add event listener for forms submit
addFroms.forEach(addForm => {
    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskObj = createTaskObj(addForm)
        updateStorage(e.target.id, taskObj);
        const curList = addForm.nextElementSibling;
        curList.prepend(createTaskItem(taskObj));
        addForm.reset();
    })
})

function fillTaskList(addForm, taskList) {
    const curList = addForm.nextElementSibling;
    curList.innerHTML = '';
    // console.log(taskList.toReversed().map(t => createTaskItem(t)))
    const taskItems = taskList.toReversed().map(t => createTaskItem(t))
    curList.append(...taskItems);
}

function updateStorage(itemName, taskObj) {
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
    task.complete && li.classList.add('mb-task--checked');
    li.id = task.id;
    // Task name
    const taskName = document.createElement('p');
    taskName.classList.add('mb-task-name', 'mb-checked');
    taskName.textContent = task.task;
    
    const cancelBtn = document.createElement('button')
    cancelBtn.classList.add('mb-task-name__c-btn');
    cancelBtn.textContent = "✕";
    cancelBtn.addEventListener('click', stopEditHandler);
    cancelBtn.setAttribute('contenteditable', 'false');
    taskName.append(cancelBtn);

    // Status area
    const statusArea = document.createElement('div');
    statusArea.classList.add('mb-task-status-area');

    // Status
    const taskStatus = document.createElement('div');
    taskStatus.classList.add('mb-task-status');
    taskStatus.addEventListener('click', statusHandler)

    const statusChk = document.createElement('p')
    statusChk.classList.add('status-check');
    statusChk.textContent = ' Complete';
    const statusIconChk = document.createElement('i');
    statusIconChk.classList.add('fa-regular', 'fa-square-check', 'status-check');
    statusChk.prepend(statusIconChk)
    
    const statusUnchk = document.createElement('p')
    statusUnchk.classList.add('status-uncheck');
    statusUnchk.textContent = ' Incomplete';
    const statusIconUnchk = document.createElement('i');
    statusIconUnchk.classList.add('fa-regular', 'fa-square');
    statusUnchk.prepend(statusIconUnchk)

    taskStatus.append(statusChk, statusUnchk);

    // Edit 
    const taskEdit = document.createElement('div');
    taskEdit.classList.add('mb-task-edit');
    taskEdit.addEventListener('click', editHandler);
    
    const editIcon = document.createElement('i');
    editIcon.classList.add('fa-regular', 'fa-pen-to-square');

    const editText = document.createElement('p')
    editText.textContent = 'Edit';

    taskEdit.append(editIcon, editText);
    // Save 
    const taskSave = document.createElement('div');
    taskSave.classList.add('mb-task-edit', 'mb-task-edit--save');
    taskSave.addEventListener('click', saveHandler);
    
    const saveIcon = document.createElement('i');
    saveIcon.classList.add('fa-regular', 'fa-save');

    const saveText = document.createElement('p')
    saveText.textContent = 'Save';

    taskSave.append(saveIcon, saveText);
    // Delete
    const taskDelete = document.createElement('div');
    taskDelete.classList.add('mb-task-delete');
    taskDelete.addEventListener('click', delHandler)

    const delIcon = document.createElement('i');
    delIcon.classList.add('fa-regular', 'fa-trash-can');

    const delText = document.createElement('p');
    delText.textContent = 'Delete';

    taskDelete.append(delIcon, delText);

    statusArea.append(taskStatus, taskEdit, taskSave, taskDelete);
    li.append(taskName, statusArea);
    return li
}

function delHandler(e) {
    const curTask = e.currentTarget.parentElement.parentElement;
    const curList = curTask.parentElement;
    const listId = curList.previousElementSibling.id;
    const taskList = JSON.parse(localStorage.getItem(listId));
    const newTaskList = taskList.filter(t => t.id !== curTask.id);
    localStorage.setItem(listId, JSON.stringify(newTaskList));
    curList.removeChild(curTask);
}

function statusHandler(e) {
    const curTask = e.currentTarget.parentElement.parentElement;
    const curList = curTask.parentElement;
    const listId = curList.previousElementSibling.id;
    const taskList = JSON.parse(localStorage.getItem(listId));
    const newTaskList = taskList.map(t => {
        if (t.id === curTask.id) {
            t.complete = !t.complete;
        }
        return t;
    })
    localStorage.setItem(listId, JSON.stringify(newTaskList));
    curTask.classList.toggle('mb-task--checked');
}

function editHandler(e) {
    const curTask = e.currentTarget.parentElement.parentElement;
    const curList = curTask.parentElement;
    if (curList.querySelectorAll("p[contenteditable='plaintext-only']").length === 0) {
        const listId = curList.previousElementSibling.id;
        curTask.firstElementChild.setAttribute('contenteditable', 'plaintext-only');
        curTask.firstElementChild.focus();
    }            
}

function saveHandler(e) {
    const curTask = e.currentTarget.parentElement.parentElement;
    const curList = curTask.parentElement;
    const listId = curList.previousElementSibling.id;
    const taskList = JSON.parse(localStorage.getItem(listId));
    const newTaskList = taskList.map(t => {
        if (t.id === curTask.id) {
            if (!curTask.firstElementChild.textContent.slice(0, -1)) {
                curTask.firstElementChild.prepend(document.createTextNode(" "));
            }
            t.task = curTask.firstElementChild.textContent.slice(0, -1) || " ";
        }
        return t;
    })
    localStorage.setItem(listId, JSON.stringify(newTaskList));
    curTask.querySelector('p[contenteditable]').removeAttribute('contenteditable');
}

function stopEditHandler(e) {
    const curTask = e.currentTarget.parentElement.parentElement;
    curTask.querySelector('p[contenteditable]').removeAttribute('contenteditable');
}
