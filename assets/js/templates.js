/**
 * This Function render the HTML from assigned contact in task
 * @param {number} i - index of the item inthe array contacts
 * @param {object} contact - Object contact
 * @returns - The html of th assigned contact in a task
 */
function asignedTaskContainerHTML(i, contact) {
	return /*html*/ `
    <label onclick="stopPropagation(event)" class="checkbox-label" for="checkBoxAssigned${i}" data-id="${i}" data-name="${contact.name}" data-email="${contact.email}" data-colorindex="${contact.color}">
				<span class="container-name-assigned">
					<span class="name-assigned">
						<span class="first-letter" style="background-color: ${
							colors[contact.color].color
						}">${getInitials(`${contact.name}`)}</span>${contact.name}
					</span>
					<input type="checkbox" id="checkBoxAssigned${i}"/>
					<img class="hook-check" src="./assets/img/hook_checked_white.svg" alt="checked">
					<img class="hook-no-check" src="./assets/img/hook_unchecked.svg" alt="unchecked">
				</span>
			</label>
    `;
}

/**
 * this function show the html of sub task
 * @param {string} subTask - That is the content of the sub task
 * @param {number} i - That is the index in the array subTask: Like this it can show every element in the array
 * @returns -Show the HTML ofthe subtask
 */
function renderHTMLSubTask(subTaskName, i) {
  return /*html*/ `
		<p id="span-link-edit-delete${i}" class="new-subTask">
				<span class="span-link">
					<span id="text-new-subTask" class="text-new-subTask">${subTaskName}</span>
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
	`;
}
