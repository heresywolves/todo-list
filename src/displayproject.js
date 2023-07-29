import { Project } from "./project";
import { ProjectCollection } from "./projectcollection";
import PlusIcon from "../src/img/plus-gray.png";
import ViewIcon from "../src/img/view.png";
import CircleIcon from "../src/img/check-circle.png";
import { activateNewTaskButton } from "./newtaskbutton";
import { activateTaskButtons } from "./taskbuttons";

export let displayContent = function () {

  let project = function (projectId) {
    if (document.querySelector('.display-project-container')) {
      clear();
    }
    
    const workspace = document.querySelector('div.workspace');
    const displayContainer = document.createElement('div');
    displayContainer.classList.add('display-project-container');
    displayContainer.classList.add(`${projectId}`);

    const projects = ProjectCollection.projects;
    const project = projects[projectId];
    const projectName = project.name;

    const header = document.createElement('h1');
    header.classList.add('project-name');
    header.textContent = projectName;

    displayContainer.appendChild(header);

    const tasksContainer = document.createElement('div');
    tasksContainer.classList.add('tasks-container');

    let tasks = project.tasks;

    if (tasks) {
      for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        const button = document.createElement('button');
        button.classList.add('task');
        button.classList.add(`${task.id}`);
        if (task.status === 'done') {
          button.classList.add('done');
        }
        const title = document.createElement('p');
        title.classList.add('task-title')
        title.textContent = task.title;
        const priority = document.createElement('p');
        priority.classList.add('task-priority');
        priority.classList.add(`${task.priority}`);
        priority.textContent = task.priority;
        const date = document.createElement('p');
        date.classList.add('task-date');
        date.textContent = task.dueDate;
        const view = document.createElement('button');
        view.classList.add('view-button');
        const viewImg = document.createElement('img');
        viewImg.src = ViewIcon;
        view.append(viewImg);
        const circleIcon = document.createElement('img');
        circleIcon.classList.add('circle-icon');
        circleIcon.src = CircleIcon;
        button.appendChild(circleIcon);
        button.appendChild(title);
        button.appendChild(priority);
        button.appendChild(date);
        button.appendChild(view);
        
        tasksContainer.appendChild(button);
      }
    }

    const addTaskButton = document.createElement('button') ;
    addTaskButton.classList.add('add-task-button');
    const addTaskIcon = document.createElement('img');
    addTaskIcon.src = PlusIcon;
    const buttonText = document.createElement('p');
    buttonText.textContent = "New task";

    addTaskButton.appendChild(addTaskIcon);
    addTaskButton.appendChild(buttonText);
    tasksContainer.appendChild(addTaskButton);

    activateNewTaskButton(addTaskButton);
    
    
    displayContainer.appendChild(tasksContainer);
    workspace.appendChild(displayContainer);

    activateTaskButtons();
  }

  let clear = function() {
    const content = document.querySelector('.display-project-container');
    content.remove();
  } 

  return { project, clear }
}();