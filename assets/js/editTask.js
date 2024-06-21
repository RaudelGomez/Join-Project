async function saveEditedTask() {
  let status = currentTask.status;
  selectdNameAssignedtask();
  let titleTask = document.getElementById("title_task");
  let descriptionTask = document.getElementById("description_task");
  let nameInTask = selectdNameAssignedtask();
  let timeDeadlineTask = document.getElementById("due_date_task");
  let categoryTask = document.getElementById("option-selected");

  if (categoryTask.dataset.filled == "Select task category") {
    showAlert(
      "container-addTask-alert",
      "addTask-alert",
      "Info",
      "info-alert",
      "You have to fill the field select Task!"
    );
    return;
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


//   let isChecked = document.getElementById(`subTask${subtaskId}`).checked;
//   let idString = `/tasks/${firebaseKey}/subTasks/${subtaskId}/statusSubTask`;
//   await putData(isChecked, idString);
//   loadDataBoard();

//   console.log(task);
  await putData(task, `/tasks/${currentTaskId}`);  
  // deleteDataFormTask();
  // closeDropDownAssignUser();
  await loadData('tasks');
  //Testing if the function exist
  if(typeof renderHTMLBoard === 'function') {
    await renderHTMLBoard();
  }
  openDialog('task_popup_template.html', `${currentTaskId}`)
  //showCheckboxes();
  closeDropDownAssignUser();
  typeOfTask = 1;
}
