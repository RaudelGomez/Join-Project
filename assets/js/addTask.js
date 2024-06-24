/**
 * This function render the Data of addTaskTemplate
 */
async function initAddTask() {
  await loadData("contacts");
  await loadData("tasks");
  renderContactsAssignedTask();
  selectdNameAssignedtask();
  dateFromTodayOnly();
  // await putData( { like: 1000}, '/tasks/-O-_C8hoeXkD9TjC6O4y');
  // await deleteData("/tasks/-O-_C8hoeXkD9TjC6O4y");
}

/**
 * This timeout was used to avoid the delay when the page is load and the function initAddTask
 */
setTimeout(initAddTask, 500);

/**
 * This Function is used to show and hidde thechekBoxes in the AddTask html.
 * The Field name is assigned to
 */
function showCheckboxes() {
  // console.log("showing");
  let assignedTask = document.getElementById("assigned-task");
  assignedTask.classList.toggle("assigned-task-hidden");
  assignedTask.classList.toggle("assigned-task-show");
}

/**
 * This Function is used to active the differents buttons of priority; when a Task is created.
 * Field name is Prio
 */
function changePriority(idPriorityButton) {
  document.getElementById("button-urgent-priority").classList.remove("active");
  document.getElementById("button-medium-priority").classList.remove("active");
  document.getElementById("button-low-priority").classList.remove("active");
  document.getElementById(`${idPriorityButton}`).classList.add("active");
  priorityTask = document.getElementById(`${idPriorityButton}`).dataset.prio;
}

/**
 * This function reset the priorityTask variable in data.js
 */
function resetPriority() {
  document.getElementById("button-urgent-priority").classList.remove("active");
  document.getElementById("button-medium-priority").classList.remove("active");
  document.getElementById("button-low-priority").classList.remove("active");
  document.getElementById("button-medium-priority").classList.add("active");
  priorityTask = "medium";
}

/**
 * This Function is used to show and hidde the options in the dropdown category in addTask page
 * Field name Category
 */
function showTaskOption() {
  let categoryTask = document.getElementById("category-task");
  categoryTask.classList.toggle("assigned-task-hidden");
  categoryTask.classList.toggle("assigned-task-show");
  document.getElementById("option-selected").textContent = "Select task category";
  document.getElementById("option-selected").dataset.filled = "Select task category";
}

/**
 * This Function is used to select the category from the options in the dropdown category in addTask page
 * Field name Category
 */
function categorySelected(idTask) {
  showTaskOption();
  let optionSelected = document.getElementById("option-selected");
  let taskValue = document.getElementById(`${idTask}`).textContent;
  optionSelected.dataset.filled = taskValue.trim();
  optionSelected.textContent = taskValue;
}

/**
 * This function render all contacts in addTask
 */
function renderContactsAssignedTask() {
  let asignedTaskContainer = document.getElementById("assigned-task");
  asignedTaskContainer.innerHTML = "";
  let listContacts = Object.values(contacts);
  for (let i = 0; i < listContacts.length; i++) {
    const contact = listContacts[i];
    asignedTaskContainer.innerHTML += /*html*/ `${asignedTaskContainerHTML(i, contact)}`;
  }
}

/**
 * Add a Task in Firebase when the form is sent
 */
async function addTask(status = typeOfTask) {
  selectdNameAssignedtask();
  let titleTask = document.getElementById("title_task");
  let descriptionTask = document.getElementById("description_task");
  let nameInTask = selectdNameAssignedtask();
  let timeDeadlineTask = document.getElementById("due_date_task");
  let categoryTask = document.getElementById("option-selected");
  //Validation and showing error to user
  if(titleTask.value == "" || timeDeadlineTask.value == "" || categoryTask.dataset.filled == "Select task category"){
    validationAddTask();
    return
  }
  let task = {
    titleTask: titleTask.value,
    descriptionTask: descriptionTask.value,
    nameAssignedTask: nameInTask,
    timeDeadlineTask: timeDeadlineTask.value,
    priorityTask: priorityTask,
    categoryTask: categoryTask.textContent.trim(),
    subTasks: subTasks,
    status: status,
  };
  await postData(task, "tasks");
  deleteDataFormTask();
  alertCreatedTask();
  await loadData('tasks');
  //Testing if the function exist
  if(typeof renderHTMLBoard === 'function') {
    await renderHTMLBoard();
  }
  typeOfTask = 1;
}

