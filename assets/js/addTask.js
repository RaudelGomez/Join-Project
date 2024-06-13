/**
 * This Function is used to show and hidde thechekBoxes in the AddTask html.
 * The Field name is assigned to
 */
function showCheckboxes() {
	let assignedTask = document.getElementById("assigned-task");
	assignedTask.classList.toggle("assigned-task-hidden");
	assignedTask.classList.toggle("assigned-task-show");
}

/**
 * This Function is used to active the differents buttons of priority; when a Task is created.
 * Field name is Prio
 */
function changePriority(idPriorityButton) {
	document.getElementById('button-high-priority').classList.remove('active')
	document.getElementById('button-medium-priority').classList.remove('active')
	document.getElementById('button-low-priority').classList.remove('active')
	document.getElementById(`${idPriorityButton}`).classList.add('active')
}

/**
 * This Function is used to show and hidde the options in the dropdown category in addTask page
 * Field name Category
 */
function showTaskOption() {
	let categoryTask = document.getElementById("category-task");
	categoryTask.classList.toggle("assigned-task-hidden");
	categoryTask.classList.toggle("assigned-task-show");
	document.getElementById('option-selected').textContent = "Select task category";
}

/**
 * This Function is used to select the category from the options in the dropdown category in addTask page
 * Field name Category
 */
function categorySelected(idTask) {
	showTaskOption();
	let optionSelected = document.getElementById('option-selected');
	let taskValue = document.getElementById(`${idTask}`).textContent;
	console.log(taskValue);
	optionSelected.textContent = taskValue;
}

