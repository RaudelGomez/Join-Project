
/**
 * This function bring all Data from datBase: contacts & tasks
 */
async function loadDataBoard() {
  await loadData("contacts");
  await loadData("tasks");
  await renderHTMLBoard();
  // console.log(tasks);
}

// Open Popup
async function openDialog(template, taskId) {
  document.getElementById("innerDialog").classList.remove("d-none");
  document.getElementById("innerDialog").classList.remove("animate__slideOutRight");
  document.getElementById("innerDialog").classList.add("animate__slideInRight");
  document.getElementById("dialog").classList.add("animate__fadeIn");
  document.getElementById("dialog").classList.remove("animate__fadeOut");
  document.getElementById("dialog").classList.remove("d-none");
  document.body.classList.add("noscroll");
  if (template == "add_task_template.html") {
    document.getElementById("add_task_form").setAttribute("onsubmit", "addTask(); return false;");
    document.getElementById("addTaskPopup").classList.remove("d-none");
    document.getElementById("showTaskPopup").classList.add("d-none");
    document.getElementById("footer-button-addtask").classList.remove("position-fixed");
    document.getElementById('innerDialog').classList.remove('taskPopup');
    document.getElementById('innerDialog').classList.add('addTaskPopup');
  } else {
    document.getElementById('innerDialog').classList.add('taskPopup');
    document.getElementById('innerDialog').classList.remove('addTaskPopup');
    dataCurrentTask(taskId);
    document.getElementById("showTaskPopup").classList.remove("d-none");
    document.getElementById("addTaskPopup").classList.add("d-none");
    renderDataHTMLtaskPopupTemplate();
  }
}

/**
 * This function save in the variable currentTask, the data of the task that is showd in pop
 * @param {string} taskId
 */
function dataCurrentTask(taskId) {
  let allIdTasks = Object.keys(tasks);
  let allTasks = Object.values(tasks);
  let idFound = allIdTasks.findIndex((task) => task == taskId);
  currentTaskId = taskId;
  currentTask = allTasks[idFound];
}

/**
 * Render the task pop html
 */
function renderDataHTMLtaskPopupTemplate() {
  let categoryTask = document.getElementById("category-task-show-task");
  categoryTask.textContent = `${currentTask.categoryTask}`;
  categoryTask.classList.remove("userStory", "technicalTask");
  categoryTask.classList.add(categoryColor(currentTask.categoryTask));
  document.getElementById("title-task-show-task").textContent = `${currentTask.titleTask}`;
  document.getElementById("description-task-show-task").textContent = `${currentTask.descriptionTask}`;
  document.getElementById("date-task-show-task").textContent = `${currentTask.timeDeadlineTask}`;
  document
    .getElementById("prio-task-show-task")
    .setAttribute("src", `./assets/img/${showingPriorityBoard(currentTask.priorityTask)}`);
  document.getElementById("name-prio").textContent = currentTask.priorityTask;
  renderUserPopupTask();
  renderSubtaskHTMLPopupTask();
}

/**
 * This function render the user in the pop up task
 */
function renderUserPopupTask() {
  let containerUser = document.getElementById("user-task-show-task");
  let headlineUser = document.getElementById("headline-user-assigned");
  containerUser.innerHTML = "";
  let users = currentTask.nameAssignedTask;
  if (users) {
    headlineUser.textContent = "Assigned To:";
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      containerUser.innerHTML += /*html*/ `
        <div class="userBoardPopup">
          <span class="profileSmall" style="background-color: ${colors[user.colorIndex].color}">${getInitials(
        user.name
      )}</span>
          <span>${user.name}</span>
        </div> 
      `;
    }
  } else {
    headlineUser.textContent = "";
  }
}

/**
 * Render the subTask in the pop up
 */
function renderSubtaskHTMLPopupTask() {
  let containerSubtask = document.getElementById("subtasks-task-show-task");
  let headlineSubtask = document.getElementById("headline-subtasks-popup");
  containerSubtask.innerHTML = "";
  let subTasks = currentTask.subTasks;
  if (subTasks) {
    headlineSubtask.textContent = "Subtasks";
    for (let i = 0; i < subTasks.length; i++) {
      const subTask = subTasks[i];
      containerSubtask.innerHTML += /*html*/ `
        <input type="checkbox" onclick="updateSubTask('${currentTaskId}',${i})" name="checkbox-subTask" id="subTask${i}" />
        <label for="subTask${i}">${subTask.subTaskName}</label>
      `;
      let inputSubTask = document.getElementById(`subTask${i}`);
      if (subTask.statusSubTask) {
        inputSubTask.setAttribute("checked", true);
      }
    }
  } else {
    headlineSubtask.textContent = "";
  }
}

