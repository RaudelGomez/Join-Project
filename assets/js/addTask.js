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
	priorityTask = document.getElementById(`${idPriorityButton}`).dataset.prio;
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
	optionSelected.textContent = taskValue;
}

function renderContactsAssignedTask() {
	let asignedTaskContainer = document.getElementById('assigned-task');
	asignedTaskContainer.innerHTML = "";
	let listContacts = Object.values(contacts);
	for (let i = 0; i < listContacts.length; i++) {
		const contact = listContacts[i];
		asignedTaskContainer.innerHTML += /*html*/`
			<label class="checkbox-label" for="checkBoxAssigned${i}" data-id="${i}" data-name="${contact.name}" data-email="${contact.email}">
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

/**
 * Add a Task in Firebase when the form is sent
 */
function addTask() {
	selectdNameAssignedtask();
	let titleTask = document.getElementById('title_task');
	let descriptionTask = document.getElementById('description_task');
	let nameInTask = selectdNameAssignedtask();
	let timeDeadlineTask = document.getElementById('due_date_task');
	let categoryTask = document.getElementById('option-selected');

	console.log(titleTask.value);
	console.log(descriptionTask.value);
	console.log(nameInTask);
	console.log(timeDeadlineTask.value);
	console.log(priorityTask);
	console.log(categoryTask.textContent);

}

/**
 * This function pick the name of the person who was selected to do a task
 * @returns an array of objects. example: [{name: Maria, email: maria@test.com}, {name: Lola, email: lola@test.com}]
 */
function selectdNameAssignedtask() {
	let checkBoxSelectedContainer = document.getElementById('assigned-task');
	let checkBoxSelected = checkBoxSelectedContainer.querySelectorAll('label');
	let arrayPersonInTask = [];
	for (const checkbox of checkBoxSelected) {
		let i = checkbox.dataset.id;
		if(document.getElementById(`checkBoxAssigned${i}`).checked){
			arrayPersonInTask.push({name:checkbox.dataset.name, email: checkbox.dataset.email});
		}
	}
	return arrayPersonInTask;
}

/**
 * This Function show the initials letter of the people who was assigned to a task
 */
function showInitialAssign() {
	let fisrtLetterContainer = document.getElementById('container-people-assigned-task');
	fisrtLetterContainer.innerHTML = "";
	let objectPerson = selectdNameAssignedtask();
	if(objectPerson.length >= 1){
		for (let i = 0; i < objectPerson.length; i++) {
			let name = objectPerson[i].name;
			name = getInitials(`${name}`);
			fisrtLetterContainer.innerHTML += /*html*/`
				<span class="first-letter">${name}</span>
			`
		}
	}
}

/**
 * This function add a sub task
 */
function addSubTask() {
	let inputSubTask = document.getElementById('sub-task');
	let containerNewSubTask = document.getElementById('container-new-subTask');
	subTasks.push(inputSubTask.value);
	containerNewSubTask.innerHTML = '';
	for (let i = 0; i < subTasks.length; i++) {
		const subTask = subTasks[i];
		containerNewSubTask.innerHTML += /*html*/ `
			<p class="new-subTask">
				<span class="span-link">
					<span id="text-new-subTask" class="text-new-subTask">${subTask}</span>
					<span id="span-link-edit-delete">
						<img src="./assets/img/pencil_icon.svg" alt="edit" />
						<span class="separator-subtask"></span>
						<img src="./assets/img/delete_icon.svg" alt="delete" />
					</span>
				</span>
			</p>
		`
	}
	emptyInputSubTask();
	changeIconSubTask();
}

/**
 * This function empty the field add a new subtask
 */
function emptyInputSubTask() {
	let inputSubTask = document.getElementById('sub-task');
	inputSubTask.value = "";
	document.getElementById('add-sub-task').classList.remove('d-none');
	document.getElementById('container-icon-subTask').classList.add('d-none');
}

/**
 * This function change icons in sub task. If there ara info or not. Depends
 */
function changeIconSubTask() {
	if(document.getElementById('sub-task').value != ""){
		document.getElementById('add-sub-task').classList.add('d-none');
		document.getElementById('container-icon-subTask').classList.remove('d-none');
	}else{
		document.getElementById('add-sub-task').classList.remove('d-none');
		document.getElementById('container-icon-subTask').classList.add('d-none');
	}
}



