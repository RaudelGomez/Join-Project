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
    let taskArray = Object.values(task["nameAssignedTask"]);
    for (let j = 0; j < 4; j++) {
      const userTask = taskArray[j];
      let userColorIndex;
      if (userTask != null) {
        userColorIndex = +userTask.colorIndex;
        const userColor = colors[userColorIndex].color;
        const initialName = getInitials(userTask.name);
        userTaskBoard.innerHTML += /*html*/ `
          <span class="profileSmall" style="background-color: ${userColor}">${initialName}</span>
        `;
      }
    }
    let restContacts = taskArray.length - 4;
    if (restContacts > 0) {
      userTaskBoard.innerHTML += /*html*/ `
          <span class="profileSmall bg-more-user-task">+ ${restContacts}</span>
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

/**
 * This function delete a task in the data base
 * @param {string} firebaseKey - id Task to delete
 */
async function deleteTask(firebaseKey) {
  await deleteData("/tasks/" + firebaseKey);
  loadDataBoard();
  closeDialog();
}

/**
 * This function update a task in data base
 * @param {string} firebaseKey - id Subatask to update
 * @param {number} subtaskId - Index of the subTask in the array in data base
 */
async function updateSubTask(firebaseKey, subtaskId) {
  let isChecked = document.getElementById(`subTask${subtaskId}`).checked;
  let idString = `/tasks/${firebaseKey}/subTasks/${subtaskId}/statusSubTask`;
  await putData(isChecked, idString);
  loadDataBoard();
}

/**
 * This function fill all Field in the pop. This field are the data of the task that will be edited
 */
function editTask() {
  openDialog("add_task_template.html");
  updatingEditFormvalue();
  fillingAssignUserEdit();
  changePriorityEditTask(`${currentTask.priorityTask}`);
  editCategorySetNotAvailable();
  changeFooterEditTask();
  subTasks = loadSubaTaskInForm();
}

/**
 * Thi function filled all contacts in task that will be edited
 */
function fillingAssignUserEdit() {
  //let arrayContact = [];
  if (currentTask.nameAssignedTask) {
    for (let i = 0; i < currentTask.nameAssignedTask.length; i++) {
      const assignedContact = currentTask.nameAssignedTask[i];
      if (assignedContact != null) {
        //arrayContact.push(assignedContact);
        let allContacts = document.getElementById("assigned-task");
        let allLabel = allContacts.querySelectorAll("label");
        for (const label of allLabel) {
          let i = label.dataset.id;
          if (label.dataset.email == assignedContact.email) {
            let checkbox = document.getElementById(`checkBoxAssigned${i}`);
            checkbox.checked = true;
          }
        }
      }
    }
    showInitialAssign();
  }
}

/**
 * This function fill some field in edit Form and change the submit function addTask for editTask
 */
function updatingEditFormvalue() {
  let firstChild = document.getElementById("addTaskPopup").firstElementChild;
  firstChild.innerHTML = "";
  document.getElementById("add_task_form").setAttribute("onsubmit", "saveEditedTask(); return false;");
  document.getElementById("title_task").value = currentTask.titleTask;
  document.getElementById("description_task").value = currentTask.descriptionTask;
  document.getElementById("due_date_task").value = currentTask.timeDeadlineTask;
}

/**
 * This function set the category in edit Task but not allow to edit the category
 */
function editCategorySetNotAvailable() {
  document.getElementById("option-selected").innerHTML = currentTask.categoryTask;
  document.getElementById("option-selected").dataset.filled = currentTask.categoryTask.trim();
  document.getElementById("container-select-option").classList.add("pointer-none");
}

/**
 * This function change the footer edit/add task depend what will be done
 */
function changeFooterEditTask() {
  document.getElementById("btn-clear-add-Task").classList.add("d-none");
  let footerButtonAddTask = document.getElementById("footer-button-addtask");
  footerButtonAddTask.firstElementChild.classList.add("d-none");
  footerButtonAddTask.classList.add("justify-end");
  let btnCreatetask = document.getElementById("btn-create-task");
  btnCreatetask.firstElementChild.textContent = "OK";
  btnCreatetask.classList.add("btn-edit-task");
}

/**
 * This function load subtasks in the Form edit Task
 * @param {*} params
 * @returns subtask array
 */
function loadSubaTaskInForm() {
  subTasks = currentTask.subTasks;
  if (subTasks) {
    showSubTask();
  } else {
    subTasks = [];
  }
  return subTasks;
}

/**
 * This function change the priority of the task
 * @param {string} idPriorityButton - that is the priority of the task that will be given
 */
function changePriorityEditTask(idPriorityButton) {
  document.getElementById("button-urgent-priority").classList.remove("active");
  document.getElementById("button-medium-priority").classList.remove("active");
  document.getElementById("button-low-priority").classList.remove("active");
  document.getElementById(`button-${idPriorityButton}-priority`).classList.add("active");
  priorityTask = document.getElementById(`button-${idPriorityButton}-priority`).dataset.prio;
}

/**
 * This function search a Task
 */
function searchTasks() {
  let filterTask = document.getElementById("searchTask").value;
  filterTask = filterTask.toLowerCase();
  renderHTMLBoard(filterTask);
}

/**
 * This function redirect to addTask page in the mobile Version if you are nder 900px and you have the PopUp add task open
 */
function resizeChangeAddTaskMobile() {
  if (window.innerWidth <= 900 && document.getElementById("addTaskPopup").classList.contains("mobile-version-only")) {
    document.getElementById("addTaskPopup").classList.add("d-none");
    location.href = "./add_task.html";
  }
}

/**
 * This function give a class to the addTask form. Like this could be adapt the form in a responsive way when this one will be used to edit
 */
function addClassForEdit() {
  let form = document.getElementById("addTaskPopup");
  form.classList.add("edit-class");
  document.getElementById("innerDialog").classList.add("overflowYAuto");
  document.getElementById("innerDialog").classList.add("edit-innerDialog");
}

/**
 * This function clean the input search task in board and show all tasks again
 */
async function cleanSearchInput() {
  document.getElementById("searchTask").value = "";
  await renderHTMLBoard();
}