function alertCreatedTask() {
  //Notification of succesfull task created
  showAlert("container-addTask-alert", "addTask-alert", "Success", "succes-alert", "The Task was added successfully!");
  if (document.getElementById("innerDialog")) {
	  setTimeout(closeDialog, 3000);
  }
}


/**
 * This function makes empty all field in the form add task
 */
function deleteDataFormTask() {
  document.getElementById("title_task").value = "";
  document.getElementById("description_task").value = "";
  uncheckedNameAssignedTask();
  showInitialAssign();
  document.getElementById("due_date_task").value = "";
  document.getElementById("option-selected").textContent = "Select task category";
  document.getElementById("option-selected").dataset.filled = "Select task category";
  resetPriority();
  subTasks = [];
  showSubTask();
}

/**
 * This function pick the name of the person who was selected to do a task
 * @returns an array of objects. example: [{name: Maria, email: maria@test.com}, {name: Lola, email: lola@test.com}]
 */
function selectdNameAssignedtask() {
  let checkBoxSelectedContainer = document.getElementById("assigned-task");
  let checkBoxSelected = checkBoxSelectedContainer.querySelectorAll("label");
  let arrayPersonInTask = [];
  for (const checkbox of checkBoxSelected) {
    let i = checkbox.dataset.id;
    if (document.getElementById(`checkBoxAssigned${i}`).checked) {
      arrayPersonInTask.push({
        name: checkbox.dataset.name,
        email: checkbox.dataset.email,
        colorIndex: checkbox.dataset.colorindex,
      });
    }
  }
  return arrayPersonInTask;
}

/**
 * This function uncheck all checkbox of people who was assigned to task in add Task form
 */
function uncheckedNameAssignedTask() {
  let checkBoxSelectedContainer = document.getElementById("assigned-task");
  let checkBoxSelected = checkBoxSelectedContainer.querySelectorAll("label");
  for (const checkbox of checkBoxSelected) {
    let i = checkbox.dataset.id;
    let checkedTrue = document.getElementById(`checkBoxAssigned${i}`);
    if (checkedTrue.checked) {
      checkedTrue.checked = false;
    }
  }
}

/**
 * This Function show the initials letter of the people who was assigned to a task
 */
function showInitialAssign() {
  let fisrtLetterContainer = document.getElementById("container-people-assigned-task");
  fisrtLetterContainer.innerHTML = "";
  let objectPerson = selectdNameAssignedtask();
  if (objectPerson.length >= 1) {
    for (let i = 0; i < objectPerson.length; i++) {
      let person = objectPerson[i].name;
      let colorIndex = objectPerson[i].colorIndex;
      let name = getInitials(`${person}`);
      fisrtLetterContainer.innerHTML += /*html*/ `
				<span class="first-letter" style="background-color: ${colors[colorIndex].color}">${name}</span>
			`;
    }
  }
}

/**
 * This function add a sub task
 */
function addSubTask() {
  let inputSubTask = document.getElementById("sub-task");
  subTasks.push({ subTaskName: inputSubTask.value, statusSubTask: false });
  showSubTask();
}

/**
 * This function go throw the array subTask and show every sub task
 */
function showSubTask() {
  let containerNewSubTask = document.getElementById("container-new-subTask");
  containerNewSubTask.innerHTML = "";
  for (let i = 0; i < subTasks.length; i++) {
    const subTask = subTasks[i];
    const subTaskName = subTask.subTaskName;
    containerNewSubTask.innerHTML += /*html*/ `${renderHTMLSubTask(subTaskName, i)}`;
  }
  emptyInputSubTask();
  changeIconSubTask();
}



