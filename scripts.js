const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector('.new-task-button');

const TasksContainer = document.querySelector('.tasks-container');

const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
    const InputIsValid = validateInput();

    console.log(InputIsValid);

    if (!InputIsValid) {
        return inputElement.classList.add('error');
    }
    
    const taskItemContainer = document.createElement('div');
    taskItemContainer.classList.add('task-item');

    const taskContent = document.createElement('p');
    taskContent.innerText = inputElement.value;

    taskContent.addEventListener('click', () => handleclick(taskContent));

    const deleteItem = document.createElement('i');
    deleteItem.classList.add('fa-solid');
    deleteItem.classList.add('fa-trash-can');

    deleteItem.addEventListener('click', () => 
    handledeleteclick(taskItemContainer, taskContent)
    );

    taskItemContainer.appendChild(taskContent)
    taskItemContainer.appendChild(deleteItem)

    TasksContainer.appendChild(taskItemContainer)

    inputElement.value = '';

    updatedLocalStorage();
};

const handleclick = (taskContent) => {
    const tasks = TasksContainer.childNodes;

    for (const task of tasks){
        const currentTaskisbeingClicked = task.firstChild.isSameNode(taskContent)

        if (currentTaskisbeingClicked) {
            task.firstChild.classList.toggle('completed')
        }
    }

    updatedLocalStorage();
};

const handledeleteclick = (taskItemContainer, taskContent) => {
    const tasks = TasksContainer.childNodes;

    for (const task of tasks) {
        const currentTaskisbeingClicked = task.firstChild.isSameNode(taskContent)

        if (currentTaskisbeingClicked) {
           taskItemContainer.remove();
        }
    }

    updatedLocalStorage();
};

const handleinputchange = () => {
    const InputIsValid = validateInput()

    if(InputIsValid) {
        return inputElement.classList.remove('error');
    }
};

const updatedLocalStorage = () => {
    const tasks = TasksContainer.childNodes;

    const LocalStorageTasks = [... tasks].map(task => {
        const content = task.firstChild;
        const isCompleted = content.classList.contains('completed');

        return {descripition: content.innerText, isCompleted };
    });

    localStorage.setItem('tasks', JSON.stringify(LocalStorageTasks));
};

const refreshTasksUsingLocalStorage = () => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));

    for (const task of tasksFromLocalStorage) {
        const taskItemContainer = document.createElement('div');
    taskItemContainer.classList.add('task-item');

    const taskContent = document.createElement('p');
    taskContent.innerText = task.descripition;

    if (task.isCompleted) {
        taskContent.classList.add('completed');
    }

    taskContent.addEventListener('click', () => handleclick(taskContent));

    const deleteItem = document.createElement('i');
    deleteItem.classList.add('fa-solid');
    deleteItem.classList.add('fa-trash-can');

    deleteItem.addEventListener('click', () => 
    handledeleteclick(taskItemContainer, taskContent)
    );

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);

    TasksContainer.appendChild(taskItemContainer);
    }
};

refreshTasksUsingLocalStorage();

addTaskButton.addEventListener('click', () => handleAddTask());

inputElement.addEventListener('change', () => handleinputchange())

