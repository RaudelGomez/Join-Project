async function initSummary(){
  await loadData('tasks');
  getTimeOfDay();
  loadLocalStorage();
  updatingSummaryData();
}

initSummary();

/**
 * This function greets with the moment of the day. Ex: Good Night
 */
function getTimeOfDay() {
  let now = new Date();
  let hours = now.getHours();
  let greeting = ""
  if (hours >= 6 && hours < 12) {
    greeting = "Good Morning";
  } else if (hours >= 12 && hours < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Night";
  }
  document.getElementById('welcome-text').textContent = greeting;
}

/**
 * This function load the name of the person who is logged
 */
function loadLocalStorage() {
  let userName = "Guest";
  if (localStorage.getItem("Join")) {
    userName = JSON.parse(sessionStorage.getItem("Join")).userName;
  }
  if (sessionStorage.getItem("Join")) {
    userName = JSON.parse(sessionStorage.getItem("Join")).userName;
  }
  document.getElementById('person-logged-name').textContent = userName;
}

/**
 * This function update the summary task
 */
function updatingSummaryData(){
  let tasksArray = Object.values(tasks);
  let tasksCount = tasksArray.length;
  let toDoCount = countTaskSummary(tasksArray, 1);
  let progressCount = countTaskSummary(tasksArray, 2);
  let awaitCount = countTaskSummary(tasksArray, 3);
  let doneCount = countTaskSummary(tasksArray, 4);
  let urgentTaskCount = countTaskUrgent(tasksArray);
  let closerUrgentDate = calculateDatePrio();
  let dateFormat = changeDateFormat(closerUrgentDate)
  document.getElementById('quantity-task').textContent = `${toDoCount}`;
  document.getElementById('quantity-done').textContent = `${doneCount}`;
  document.getElementById('progress-in-task').textContent = `${progressCount}`;
  document.getElementById('progress-awaiting-feedback').textContent = `${awaitCount}`;
  document.getElementById('task-in-board').textContent = `${tasksCount}`;
  document.getElementById('quantity-urgent').textContent = `${urgentTaskCount}`;
  document.getElementById('date-urgent').textContent = `${dateFormat}`;
}

/**
 * This function count different value, dependes of the parameters.
 * @param {Array} tasksArray - The array tasks
 * @param {number} state This the number of the status of the Task
 * @returns 
 */
function countTaskSummary(tasksArray, state){
  let allTasks = tasksArray.filter(filterTasks);
  let taskLength = allTasks.length;
  return taskLength;

  function filterTasks(task){
    return task.status == state;
  }
}

/**
 * This function count how many urgent tasks are
 * @param {Array} tasksArray - That is the array tasks
 * @returns - count of tasks with the priotity: urgent
 */
function countTaskUrgent(tasksArray){
  let allTasks = tasksArray.filter(tasksUrgent);
  let urgentLength = allTasks.length;
  return urgentLength;

  function tasksUrgent(task){
    return task.priorityTask == "urgent";
  }
}

/**
 * This function return the closer urgent date of the task
 * @returns The closer Date
 */
function calculateDatePrio() {
  let allTask = Object.values(tasks);
  let datesArray = allTask.map(date => date.timeDeadlineTask);
  const today = new Date();
  // Initialize variables for the nearest date and the minimum difference
  let dateCloser = null;
  let minimunDiferenceDate = Infinity;

  datesArray.map(date => {
    const currentDate = new Date(date);
    const difference = diferenciaEnDias(currentDate, today);
    // Update if we find a date with a smaller difference
    if (difference < minimunDiferenceDate) {
      minimunDiferenceDate = difference;
      dateCloser = date;
    }
  });
  console.log(dateCloser);
  return dateCloser;
}

/**
 * Function to calculate the difference in days between two dates
 * @param {Date} date1 - First Date to compare
 * @param {Date} date2 - First Date to compare
 * @returns 
 */
function diferenciaEnDias(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in a day
  return Math.abs((date1 - date2) / oneDay);
}

/**
 * This function change the Format of the Date
 * @param {Date} dateToChange - That date that it will be reformate
 * @returns - That is the date in a new Format
 */
function changeDateFormat(dateToChange){
  const date = new Date(dateToChange);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  // get day, month and year
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  // Formating date
  const dateFormate = `${month} ${day}, ${year}`;
  return dateFormate;
}