/**
 * This timeout was used to avoid the delay when the page is load and the function loadDataBoard
 */
setTimeout(loadDataBoard, 500);


function filterTasks() {
let filterString = document.getElementById('searchTask').value;
filterString = filterString.toLowerCase();
// console.log(filterString);
  renderHTMLBoard(filterString) ;
}

/**
 * This function render the cards of tasks in Board
 */
async function renderHTMLBoard(filterTask) {
  let listTasks = Object.values(tasks);
  let listTaskId = Object.keys(tasks);
  // fiter Function here
  if(filterTask){
    listTasks = listTasks.filter(task => task.titleTask.toLowerCase().includes(filterTask) ||task.descriptionTask.toLowerCase().includes(filterTask) );
  }else{
    showAlert("container-signUp-alert", "signUp-alert", "Warning", "error-alert", "No results");
  }

  for (let k = 0; k < listTasks.length; k++) {
    const task = listTasks[k];
    task.id = listTaskId[k];
  }
  
  let containerToDo = document.getElementById("toDoBoard");
  containerToDo.innerHTML = "";
  let toDo = listTasks.filter((task) => task.status == 1);
  for (let i = 0; i < toDo.length; i++) {
    const task = toDo[i];
    let statusSubTask = showStatusSubTask(task);
    containerToDo.innerHTML += /*html*/ `${renderHTMLTasksBoard(
      task,
      i,
      "container-board-subTask-toDo",
      "usertoDoTask-board",
      statusSubTask.countSubTasksDone,
      statusSubTask.porcentTaskDone
    )}`;
    renderHTMLUserinTask(task, i, "usertoDoTask-board");
  }
  if (toDo.length == 0) {
    containerToDo.innerHTML += /*html*/ `
    <article id="container-todo" class="emptyTaskCard">No tasks To do</article>
    `;
  }

  let containerProgress = document.getElementById("inProgress");
  containerProgress.innerHTML = "";
  let progress = listTasks.filter((task) => task.status == 2);
  for (let i = 0; i < progress.length; i++) {
    const task = progress[i];
    let statusSubTask = showStatusSubTask(task);
    containerProgress.innerHTML += /*html*/ `${renderHTMLTasksBoard(
      task,
      i,
      "container-board-subTask-progress",
      "userProgressTask-board",
      statusSubTask.countSubTasksDone,
      statusSubTask.porcentTaskDone
    )}`;
    renderHTMLUserinTask(task, i, "userProgressTask-board");
  }
  if (progress.length == 0) {
    containerProgress.innerHTML += /*html*/ `
    <article id="container-todo" class="emptyTaskCard">No tasks in Progress</article>
    `;
  }

  let containerAwaitFeedBack = document.getElementById("awaitFeedback");
  containerAwaitFeedBack.innerHTML = "";
  let awaitFeeback = listTasks.filter((task) => task.status == 3);
  for (let i = 0; i < awaitFeeback.length; i++) {
    const task = awaitFeeback[i];
    let statusSubTask = showStatusSubTask(task);
    containerAwaitFeedBack.innerHTML += /*html*/ `${renderHTMLTasksBoard(
      task,
      i,
      "container-board-subTask-awaitFeeback",
      "userAwaitFeedbackTask-board",
      statusSubTask.countSubTasksDone,
      statusSubTask.porcentTaskDone
    )}`;
    renderHTMLUserinTask(task, i, "userAwaitFeedbackTask-board");
  }
  if (awaitFeeback.length == 0) {
    containerAwaitFeedBack.innerHTML += /*html*/ `
    <article id="container-todo" class="emptyTaskCard">No tasks await Feedback</article>
    `;
  }

  let containerDone = document.getElementById("done");
  containerDone.innerHTML = "";
  let done = listTasks.filter((task) => task.status == 4);
  for (let i = 0; i < done.length; i++) {
    const task = done[i];
    let statusSubTask = showStatusSubTask(task);
    containerDone.innerHTML += /*html*/ `${renderHTMLTasksBoard(
      task,
      i,
      "container-board-subTask-done",
      "userDoneTask-board",
      statusSubTask.countSubTasksDone,
      statusSubTask.porcentTaskDone
    )}`;
    renderHTMLUserinTask(task, i, "userDoneTask-board");
  }
  if (done.length == 0) {
    containerDone.innerHTML += /*html*/ `
    <article id="container-todo" class="emptyTaskCard">No tasks Done</article>
    `;
  }
}

