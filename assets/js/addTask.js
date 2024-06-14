// async function initAddTask() {
// 	await loadData();
// 	await renderContactsAssignedTask();
// }

console.log(contacts);
document.getElementById('title_task').value ="test";

// initAddTask();

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

async function renderContactsAssignedTask() {
	console.log(contacts);
	let asignedTaskContainer = document.getElementById('assigned-task');
	// let contacts = Object.values(contacts);
	asignedTaskContainer.innerHTML = ""
	// for (let i = 0; i < contacts.length; i++) {
	// 	const contact = contacts[i];
	// 	asignedTaskContainer.innerHTML += /*html*/`
	// 		<p>${contact}</p>
	// 	`
	// 	}
}

function addTask() {
	let titleTask = document.getElementById('title_task');
	let descriptionTask = document.getElementById('description_task');
}

