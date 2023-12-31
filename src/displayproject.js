import { ProjectCollection } from "./projectcollection";
import PlusIcon from "../src/img/plus-gray.png";
import ViewIcon from "../src/img/view.png";
import CircleIcon from "../src/img/check-circle.png";
import { activateNewTaskButton } from "./newtaskbutton";
import { activateTaskButtons } from "./taskbuttons";
import { format } from "date-fns";

export let displayContent = function () {

  let project = function (projectId) {
    clear();

    const projects = ProjectCollection.projects;
    let project;
    for (let i = 0; i < projects.length; i++) {
      if (projectId == projects[i].id) {
        project = projects[i];
      }
    }
    const projectName = project.name;

    const workspace = document.querySelector('div.workspace');
    workspace.className = "";
    workspace.classList.add('workspace');
    const displayContainer = document.createElement('div');
    displayContainer.classList.add('display-project-container');
    displayContainer.classList.add(`${projectId}`);


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
        // const divider = document.createElement('div');
        // divider.classList.add('divider');
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
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-task');
        deleteButton.textContent = "✕";

        button.appendChild(circleIcon);
        button.appendChild(title);
        button.appendChild(priority);
        button.appendChild(date);
        button.appendChild(view);
        button.appendChild(deleteButton);
        // button.appendChild(divider);

        tasksContainer.appendChild(button);
      }
    }

    const addTaskButton = document.createElement('button');
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

  let today = function () {
    clear();

    let dateNow = format(Date.now(), 'dd MMMM yyyy');

    const projects = ProjectCollection.projects;
    const workspace = document.querySelector('div.workspace');
    workspace.classList.add('today');

    const leftSide = document.createElement('div');
    leftSide.classList.add('left-side');
    const rightSide = document.createElement('div');
    rightSide.classList.add('right-side');

    if (projects.length === 0) {
      return;
    }

    for (let i = 0; i < projects.length; i++) {


      const project = projects[i];
      const projectName = project.name;
      let tasks = project.tasks;

      let hasTodaysTask = false;
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].dueDate !== dateNow) {
          continue;
        } else {
          hasTodaysTask = true;
        };
      }
      if (!hasTodaysTask) { continue };

      const displayContainer = document.createElement('div');
      displayContainer.classList.add('display-project-container');
      displayContainer.classList.add(`${project.id}`);


      const header = document.createElement('h1');
      header.classList.add('project-name');
      header.textContent = projectName;

      displayContainer.appendChild(header);

      const tasksContainer = document.createElement('div');
      tasksContainer.classList.add('tasks-container');

      if (tasks) {
        for (let i = 0; i < tasks.length; i++) {

          let task = tasks[i];

          if (task.dueDate !== dateNow) {
            continue;
          }

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
          const deleteButton = document.createElement('button');
          deleteButton.classList.add('delete-task');
          deleteButton.textContent = "✕";

          button.appendChild(circleIcon);
          button.appendChild(title);
          button.appendChild(priority);
          button.appendChild(date);
          button.appendChild(view);
          button.appendChild(deleteButton);

          tasksContainer.appendChild(button);
        }
      }

      const addTaskButton = document.createElement('button');
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

      if (i == 0 || i % 2 === 0) {
        leftSide.appendChild(displayContainer);
      } else {
        rightSide.appendChild(displayContainer);
      }
    }


    workspace.appendChild(leftSide);
    workspace.appendChild(rightSide);
    activateTaskButtons();
  }

  let all = function () {
    clear();

    const projects = ProjectCollection.projects;
    const workspace = document.querySelector('div.workspace');
    workspace.classList.add('all');

    const leftSide = document.createElement('div');
    leftSide.classList.add('left-side');
    const rightSide = document.createElement('div');
    rightSide.classList.add('right-side');

    for (let i = 0; i < projects.length; i++) {

      const project = projects[i];
      const projectName = project.name;

      if (project.tasks.length === 0) {
        continue;
      }

      const displayContainer = document.createElement('div');
      displayContainer.classList.add('display-project-container');
      displayContainer.classList.add(`${project.id}`);


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
          const deleteButton = document.createElement('button');
          deleteButton.classList.add('delete-task');
          deleteButton.textContent = "✕";

          button.appendChild(circleIcon);
          button.appendChild(title);
          button.appendChild(priority);
          button.appendChild(date);
          button.appendChild(view);
          button.appendChild(deleteButton);

          tasksContainer.appendChild(button);
        }
      }

      const addTaskButton = document.createElement('button');
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

      if (leftSide.children.length === 0) {
        leftSide.appendChild(displayContainer);
      } else if (leftSide.children.length > rightSide.children.length) {
        rightSide.appendChild(displayContainer);
      } else {
        leftSide.appendChild(displayContainer);
      }


    }


    workspace.appendChild(leftSide);
    workspace.appendChild(rightSide);
    activateTaskButtons();
  }

  let important = function () {
    clear();

    const projects = ProjectCollection.projects;
    const workspace = document.querySelector('div.workspace');
    workspace.classList.add('important');

    const leftSide = document.createElement('div');
    leftSide.classList.add('left-side');
    const rightSide = document.createElement('div');
    rightSide.classList.add('right-side');

    if (projects.length === 0) {
      return;
    }

    for (let i = 0; i < projects.length; i++) {

      const project = projects[i];
      const projectName = project.name;
      let tasks = project.tasks;

      let hasImportant = false;
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].priority !== 'high') {
          continue;
        } else {
          hasImportant = true;
        };
      }
      if (!hasImportant) { continue };


      const displayContainer = document.createElement('div');
      displayContainer.classList.add('display-project-container');
      displayContainer.classList.add(`${project.id}`);

      const header = document.createElement('h1');
      header.classList.add('project-name');
      header.textContent = projectName;

      displayContainer.appendChild(header);

      const tasksContainer = document.createElement('div');
      tasksContainer.classList.add('tasks-container');


      if (tasks) {
        for (let i = 0; i < tasks.length; i++) {
          let task = tasks[i];

          if (task.priority !== 'high') { continue };

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
          const deleteButton = document.createElement('button');
          deleteButton.classList.add('delete-task');
          deleteButton.textContent = "✕";

          button.appendChild(circleIcon);
          button.appendChild(title);
          button.appendChild(priority);
          button.appendChild(date);
          button.appendChild(view);
          button.appendChild(deleteButton);

          tasksContainer.appendChild(button);
        }
      }

      const addTaskButton = document.createElement('button');
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


      if (leftSide.children.length === 0) {
        leftSide.appendChild(displayContainer);
      } else if (leftSide.children.length > rightSide.children.length) {
        rightSide.appendChild(displayContainer);
      } else {
        leftSide.appendChild(displayContainer);
      }
    }


    workspace.appendChild(leftSide);
    workspace.appendChild(rightSide);
    activateTaskButtons();
  }

  let clear = function () {
    const content = document.querySelector('.display-project-container');
    const leftSide = document.querySelector('.left-side');
    const rightSide = document.querySelector('.right-side');
    const workspace = document.querySelector('.workspace');
    workspace.classList.remove('all');
    workspace.classList.remove('today');
    workspace.classList.remove('important');
    if (content) { content.remove() };
    if (leftSide) { leftSide.remove() };
    if (rightSide) { rightSide.remove() };
  }

  return { project, clear, today, all, important }
}();