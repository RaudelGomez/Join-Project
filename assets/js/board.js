// Open Popup
async function openDialog(template) {
  document.getElementById("innerDialog").classList.remove("d-none");
  document.getElementById("innerDialog").classList.remove("animate__slideOutRight");
  document.getElementById("innerDialog").classList.add("animate__slideInRight");
  document.getElementById("dialog").classList.add("animate__fadeIn");
  document.getElementById("dialog").classList.remove("animate__fadeOut");
  document.getElementById("dialog").classList.remove("d-none");
  document.body.classList.add("noscroll");
  if (template=="add_task_template.html") {
	document.getElementById("addTaskPopup").classList.remove("d-none");
	document.getElementById("showTaskPopup").classList.add("d-none");
  }
  else {
	document.getElementById("showTaskPopup").classList.remove("d-none");
	document.getElementById("addTaskPopup").classList.add("d-none");
  }    
}


function closeDialog() {
  document.getElementById("dialog").classList.remove("animate__fadeIn");
  document.getElementById("dialog").classList.add("animate__fadeOut");
  document.getElementById("innerDialog").classList.add("animate__slideOutRight");
  document.getElementById("innerDialog").classList.remove("animate__slideInRight");
  setTimeout(() => {
    document.getElementById("dialog").classList.add("d-none");
  }, 500);
  document.body.classList.remove("noscroll");
}
	/**
	 * This function bring all Data from datBase: contacts & tasks
	 */
	async function loadDataBoard() {
		await loadData('contacts');
		await loadData('tasks');
	}

	/**
	 * This timeout was used to avoid the delay when the page is load and the function loadDataBoard
	 */
	setTimeout(loadDataBoard, 500);



