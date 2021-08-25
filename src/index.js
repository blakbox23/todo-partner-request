import './style.css';

import { addToTasks } from './crud.js';

const form = document.querySelector('#task-form');

form.addEventListener('submit', addToTasks);
