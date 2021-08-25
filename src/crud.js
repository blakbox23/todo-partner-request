import { taskNotComplete, taskCompleted } from './status.js';

const ul = document.querySelector('ul');
const taskDescription = document.querySelector('#txt-input');
const deleteAllBtn = document.querySelector('.clear-all');



const getFromLocalStorage = () => {
  const storage = JSON.parse(localStorage.getItem('lstore')) || [];
  return storage;
};

const tasks = getFromLocalStorage();

const addToLocalStorage = () => {
  const storage = JSON.stringify(tasks);
  localStorage.setItem('lstore', storage);
};


const createUi = (task) => {
  const li = document.createElement('li');
  li.setAttribute('id', task.index);
  const lDiv = document.createElement('div');
  lDiv.classList.add('ldiv');
  const lDivSpan = document.createElement('span');
  lDivSpan.classList.add('ldiv-spn');
  const rDiv = document.createElement('div');
  rDiv.classList.add('rdiv');
  const pTask = document.createElement('span');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = 'task-box';
  checkbox.value = task;
  checkbox.classList.add('chkbx');

  li.appendChild(lDiv);

  lDiv.appendChild(lDivSpan);
  lDiv.appendChild(pTask);
  lDivSpan.appendChild(checkbox);

  li.appendChild(rDiv);

  rDiv.innerHTML = '<i class="fas fa-bars"></i>';

  ul.appendChild(li);

  li.addEventListener('mouseover', () => {
    rDiv.innerHTML = '<i class="fas fa-trash-alt"></i>';
  });

  li.addEventListener('mouseout', () => {
    rDiv.innerHTML = '<i class="fas fa-bars"></i>';
  });

  pTask.addEventListener('click', () => {
    editTasks(pTask, task);
  });

  rDiv.addEventListener('click', () => {
    deleteTask(rDiv.parentElement);
  });

  if (task.completed === true) {
    pTask.innerText = task.description;
    pTask.classList.add('cancel');
    pTask.previousSibling.children[0].checked = true;
  } else {
    pTask.innerText = task.description;
  }

  checkbox.addEventListener('change', (e) => {
    if (e.target.checked) {
      taskCompleted(task);
      e.target.parentElement.nextSibling.classList.add('cancel');
      addToLocalStorage();
    } else {
      taskNotComplete(task);
      e.target.parentElement.nextSibling.classList.remove('cancel');
      addToLocalStorage();
    }
  });
};

const ui = () => {
  tasks.forEach((task) => {
    createUi(task);
  });
};

ui();

const addToTasks = (e) => {
  e.preventDefault();
  const item = {
    description: taskDescription.value,
    completed: false,
    index: tasks.length,
  };
  tasks.push(item);
  createUi(item);
 

  addToLocalStorage();
  taskDescription.value = '';
};

const editTasks = (editable, task) => {
  editable.contentEditable = true;

  if (editable === document.activeElement) {
    editable.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        task.description = editable.textContent;
        addToLocalStorage();
        editable.contentEditable = false;
      }
    });
  }
};

const deleteTask = (listId) => {
  const index = listId;
  tasks.splice(index, 1);
  addToLocalStorage();
  listId.remove();
};

const deleteAllCompleted = () => {
  const uncompleted = [];
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].completed === false) {
      uncompleted.push(tasks[i]);
    }
  }
  localStorage.setItem('lstore', JSON.stringify(uncompleted));
  window.location.reload();
};

deleteAllBtn.addEventListener('click', () => {
  deleteAllCompleted();
});

export {
  addToLocalStorage, getFromLocalStorage, addToTasks, editTasks, deleteTask, tasks,
};