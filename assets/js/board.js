// Open Popup
async function openDialog(template) {
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


function closeDialog() {
  document.getElementById("dialog").classList.remove("animate__fadeIn");
  document.getElementById("dialog").classList.add("animate__fadeOut");
  document.getElementById("innerDialog").classList.add("animate__slideOutRight");
  document.getElementById("innerDialog").classList.remove("animate__slideInRight");
  setTimeout(() => {
    document.getElementById("dialog").classList.add("d-none");
  }, 500);
  document.body.classList.remove("noscroll");
}
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
    let toDoContainer = document.getElementById('toDoBoard');
    toDoContainer.innerHTML = '';
    let listTasks = Object.values(tasks);
    let toDo = listTasks.filter(task => task.status == 1)
    for (let i = 0; i < toDo.length; i++) {
      const task = toDo[i];
      //console.log(task);
      toDoContainer.innerHTML += /*html*/`
        <article
            onclick="openDialog('task_popup_template.html')"
            class="taskCard"
            draggable="true"
            ondragstart="startDragging(1)">
            <span class="category userStory">${task.categoryTask}</span>
            <h3 class="taskTitle">${task.titleTask}</h3>
            <p class="taskDesription">${task.descriptionTask}</p>
            <div id="container-board-subTask${i}" class="subtasks"></div>
            <footer>
              <div id="userInTask-board${i}" class="user"></div>
              <div class="priority">
                <img src="./assets/img/${showingPriorityBoard(task.priorityTask)}" alt="" />
              </div>
            </footer>
          </article>
      `
      let containerSubtask = document.getElementById(`container-board-subTask${i}`);
      containerSubtask.innerHTML = '';
      containerSubtask.innerHTML = /*html*/`
         <div class="progressContainer">
           <div class="progress" style="width: 50%"></div>
         </div>
         <div><span>1</span>/<span>${task['subTasks'].length}</span> Subtasks</div>
       `
      
      let userTaskBoard = document.getElementById(`userInTask-board${i}`);
      userTaskBoard.innerHTML = "";
      for (let j = 0; j < task['nameAssignedTask'].length; j++) {
        const userTask = task['nameAssignedTask'][j];
        const userColorIndex = +userTask.colorIndex;
        const userColor = colors[userColorIndex].color;
        const initialName = getInitials(userTask.name);
        userTaskBoard.innerHTML += /*html*/`
          <span class="profileSmall" style="background-color: ${userColor}">${initialName}</span>
        `
      }

      console.log(task.priorityTask);
      function showingPriorityBoard(taskPriority){
        if(taskPriority == 'urgent'){
          return 'urgent_high_priority_icon.svg'
        } else if(taskPriority == 'medium'){
          return 'priority_symbols_icon.svg'
        }else if(taskPriority == 'low'){
          return 'urgent_low_priority_icon.svg'
        }
      }
    }
  }



