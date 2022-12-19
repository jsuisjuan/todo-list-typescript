/*
    TYPESCRIPT COMMENTED
*/

import {v4 as uuidV4} from 'uuid';  // importing a library

type Task = {         // creating a type
  id: string;         // it's has an id
  title: string;      // it's has a title
  completed: boolean; // it's has a checkbox that are checked or not
  createdAt: Date;    // it's has a date time
}

const list = document.querySelector<HTMLUListElement>('#list');                   // select the html list
const form = document.querySelector('#new-task-form') as HTMLFormElement || null; // select the html form
const input = document.querySelector<HTMLInputElement>('#new-task-title');        // select the html input

const tasks: Task[] = loadTasks();  // get the array of tasks
tasks.forEach(addListItem);         // load the array of tasks

form?.addEventListener('submit', e => {                   // get the input of the form
  e.preventDefault();                                     // to prevent reload after doing the event
  if (input?.value == "" || input?.value == null) return  // if the input is empty then return nothing
  
  const newTask: Task = {     // new object type task
    id: uuidV4(),             // id of the object
    title: input.value,       // title of the task/object
    completed: false,         // checkbox boolean of the object
    createdAt: new Date()     // date time of the object
  }
  tasks.push(newTask);        // after the object have been created it is push into the array of tasks
  addListItem(newTask);       // this function is call to create the new task ui
  saveTasks();                // all the action are saved into browser localStorage
  input.value = '';           // then the input area are replace with an empty string
})

function addListItem(task: Task): boolean {         // function that make all the newTask ui
  const item = document.createElement("li");        // new li is created inside the ul html
  const label = document.createElement("label");    // new label is created inside the li html
  const checkbox = document.createElement("input"); // new input type checkbox is created in the li html
  checkbox.addEventListener("change", () => {       // defining an event listener to see if the checkbox is checked
    task.completed = checkbox.checked;              // defining the checkbox to true inside the object attribute
    saveTasks();                                    // saving that change into the localStorage
  })
  checkbox.type = "checkbox";                       // defining the input type in checkbox html
  checkbox.checked = task.completed;                // set that checkbox to checked if he's already checked
  label.append(checkbox, task.title);               // append the task title with the checkbox inside the label
  item.append(label);                               // append the label inside the li
  list?.append(item);                               // append the li inside the ul
  return true;                                      // returning true if the function actually works
}

function saveTasks() {                                  // function that save the new task in the localStorage
  localStorage.setItem("TASKS", JSON.stringify(tasks)); // command that save the tasks
}

function loadTasks(): Task[] {                          // function that loads all the taks that were saved inside the localStorage
  const taskJSON = localStorage.getItem("TASKS");       // getting all the tasks saved
  if (taskJSON == null) return [];                      // if the localStorage are empty, then return nothing
  return JSON.parse(taskJSON);                          // if the localStorege have taks, then return the tasks
}