/**
 * This function empty the field add a new subtask
 */
function emptyInputSubTask() {
  let inputSubTask = document.getElementById("sub-task");
  inputSubTask.value = "";
  document.getElementById("add-sub-task").classList.remove("d-none");
  document.getElementById("container-icon-subTask").classList.add("d-none");
}

/**
 * This function change icons in sub task. If there ara info or not. Depends
 */
function changeIconSubTask() {
  if (document.getElementById("sub-task").value != "") {
    document.getElementById("add-sub-task").classList.add("d-none");
    document.getElementById("container-icon-subTask").classList.remove("d-none");
  } else {
    document.getElementById("add-sub-task").classList.remove("d-none");
    document.getElementById("container-icon-subTask").classList.add("d-none");
  }
}

/**
 * This function delete a subTask of the array subTask
 * @param {number} idSubTask -That is the index of the subtask in the aray subTask
 */
function deleteSubTask(idSubTask) {
  subTasks.splice(idSubTask, 1);
  showSubTask();
}

/**
 * This function allow to edit the subtask
 * @param {number} i - That is the index of the sub task in the array subTask
 */
function editingSubTask(i) {
  document.getElementById(`container-edit-subTask${i}`).classList.remove("d-none");
  document.getElementById(`span-link-edit-delete${i}`).classList.add("d-none");
  document.getElementById(`input-editing-subTask${i}`).value = subTasks[i].subTaskName;
}

/**
 * This function confirm the edition of the subtask
 * @param {Number} i - That is the index of the sub task in the array subTask
 */
function confirmEditSubTask(i) {
  let inputEditing = document.getElementById(`input-editing-subTask${i}`).value;
  if(inputEditing != ""){
    subTasks[i].subTaskName = inputEditing;
    showHideConfirmButton(i);
  }else{
    inputEditing = subTasks[i].subTaskName
    showHideConfirmButton(i);
  }
}

/**
 * This function show and hidde that item confirm in addSubtask and show the task
 * @param {number} i - Index of the item task to modify
 */
function showHideConfirmButton(i) {
  document.getElementById(`container-edit-subTask${i}`).classList.add("d-none");
  document.getElementById(`span-link-edit-delete${i}`).classList.remove("d-none");
  showSubTask();
}

/**
 * This function validate that the required field are filled
 * @returns null if the condition are not successfull.
 */
function validationAddTask() {
  let titleTask = document.getElementById('title_task');
  if(titleTask.value == ""){
    titleTask.nextElementSibling.textContent = "This field is required";
    titleTask.classList.add('inputRedBorder');
    return
  }
  let deadLine = document.getElementById('due_date_task');
  if(deadLine.value == ""){
    deadLine.nextElementSibling.textContent = "This field is required";
    deadLine.classList.add('inputRedBorder');
    return
  }
  let categoryTask = document.getElementById('option-selected');
  let errorCategoryTask = document.getElementById('error-option-selected');
  if (categoryTask.dataset.filled == "Select task category") {
    errorCategoryTask.textContent = "This field is required";
    errorCategoryTask.classList.add('inputRedBorder');
    return;
  }
}

/**
 * This function remove the error in the element where was showed
 * @param {elementHTML} elementHTML - That is the element HTML input
 */
function closeError(elementHTML) {
  elementHTML.nextElementSibling.textContent = "";
  elementHTML.classList.remove('inputRedBorder');
}

/**
 * This function remove the error in the element where was showed
 */
function closeErroCategory() {
  let errorCategoryTask = document.getElementById('error-option-selected');
    errorCategoryTask.textContent = "";
    errorCategoryTask.classList.remove('inputRedBorder');
}

/**
 * This function allow only date from the day when the task will be create
 */
function dateFromTodayOnly() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0'); 
  const dd = String(today.getDate()).padStart(2, '0');
  const minDate = `${yyyy}-${mm}-${dd}`;
  document.getElementById('due_date_task').setAttribute('min', minDate);
}
