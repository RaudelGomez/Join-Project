// Open Popup
async function openDialog(template, taskId) {
  currentTask = taskId;
  document.getElementById("innerDialog").classList.remove("d-none");
  document.getElementById("innerDialog").classList.remove("animate__slideOutRight");
  document.getElementById("innerDialog").classList.add("animate__slideInRight");
  document.getElementById("dialog").classList.add("animate__fadeIn");
  document.getElementById("dialog").classList.remove("animate__fadeOut");
  document.getElementById("dialog").classList.remove("d-none");
  document.body.classList.add("noscroll");
  if (template=="add_task_template.html") {
	document.getElementById("addTaskPopup").classList.remove("d-none");
	document.getElementById("showTaskPopup").classList.add("d-none");
  }
  else {
	document.getElementById("showTaskPopup").classList.remove("d-none");
	document.getElementById("addTaskPopup").classList.add("d-none");
  }    
}


// function closeDialog() {
//   document.getElementById("dialog").classList.remove("animate__fadeIn");
//   document.getElementById("dialog").classList.add("animate__fadeOut");
//   document.getElementById("innerDialog").classList.add("animate__slideOutRight");
//   document.getElementById("innerDialog").classList.remove("animate__slideInRight");
//   setTimeout(() => {
//     document.getElementById("dialog").classList.add("d-none");
//   }, 500);
//   document.body.classList.remove("noscroll");
// }
	/**
	 * This function bring all Data from datBase: contacts & tasks
	 */
	async function loadDataBoard() {
		await loadData('contacts');
		await loadData('tasks');
    await renderHTMLBoard();
    console.log(tasks);
	}

	/**
	 * This timeout was used to avoid the delay when the page is load and the function loadDataBoard
	 */
	setTimeout(loadDataBoard, 500);

  async function renderHTMLBoard() {
    let listTasks = Object.values(tasks);
    let listTaskId = Object.keys(tasks);
    for (let k = 0; k < listTasks.length; k++) {
      const task = listTasks[k];
      task.id = listTaskId[k];
    }
    
    let containerToDo = document.getElementById('toDoBoard');
    containerToDo.innerHTML = '';
    let toDo = listTasks.filter(task => task.status == 1)
    for (let i = 0; i < toDo.length; i++) {
      const task = toDo[i];
      containerToDo.innerHTML += /*html*/`${renderHTMLTasksBoard(task, i,"container-board-subTask-toDo", "usertoDoTask-board")}`
      renderHTMLSubTask(task, i, "container-board-subTask-toDo");
      renderHTMLUserinTask(task, i, "usertoDoTask-board");
    }

    let containerProgress = document.getElementById('inProgress');
    containerProgress.innerHTML = '';
    let progress = listTasks.filter(task => task.status == 2)
    for (let i = 0; i < progress.length; i++) {
      const task = progress[i];
      containerProgress.innerHTML += /*html*/`${renderHTMLTasksBoard(task, i,"container-board-subTask-progress", "userProgressTask-board")}`
      renderHTMLSubTask(task, i, "container-board-subTask-progress");
      renderHTMLUserinTask(task, i, "userProgressTask-board");
    }

    let containerAwaitFeedBack = document.getElementById('awaitFeedback');
    containerAwaitFeedBack.innerHTML = '';
    let awaitFeeback = listTasks.filter(task => task.status == 3)
    for (let i = 0; i < awaitFeeback.length; i++) {
      const task = awaitFeeback[i];
      containerAwaitFeedBack.innerHTML += /*html*/`${renderHTMLTasksBoard(task, i,"container-board-subTask-awaitFeeback", "userAwaitFeedbackTask-board")}`
      renderHTMLSubTask(task, i, "container-board-subTask-awaitFeeback");
      renderHTMLUserinTask(task, i, "userAwaitFeedbackTask-board");
    }

    let containerDone = document.getElementById('done');
    containerDone.innerHTML = '';
    let done = listTasks.filter(task => task.status == 4)
    for (let i = 0; i < done.length; i++) {
      const task = done[i];
      containerDone.innerHTML += /*html*/`${renderHTMLTasksBoard(task, i,"container-board-subTask-done", "userDoneTask-board")}`
      renderHTMLSubTask(task, i, "container-board-subTask-done");
      renderHTMLUserinTask(task, i, "userDoneTask-board");
    }
  }

  /**
   * This function render the HTML of tasks
   * @param {object} task - That is the complete task object
   * @param {number} i - The index of the task in tasks array
   * @returns 
   */
  function renderHTMLTasksBoard(task, i, idContainerSubTask, idContainerUserTask) {
    return /*html*/`
      <article
        onclick="openDialog('task_popup_template.html', '${task.id}')"
        class="taskCard"
        draggable="true"
        ondragstart="startDragging(1)">
        <span class="category ${categoryColor(task.categoryTask)}">${task.categoryTask}</span>
        <h3 class="taskTitle">${task.titleTask}</h3>
        <p class="taskDesription">${task.descriptionTask}</p>
        <div id="${idContainerSubTask}${i}" class="subtasks"></div>
        <footer>
          <div id="${idContainerUserTask}${i}" class="user"></div>
          <div class="priority">
            <img src="./assets/img/${showingPriorityBoard(task.priorityTask)}" alt="" />
          </div>
        </footer>
      </article>
    `
  }

  /**
   * This function assign a color to the headline in the card category board
   * @param {string} category 
   * @returns The color of the category to show in card Board
   */
  function categoryColor(category) {
    if(category == 'User story'){
      return 'userStory';
    }else{
      return 'technicalTask';
    }
  }

  /**
   * This function select the icon of priority.
   * @param {string} taskPriority 
   * @returns The name of the icon that should be render in the tag <img>
   */
  function showingPriorityBoard(taskPriority){
    if(taskPriority == 'urgent'){
      return 'urgent_high_priority_icon.svg'
    } else if(taskPriority == 'medium'){
      return 'priority_symbols_icon.svg'
    }else if(taskPriority == 'low'){
      return 'urgent_low_priority_icon.svg'
    }
  }

  /**
   * This function render the HTML of subtask
   * @param {object} task - That is the complete task.
   * @param {number} i - The index of the task in tasks array
   */
  function renderHTMLSubTask(task, i, idContainerSubTask) {
    let containerSubtask = document.getElementById(`${idContainerSubTask}${i}`);
    containerSubtask.innerHTML = '';
    if(task['subTasks']){
      containerSubtask.innerHTML = /*html*/`
       <div class="progressContainer">
         <div class="progress" style="width: 50%"></div>
       </div>
       <div><span>1</span>/<span>${task['subTasks'].length}</span> Subtasks</div>
     `
    }
  }

    /**
   * This function render the HTML of name of pople assigned in a Task
   * @param {object} task - That is the complete task.
   * @param {number} i - The index of the task in tasks array
   */
  function renderHTMLUserinTask(task, i, idContainerUserTask) {
    let userTaskBoard = document.getElementById(`${idContainerUserTask}${i}`);
    userTaskBoard.innerHTML = "";
    if(task['nameAssignedTask']){
      for (let j = 0; j < task['nameAssignedTask'].length; j++) {
        const userTask = task['nameAssignedTask'][j];
        const userColorIndex = +userTask.colorIndex;
        const userColor = colors[userColorIndex].color;
        const initialName = getInitials(userTask.name);
        userTaskBoard.innerHTML += /*html*/`
          <span class="profileSmall" style="background-color: ${userColor}">${initialName}</span>
        `
      }
    }
  }



