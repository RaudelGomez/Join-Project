/**
 * This function render the Data of addTaskTemplate
 */
async function initAddTask() {
	await loadData('contacts');
	await loadData('tasks');
	renderContactsAssignedTask();
	selectdNameAssignedtask();
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
	let assignedTask = document.getElementById("assigned-task");
	assignedTask.classList.toggle("assigned-task-hidden");
	assignedTask.classList.toggle("assigned-task-show");
}

/**
 * This Function is used to active the differents buttons of priority; when a Task is created.
 * Field name is Prio
 */
function changePriority(idPriorityButton) {
	document.getElementById('button-high-priority').classList.remove('active');
	document.getElementById('button-medium-priority').classList.remove('active');
	document.getElementById('button-low-priority').classList.remove('active');
	document.getElementById(`${idPriorityButton}`).classList.add('active');
	priorityTask = document.getElementById(`${idPriorityButton}`).dataset.prio;
}

/**
 * This function reset the priorityTask variable in data.js
 */
function resetPriority(){
	document.getElementById('button-high-priority').classList.remove('active');
	document.getElementById('button-medium-priority').classList.remove('active');
	document.getElementById('button-low-priority').classList.remove('active');
	document.getElementById('button-high-priority').classList.add('active');
	priorityTask = "urgent";
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
	optionSelected.dataset.filled = taskValue.trim();
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
async function addTask() {
	selectdNameAssignedtask();
	let titleTask = document.getElementById('title_task');
	let descriptionTask = document.getElementById('description_task');
	let nameInTask = selectdNameAssignedtask();
	let timeDeadlineTask = document.getElementById('due_date_task');
	let categoryTask = document.getElementById('option-selected');

	if(categoryTask.dataset.filled == "Select task category"){
		showAlert("container-addTask-alert", "addTask-alert", "Info", "info-alert", "You have to fil the field select Task!");
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
		status: 1
	}
	await postData(task, "tasks");
	deleteDataFormTask();
	showAlert("container-addTask-alert", "addTask-alert", "Success", "succes-alert", "The Task was added successfully!");
}

/**
 * This function makes empty all field in the form add task
 */
function deleteDataFormTask() {
	document.getElementById('title_task').value = "";
	document.getElementById('description_task').value = "";
	uncheckedNameAssignedTask();
	showInitialAssign();
	document.getElementById('due_date_task').value = "";
	document.getElementById('option-selected').textContent = "Select task category";
	resetPriority();
	subTasks = [];
	showSubTask();
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
 * This function uncheck all checkbox of people who was assigned to task in add Task form
 */
function uncheckedNameAssignedTask() {
	let checkBoxSelectedContainer = document.getElementById('assigned-task');
	let checkBoxSelected = checkBoxSelectedContainer.querySelectorAll('label');
	for (const checkbox of checkBoxSelected) {
		let i = checkbox.dataset.id;
		let checkedTrue = document.getElementById(`checkBoxAssigned${i}`);
		if(checkedTrue.checked){
			checkedTrue.checked = false;
		}
	}
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
	subTasks.push(inputSubTask.value);
	showSubTask();
}

/**
 * This function go throw the array subTask and show every sub task
 */
function showSubTask() {
	let containerNewSubTask = document.getElementById('container-new-subTask');
	containerNewSubTask.innerHTML = '';
	for (let i = 0; i < subTasks.length; i++) {
		const subTask = subTasks[i];
		containerNewSubTask.innerHTML += /*html*/ `${renderHTMLSubTask(subTask, i)}`;
	}
	emptyInputSubTask();
	changeIconSubTask();
}

/**
 * this function show the html of sub task
 * @param {string} subTask - That is the content of the sub task
 * @param {number} i - That is the index in the array subTask: Like thisit can showm every element in the array
 * @returns -Show the HTML ofthe subtask
 */
function renderHTMLSubTask(subTask, i) {
	return /*html*/`
		<p id="span-link-edit-delete${i}" class="new-subTask">
				<span class="span-link">
					<span id="text-new-subTask" class="text-new-subTask">${subTask}</span>
					<span>
						<img id="editingTask${i}"  src="./assets/img/pencil_icon.svg" alt="edit" onclick="editingSubTask(${i})" />
						<span id="separatorOne${i}" class="separator-subtask"></span>
						<img id="deleteOne${i}" src="./assets/img/delete_icon.svg" alt="delete" onclick="deleteSubTask(${i})" />
					</span>
				</span>
		</p>
		<div id="container-edit-subTask${i}" class="container-edit-subTask d-none">
				<input id="input-editing-subTask${i}" type="text" class="input-editing-subTask">
				<span class="span-input-editing-subTask">
					<img id="deleteTwo${i}" src="./assets/img/delete_icon.svg" alt="delete" onclick="deleteSubTask(${i})" />
					<span id="separatorTwo${i}" class="separator-subtask"></span>
					<img id="confirmEdition${i}" src="./assets/img/check_subTask.svg" alt="confirm edit" onclick="confirmEditSubTask(${i})" />
				</span>
		</div>
	`
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
function editingSubTask(i){
	document.getElementById(`container-edit-subTask${i}`).classList.remove('d-none');
	document.getElementById(`span-link-edit-delete${i}`).classList.add('d-none');
	document.getElementById(`input-editing-subTask${i}`).value = subTasks[i];
}

/**
 * This function confirm the edition of the subtask
 * @param {Number} i - That is the index of the sub task in the array subTask
 */
function confirmEditSubTask(i) {
	subTasks[i] = document.getElementById(`input-editing-subTask${i}`).value;
	document.getElementById(`container-edit-subTask${i}`).classList.add('d-none');
	document.getElementById(`span-link-edit-delete${i}`).classList.remove('d-none');
	showSubTask();
}



