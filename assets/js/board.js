/**
 * This function bring all Data from datBase: contacts & tasks
 */
async function loadDataBoard() {
  await loadData("contacts");
  await loadData("tasks");
  await renderHTMLBoard();
}

/**
 * This function open Popup add Task or task/ depends
 * @param {string} template - name of template that will be opened
 * @param {string} taskId - Id of the task
 */
async function openDialog(template, taskId) {
  document.getElementById("innerDialog").classList.remove("d-none");
  document.getElementById("innerDialog").classList.remove("animate__slideOutRight");
  document.getElementById("innerDialog").classList.add("animate__slideInRight");
  document.getElementById("dialog").classList.add("animate__fadeIn");
  document.getElementById("dialog").classList.remove("animate__fadeOut");
  document.getElementById("dialog").classList.remove("d-none");
  document.body.classList.add("noscroll");
  if (template == "add_task_template.html") {
    ifAddTaskTemplate();
  } else {
    ifTaskPopTemplate(taskId);
  }
}

/**
 * This function will be execute if the addTask pop is loading
 */
function ifAddTaskTemplate() {
  document.getElementById("add_task_form").setAttribute("onsubmit", "addTask(); return false;");
  document.getElementById("addTaskPopup").classList.remove("d-none");
  document.getElementById("showTaskPopup").classList.add("d-none");
  document.getElementById("footer-button-addtask").classList.add("position-relative");
  document.getElementById("innerDialog").classList.remove("taskPopup");
  document.getElementById("innerDialog").classList.add("addTaskPopup");
  document.getElementById("addTaskPopup").classList.add("mobile-version-only");
  document.getElementById("addTaskPopup").classList.add("desktop-version-only");
}

/**
 * This function will be execute if taskPop will loaded
 * @param {string} taskId - That is the id of the Task from firebase
 */
function ifTaskPopTemplate(taskId) {
  document.getElementById("innerDialog").classList.add("taskPopup");
  document.getElementById("innerDialog").classList.remove("addTaskPopup");
  dataCurrentTask(taskId);
  document.getElementById("showTaskPopup").classList.remove("d-none");
  document.getElementById("addTaskPopup").classList.add("d-none");
  document.getElementById("title-task-show-task").classList.add("h2-size-edit");
  document.getElementById("innerDialog").classList.add("editing");
  renderDataHTMLtaskPopupTemplate();
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
      if (user != null) {
        containerUser.innerHTML += /*html*/ `${userHTMLBoard(user)}`;
      }
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

/**
 * This function filter task
 */
function filterTasks() {
  let filterString = document.getElementById("searchTask").value;
  filterString = filterString.toLowerCase();
  renderHTMLBoard(filterString);
}

/**
 * This function render the cards of tasks in Board
 */
async function renderHTMLBoard(filterTask) {
  let listTasks = Object.values(tasks);
  let listTaskId = Object.keys(tasks);
  if (filterTask) {
    let filteredTasks;
    filteredTasks = listTasks.filter(
      (task) =>
        task.titleTask.toLowerCase().includes(filterTask) || task.descriptionTask.toLowerCase().includes(filterTask)
    );
    listTasks = filteredTasks;
    alertNoTaskFound(filteredTasks);
  }
  for (let k = 0; k < listTasks.length; k++) {
    const task = listTasks[k];
    task.id = listTaskId[k];
  }
  renderToDoTask(listTasks);
  renderInProgressTask(listTasks);
  renderAwaitFeedBackTask(listTasks);
  renderDoneTask(listTasks);
}

/**
 * This function send a notifications if any task was found
 * @param {array} filteredTasks - array of task found
 */
function alertNoTaskFound(filteredTasks) {
  if (filteredTasks.length == 0) {
    document.getElementById('container-boardNoResult-alert').textContent = " No results";
  }else{
    document.getElementById('container-boardNoResult-alert').textContent = "";
  }
}

/**
 * This function render all to-do tasks
 * @param {Array} listTasks - Array of Tasks
 */
function renderToDoTask(listTasks) {
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
}

/**
 * This function render all in progress tasks
 * @param {object} listTasks array of tasks
 */
function renderInProgressTask(listTasks) {
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
}

/**
 * This function render all await feedback tasks
 * @param {object} listTasks - array of tasks
 */
function renderAwaitFeedBackTask(listTasks) {
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
}

/**
 * This function render all to-do tasks
 * @param {Array} listTasks - array of tasks
 */
function renderDoneTask(listTasks) {
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
    taskDesription = taskDesription.substring(0, 70) + "...";
  }
  return /*html*/ `${templateTaskBoard(
    task,
    i,
    idContainerSubTask,
    idContainerUserTask,
    countSubTasksDone,
    porcentTaskDone,
    subTasks,
    taskDesription
  )}`;
}

/**
 * That function hidde the colummn where the task is
 * @param {string} idMenu - That is the id of the menu mobile drag drop
 * @param {number} status - that is type of Task where that Task is
 */
function showingColumnButOwn(idMenu, status) {
  let menu = document.getElementById(`${idMenu}`);
  let links = menu.querySelectorAll("p");
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    if (i + 1 == status) {
      link.classList.add("d-none");
    }
  }
}

/**
 * This function move a task to another column of type of task
 * @param {number} status - id of the colummn to move
 * @param {number} taskId - Id task to move
 */
async function moveToColumn(status, taskId) {
  let firebaseURL = `/tasks/${taskId}/status`;
  await putData(status, firebaseURL);
  await loadDataBoard();
  resizeMenuDragMobile();
}

/**
 * This function open and close the menu drag & drop
 * @param {number} idMenu - That ist the id of the menu drag
 */
function showDragMenuMobile(idMenu, status) {
  showingColumnButOwn(idMenu, status);
  document.getElementById(`${idMenu}`).classList.toggle("d-none");
  document.getElementById(`${idMenu}`).classList.toggle("menu-drag-open");
}

/**
 * This function close the menu drag & drop when the page is resized
 */
function resizeMenuDragMobile() {
  let MenuOpenDrag = document.querySelectorAll("div");
  for (let i = 0; i < MenuOpenDrag.length; i++) {
    const menu = MenuOpenDrag[i];
    if (menu.classList.contains("menu-drag-open")) {
      menu.classList.remove("menu-drag-open");
      menu.classList.add("d-none");
    }
  }
}

