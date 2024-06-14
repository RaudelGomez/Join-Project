async function initAddTask() {
	await loadData();
	console.log(contacts);
	renderContactsAssignedTask();
	selectdNameAssignedtask();
}

initAddTask()

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

function renderContactsAssignedTask() {
	let asignedTaskContainer = document.getElementById('assigned-task');
	asignedTaskContainer.innerHTML = "";
	let listContacts = Object.values(contacts);
	for (let i = 0; i < listContacts.length; i++) {
		const contact = listContacts[i];
		asignedTaskContainer.innerHTML += /*html*/`
			<label class="checkbox-label" for="checkBoxAssigned${i}" data-id="${i}" data-email="${contact.email}">
				<span class="container-name-assigned">
					<span class="name-assigned">
						<span class="first-letter">${getInitials(`${contact.name}`)}</span>${contact.name}
					</span>
					<input type="checkbox" id="checkBoxAssigned${i}"/>
					<img class="hook-check" src="./assets/img/hook_checked_white.svg" alt="checked">
					<img class="hook-no-check" src="./assets/img/hook_unchecked.svg" alt="unchecked">
				</span>
			</label>
		`
		}
}

function addTask() {
	selectdNameAssignedtask();
	let titleTask = document.getElementById('title_task');
	let descriptionTask = document.getElementById('description_task');
	let nameInTask = selectdNameAssignedtask();
	console.log(titleTask.value);
	console.log(descriptionTask.value);
	console.log(nameInTask);

}

function selectdNameAssignedtask() {
	let checkBoxSelectedContainer = document.getElementById('assigned-task');
	let checkBoxSelected = checkBoxSelectedContainer.querySelectorAll('label');
	let arrayPersonInTask = [];
	for (const checkbox of checkBoxSelected) {
		let i = checkbox.dataset.id;
		if(document.getElementById(`checkBoxAssigned${i}`).checked){
			arrayPersonInTask.push(checkbox.dataset.email);
		}
	}
	return arrayPersonInTask;
}