/**
 * This function return how many subTask has the Task and what ist the % of subTask completed
 * @param {object} task - That is that object subtask
 * @returns return how many subTask has the Task and what ist the % of subTask completed
 */
function showStatusSubTask(task) {
  let countSubTasksDone = 0;
  let porcentTaskDone = 0;
  if (task.subTasks) {
    let allSubTasks = task.subTasks;
    let subTasksDone = allSubTasks.filter((task) => task.statusSubTask == true);
    countSubTasksDone = subTasksDone.length;
    porcentTaskDone = (countSubTasksDone / allSubTasks.length) * 100;
  }
  return { countSubTasksDone, porcentTaskDone };
}

/**
 * This function render the HTML of tasks
 * @param {object} task - That is the complete task object
 * @param {number} i - The index of the task in tasks array
 * @returns
 */
function renderHTMLTasksBoard(task, i, idContainerSubTask, idContainerUserTask, countSubTasksDone, porcentTaskDone) {
  let subTasks = task["subTasks"];

  let taskDesription = task.descriptionTask;
  if (taskDesription.length > 70) {
    taskDesription = taskDesription.substring(0,70) + "...";
}

  return /*html*/ `
      <article
        onclick="openDialog('task_popup_template.html', '${task.id}')"
        class="taskCard"
        draggable="true"
        ondragstart="startDragging('${task.id}',this)">
        <span class="category ${categoryColor(task.categoryTask)}">${task.categoryTask}</span>
        <h3 class="taskTitle">${task.titleTask}</h3>
        <p class="taskDesription">${taskDesription}</p>
        <div id="${idContainerSubTask}${i}" class="subtasks">
          ${
            task["subTasks"]
              ? `<div class="progressContainer">
              <div class="progress" style="width: ${porcentTaskDone}%"></div>
            </div>`
              : ""
          }
          <div>
            <span>${subTasks ? countSubTasksDone + "/" + subTasks.length + " Subtasks" : ""}</span>
          </div>
        </div>
        <footer>
          <div id="${idContainerUserTask}${i}" class="user"></div>
          <div class="priority">
            <img src="./assets/img/${showingPriorityBoard(task.priorityTask)}" alt="" />
          </div>
        </footer>
      </article>
    `;
}

/**
 * This function assign a color to the headline in the card category board
 * @param {string} category
 * @returns The color of the category to show in card Board
 */
function categoryColor(category) {
  if (category == "User story") {
    return "userStory";
  } else {
    return "technicalTask";
  }
}

/**
 * This function select the icon of priority.
 * @param {string} taskPriority
 * @returns The name of the icon that should be render in the tag <img>
 */
function showingPriorityBoard(taskPriority) {
  if (taskPriority == "urgent") {
    return "urgent_high_priority_icon.svg";
  } else if (taskPriority == "medium") {
    return "priority_symbols_icon.svg";
  } else if (taskPriority == "low") {
    return "urgent_low_priority_icon.svg";
  }
}

// /**
//  * This function render the HTML of subtask
//  * @param {object} task - That is the complete task.
//  * @param {number} i - The index of the task in tasks array
//  * @param {idContainer} idContainerSubTask - idContainer where the progress will be render
//  */
// function renderHTMLSubTask(task, i, idContainerSubTask) {
//   console.log(task);
//   let containerSubtask = document.getElementById(`${idContainerSubTask}${i}`);
//   containerSubtask.innerHTML = '';
//   if(task.subTasks){
//     containerSubtask.innerHTML += /*html*/`
//      <div class="progressContainer">
//        <div class="progress" style="width: 50%"></div>
//      </div>
//      <div><span>1</span>/<span>${task['subTasks'].length}</span><span>Subtasks</span></div>
//    `
//   }
// }

/**
 * This function render the HTML of name of pople assigned in a Task
 * @param {object} task - That is the complete task.
 * @param {number} i - The index of the task in tasks array
 * @param {idContainer} idContainerSubTask - idContainer where the user will be render
 */
