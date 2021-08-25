import './style.css';

import {
  addToLocalStorage, tasks, editTasks, addToTasks, deleteTask,
} from './crud.js';

const form = document.querySelector('#task-form');

form.addEventListener('submit', addToTasks);




