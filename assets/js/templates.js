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

/**
 * This template show the name of the user and initial in edit task pop up
 * @param {object} user - That is the object user
 * @returns html 
 */
function userHTMLBoard(user) {
	return /*html*/`
		 <div class="userBoardPopup">
				<span class="profileSmall" style="background-color: ${colors[user.colorIndex].color}">${getInitials(
				user.name)}</span>
				<span>${user.name}</span>
			</div> 
	`
}

/**
 * Tha function render the HTML of every Task
 * @param {object} task - Object task
 * @param {number} i - index of the task 
 * @param {string} idContainerSubTask - Container id where the subtask will render
 * @param {string} idContainerUserTask - Container id where the user will render
 * @param {number} countSubTasksDone - Count of subTask already done/finished
 * @param {number} porcentTaskDone - % of task done
 * @param {Array} subTasks - array of subtask 
 * @param {string} taskDesription - Descriptio of the task
 * @returns HTML to render
 */
function templateTaskBoard(task, i, idContainerSubTask, idContainerUserTask, countSubTasksDone, porcentTaskDone, subTasks, taskDesription) {
	return /*html*/ `
      <article
        onclick="openDialog('task_popup_template.html', '${task.id}')"
        class="taskCard"
        draggable="true"
        ondragstart="startDragging('${task.id}',this)">
        <div class="container-header-card">
          <span class="category ${categoryColor(task.categoryTask)}">${task.categoryTask}</span>
          <span class="dragDrop-menu-mobile" onclick="showDragMenuMobile('dragMenu${task.id}', '${task.status}'); stopPropagation(event)">
            <img src="./assets/img/more_vert_icon.svg" alt="menu-mobile-dragDrop">
            <div id="dragMenu${task.id}" class="menu-mobile-task-container d-none">
              <img class="cancel-button-dragDrop" src="./assets/img/cancel_light_blue.svg" alt="close">
              <p onclick="moveToColumn(1, '${task.id}')">To do</p>
              <p onclick="moveToColumn(2, '${task.id}')">In Progress</p>
              <p onclick="moveToColumn(3, '${task.id}')">Await Feedback</p>
              <p onclick="moveToColumn(4, '${task.id}')">Done</p>
            </div>
          </span>
        </div>
        <h3 class="taskTitle">${task.titleTask}</h3>
        <p class="taskDesription">${taskDesription}</p>
        <div id="${idContainerSubTask}${i}" class="subtasks">
          ${
            task["subTasks"]
              ? `<div class="progressContainer">
              <div class="progress" style="width: ${porcentTaskDone}%"></div>
            </div>`
              : ""
          }
          <div>
            <span>${subTasks ? countSubTasksDone + "/" + subTasks.length + " Subtasks" : ""}</span>
          </div>
        </div>
        <footer>
          <div id="${idContainerUserTask}${i}" class="user"></div>
          <div class="priority">
            <img src="./assets/img/${showingPriorityBoard(task.priorityTask)}" alt="" />
          </div>
        </footer>
      </article>
    `;
}

/**
 * This function render the HTML header in every page
 * @param {object} userData - Object of the user logged
 * @returns 
 */
function renderHTMLHeader(userData) {
  return /*html*/ `
     <img id="mobileLogo" class="d-none" src="./assets/img/join_logo_dark.svg" alt="" />
      <h1>Kanban Project Management Tool</h1>
      <div id="headerIcons" class="headerIcons">
        <a id="helpLink" href="./help.html"><img src="./assets/img/help_icon.svg" alt="" /></a>
        <a onclick="openHeaderMenu()"><span id="userInitial" class="profile">${userData.initials}</span></a>
      </div>
      <div id="headerMenu" class="d-none">
        <a href="./legal_notice.html">Legal Notice</a>
        <a href="./pripo.html">Privacy Policy</a>
        <a href="#" onclick="logout()">Log out</a>
      </div>
  `
}

/**
 * HTML Template for contact list
 * @param {string} iconColor - Hexcode for Icon color
 * @param {string} contactName - Name of contact
 * @param {string} contactMail - Mail of contact
 * @param {string} initials - Initials of contact
 * @param {string} results - Firebasekey
 * @param {string} contactPhone - phone of contact
 * @param {integeer} i - Index number of array
 * @returns 
 */
function contactsListHtmlTemplate(iconColor,contactName,contactMail,initials,results,contactPhone,i) {
  return /* HTML */ `
      <div
        onclick="showContact(this,'${iconColor}','${contactName}','${contactMail}','${initials}','${results}','${contactPhone}',${i})"
        class="contactBox">
        <span class="profileSmall" style="background-color: ${iconColor}">${initials}</span>
        <div class="contactDetails">
          <div class="contactName">${contactName}</div>
          <div class="contactMail">${contactMail}</div>
        </div>
      </div>
    `;
}