function renderHTMLUserinTask(task, i, idContainerUserTask) {
  let userTaskBoard = document.getElementById(`${idContainerUserTask}${i}`);
  userTaskBoard.innerHTML = "";
  if (task["nameAssignedTask"]) {
    for (let j = 0; j < task["nameAssignedTask"].length; j++) {
      const userTask = task["nameAssignedTask"][j];
      const userColorIndex = +userTask.colorIndex;
      const userColor = colors[userColorIndex].color;
      const initialName = getInitials(userTask.name);
      userTaskBoard.innerHTML += /*html*/ `
          <span class="profileSmall" style="background-color: ${userColor}">${initialName}</span>
        `;
    }
  }
}

/**
 * This function change the type of task. Type of task are: {1:to do}, {2:in progress}, etc..
 * @param {number} typeTask
 */
function changeTypeOfTask(typeTask) {
  typeOfTask = typeTask;
}

async function deleteTask(firebaseKey) {
  await deleteData("/tasks/" + firebaseKey);
  loadDataBoard();
  closeDialog();
}

async function updateSubTask(firebaseKey, subtaskId) {
  let isChecked = document.getElementById(`subTask${subtaskId}`).checked;
  let idString = `/tasks/${firebaseKey}/subTasks/${subtaskId}/statusSubTask`;
  await putData(isChecked, idString);
  loadDataBoard();
}

function editTask(firebaseKey) {
  // console.log(firebaseKey);

  openDialog("add_task_template.html");
  let firstChild = document.getElementById("addTaskPopup").firstElementChild;
  firstChild.innerHTML = "";
  document.getElementById("add_task_form").setAttribute("onsubmit", "saveEditedTask(); return false;");
  document.getElementById("title_task").value = currentTask.titleTask;
  document.getElementById("description_task").value = currentTask.descriptionTask;
  document.getElementById("due_date_task").value = currentTask.timeDeadlineTask;
  // showCheckboxes();
  let arrayContact = [];
  if (currentTask.nameAssignedTask) {
    for (let i = 0; i < currentTask.nameAssignedTask.length; i++) {
      const assignedContact = currentTask.nameAssignedTask[i];
      arrayContact.push(assignedContact);
      // console.log(assignedContact.email);
      let allContacts = document.getElementById("assigned-task");
      let allLabel = allContacts.querySelectorAll("label");
      for (const label of allLabel) {
        // console.log(label);
        let i = label.dataset.id;
        // console.log(i);
        if (label.dataset.email == assignedContact.email) {
          let checkbox = document.getElementById(`checkBoxAssigned${i}`);
          checkbox.checked = true;
        }
      }
    }
    //First Open checkBox, Second Show Names, Third Close Checkboxes
    showCheckboxes();
    showInitialAssign();
    showCheckboxes();
  }

  changePriorityEditTask(`${currentTask.priorityTask}`);

  //Category Task edit
  document.getElementById("option-selected").innerHTML = currentTask.categoryTask;
  document.getElementById("option-selected").dataset.filled = currentTask.categoryTask.trim();
  document.getElementById("container-select-option").classList.add("pointer-none");

  //Change footer edit Task
  document.getElementById("btn-clear-add-Task").classList.add("d-none");
  let footerButtonAddTask = document.getElementById("footer-button-addtask");
  footerButtonAddTask.firstElementChild.classList.add("d-none");
  footerButtonAddTask.classList.add("justify-end");
  let btnCreatetask = document.getElementById("btn-create-task");
  btnCreatetask.firstElementChild.textContent = "OK";
  btnCreatetask.classList.add("btn-edit-task");

  //loading subtasks in the Form edit Task
  subTasks = currentTask.subTasks;
  if (subTasks) {
    showSubTask();
  } else {
    subTasks = [];
  }
}

function changePriorityEditTask(idPriorityButton) {
  document.getElementById("button-urgent-priority").classList.remove("active");
  document.getElementById("button-medium-priority").classList.remove("active");
  document.getElementById("button-low-priority").classList.remove("active");
  document.getElementById(`button-${idPriorityButton}-priority`).classList.add("active");
  priorityTask = document.getElementById(`button-${idPriorityButton}-priority`).dataset.prio;
}

function searchTasks(){
  let filterTask  = document.getElementById("searchTask").value;
  filterTask = filterTask.toLowerCase();
  renderHTMLBoard(filterTask);
  }

