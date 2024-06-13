  // Open Popup
  async function openDialog(template) {
    // console.log(template);
    // const htmlTemplate = 
    let innerHTML ="";
    if (template == 'task_popup_template.html') {
      document.getElementById('innerDialog').style.maxWidth = "525px";
      document.getElementById('innerDialog').style.top = "3vh";
      document.getElementById('innerDialog').style.padding = "48px";
      innerHTML = /* HTML*/ `
      <article class="taskPopup">
  <div><span class="categoryPopup userStory">User Story</span></div>
  <h2 class="">Kochwelt Pag & Recipe Recommender</h2>
  <div class="taskDesriptionPopup">Lorem ipsum dolor sit amet consectetur adipisicing elit...</div>
  <div><span class="taskPopupLabel">Due date:</span> 10/05/2023</div>
  <div>
    <span class="taskPopupLabel">Priority:</span> Medium <img src="./assets/img/priority_symbols_icon.svg" alt="" />
  </div>
  <span class="taskPopupLabel">Assigned To:</span>
  <div class="user">

<div class="userItem"><span class="profileSmall am">AM</span> Anton Mayer</div>
<div class="userItem"><span class="profileSmall em">EM</span> Emmanuel Maurer</div>
<div class="userItem"><span class="profileSmall mb">MB</span> Marcel Bauer</div>
  </div>

  <span class="taskPopupLabel">Subtasks</span>

  <div class="subtasksPopup">
    <input type="checkbox" checked name="" id="1" />
    <label for="1">Subtask 1</label>

    <input type="checkbox" name="" id="2" />
    <label for="2">Subtask 2</label>
  </div>

  <div class="taskPopupFooter">    
  <span class="svgContainer" onclick="deleteTask()">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_184897_4146" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
<rect width="24" height="24" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_184897_4146)">
<path class="svgLightBlue" d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#2A3647"/>
</g>
</svg>
  Delete</span>
    | <span class="svgContainer" onclick="editTask()">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask
          id="mask0_184897_3882"
          style="mask-type: alpha"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="24"
          height="24">
          <rect width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_184897_3882)">
          <path
            class="svgLightBlue"
            d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z"
            fill="#2A3647" />
        </g>
      </svg> Edit</span>     
  </div> 

</article>

      `;
    }

    if (template == 'add_task_template.html') {
      document.getElementById('innerDialog').style.maxWidth = "800px";
      document.getElementById('innerDialog').style.top = "20vh";
      document.getElementById('innerDialog').style.padding = "64px";
innerHTML = /* HTML */ `
<h2>Add Task</h2>
<article>
	<form id="add_task_form" onsubmit="return false">
		<div class="add_task_data">
			<section>
				<div class="form-control">
					<label for="title_task">Title<span class="required">*</span></label>
					<input
						required
						id="title_task"
						type="text"
						placeholder="Enter a title"
					/>
				</div>
				<div class="form-control">
					<label for="description_task">Description</label>
					<textarea
						name="description_task"
						id="description_task"
						placeholder="Enter a Description"
						rows="5"
					></textarea>
				</div>
				<div class="form-control position-relative">
					<label for="assigned_task">Assigned to</label>
					<div class="select-option" onclick="showCheckboxes()">
						<select>
							<option>Select contacts to assign</option>
						</select>
						<div class="overSelect"></div>
					</div>
					<div id="assigned-task" class="category-task assigned-task-hidden">
						<label class="checkbox-label" for="1">
							<span class="container-name-assigned">
								<span class="name-assigned">
									<span class="first-letter">ÖZ</span>Özkan
								</span>
								<input type="checkbox" id="1"/>
								<img class="hook-check" src="./assets/img/hook_checked_white.svg" alt="checked">
								<img class="hook-no-check" src="./assets/img/hook_unchecked.svg" alt="unchecked">
							</span>
						</label>
						<label class="checkbox-label" for="2">
							<span class="container-name-assigned">
								<span class="name-assigned">
									<span class="first-letter">AL</span>Alain
								</span>
								<input type="checkbox" id="2"/>
								<img class="hook-check" src="./assets/img/hook_checked_white.svg" alt="checked">
								<img class="hook-no-check" src="./assets/img/hook_unchecked.svg" alt="unchecked">
							</span>
						</label>
						<label class="checkbox-label" for="3">
							<span class="container-name-assigned">
								<span class="name-assigned">
									<span class="first-letter">RA</span>Raudel
								</span>
								<input type="checkbox" id="3"/>
								<img class="hook-check" src="./assets/img/hook_checked_white.svg" alt="checked">
								<img class="hook-no-check" src="./assets/img/hook_unchecked.svg" alt="unchecked">
							</span>
						</label>
						<label class="checkbox-label" for="4">
							<span class="container-name-assigned">
								<span class="name-assigned">
									<span class="first-letter">RO</span>Robert
								</span>
								<input type="checkbox" id="4"/>
								<img class="hook-check" src="./assets/img/hook_checked_white.svg" alt="checked">
								<img class="hook-no-check" src="./assets/img/hook_unchecked.svg" alt="unchecked">
							</span>
						</label>
						<label class="checkbox-label" for="5">
							<span class="container-name-assigned">
								<span class="name-assigned">
									<span class="first-letter">MM</span>Maria
								</span>
								<input type="checkbox" id="5"/>
								<img class="hook-check" src="./assets/img/hook_checked_white.svg" alt="checked">
								<img class="hook-no-check" src="./assets/img/hook_unchecked.svg" alt="unchecked">
							</span>
						</label>
					</div>
					<div id="container-people-assigned-task" class="container-people-assigned-task">
						<span class="first-letter">RA</span>
						<span class="first-letter">ÖZ</span>
						<span class="first-letter">AL</span>
						<span class="first-letter">RA</span>
						<span class="first-letter">ÖZ</span>
						<span class="first-letter">AL</span>
						<span class="first-letter">RA</span>
						<span class="first-letter">ÖZ</span>
						<span class="first-letter">AL</span>
						<span class="first-letter">RA</span>
						<span class="first-letter">ÖZ</span>
						<span class="first-letter">AL</span>
					</div>
				</div>
			</section>
			<div class="add_task_separator"></div>
			<section>
				<div class="form-control">
					<label for="due_date_task"
						>Due date<span class="required">*</span></label
					>
					<input required id="due_date_task" type="date" />
				</div>
				<div class="form-control">
					<span>Prio</span>
					<div class="prio-container">
						<button id="button-high-priority" class="svgContainerButtonPrio svgContainerOrange active" onclick="changePriority('button-high-priority')">
							<span>Urgent</span>
							<img class="show-icon" src="./assets/img/urgent_high_priority_icon.svg" alt="priority" />
							<img class="hidde-icon" src="./assets/img/urgent_high_priority_white.svg" alt="priority" />
						</button>
						<button id="button-medium-priority" class="svgContainerButtonPrio svgContainerYellow" onclick="changePriority('button-medium-priority')">
							<span>Medium</span>
							<img class="show-icon" src="./assets/img/priority_symbols_icon.svg" alt="media priority" />
							<img class="hidde-icon" src="./assets/img/priority_media_white.svg" alt="media priority" />
						</button>
						<button id="button-low-priority" class="svgContainerButtonPrio svgContainerGreen" onclick="changePriority('button-low-priority')">
							<span>Low</span>
							<img class="show-icon" src="./assets/img/urgent_low_priority_icon.svg" alt="low priority" />
							<img class="hidde-icon" src="./assets/img/low_priority_white.svg" alt="low priority" />
						</button>
					</div>
				</div>
					<div class="form-control position-relative">
						<label for="category-task">Category<span class="required">*</span></label>
						<div class="select-option" onclick="showTaskOption()">
							<select>
								<option id="option-selected">Select task category</option>
							</select>
							<div class="overSelect"></div>
						</div>
						<div id="category-task" class="category-task assigned-task-hidden">
									<button id="technicalTask" onclick="categorySelected('technicalTask')">Technical task</button>
									<button id="userStory" onclick="categorySelected('userStory')">User story</button>
						</div>
				</div>
				<div class="form-control">
					<label for="sub_task">Sub task</label>
					<div class="container-subTask">
						<input id="sub-task" placeholder="Add new subtask" type="text" />
						<img
							id="add-sub-task"
							src="./assets/img/plus_icon.svg"
							alt="add sub task"
						/>
					</div>
					<div id="container-new-subTask">
						<p class="new-subTask">
							<span class="span-link">
								<span id="text-new-subTask" class="text-new-subTask">Contact form </span>
								<span id="span-link-edit-delete">
									<img src="./assets/img/pencil_icon.svg" alt="edit" />
									<img src="./assets/img/delete_icon.svg" alt="delete" />
								</span>
							</span>
						</p>
					</div>
				</div>
			</section>
		</div>
		<div class="container-button-submit-add-task">
			<p><span>*</span>This field is required</p>
			<div class="button-submit-clear-add-task">
				<button class="clear-button-add-task svgContainer">
					<span>Clear</span>
					<svg
						width="25"
						height="24"
						viewBox="0 0 25 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12.2496 11.9998L17.4926 17.2428M7.00659 17.2428L12.2496 11.9998L7.00659 17.2428ZM17.4926 6.75684L12.2486 11.9998L17.4926 6.75684ZM12.2486 11.9998L7.00659 6.75684L12.2486 11.9998Z"
							stroke="#2A3647"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="svgStrokeblue"
						/>
					</svg>
				</button>
				<button type="submit" class="button">
					<span>Create Task</span>
					<img src="./assets/img/check_white_icon.svg" alt="add button" />
				</button>
			</div>
		</div>
	</form>
</article>

`;
    }

    
    
    document.getElementById("template").innerHTML = innerHTML;
    // document.getElementById("template").setAttribute('w3-include-html','./assets/templates/'+template);
    document.getElementById("innerDialog").classList.remove("d-none"); 
    document.getElementById("innerDialog").classList.remove("animate__slideOutRight");
    document.getElementById("innerDialog").classList.add("animate__slideInRight");
    document.getElementById("dialog").classList.add("animate__fadeIn");
    document.getElementById("dialog").classList.remove("animate__fadeOut");
    document.getElementById("dialog").classList.remove("d-none");
    document.body.classList.add("noscroll");    
  }

  function closeDialog() {
    document.getElementById("dialog").classList.remove("animate__fadeIn");
    document.getElementById("dialog").classList.add("animate__fadeOut");
    document.getElementById("innerDialog").classList.add("animate__slideOutRight");
    document.getElementById("innerDialog").classList.remove("animate__slideInRight");
    setTimeout(() => {document.getElementById("dialog").classList.add("d-none")}, 500);
    document.body.classList.remove("noscroll");
  }

