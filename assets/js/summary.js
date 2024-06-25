/**
 * This Function render the Summary page
 */
async function initSummary(){
  await loadData('tasks');
  getTimeOfDay();
  loadLocalStorage();
  updatingSummaryData();
}

/**
 * Initializing the Summary Page 
 */
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
    userName = JSON.parse(localStorage.getItem("Join")).userName;
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
  let dateFormat;
  dateFormat = setDateFormat(closerUrgentDate); 
  document.getElementById('quantity-task').textContent = `${toDoCount}`;
  document.getElementById('quantity-done').textContent = `${doneCount}`;
  document.getElementById('progress-in-task').textContent = `${progressCount}`;
  document.getElementById('progress-awaiting-feedback').textContent = `${awaitCount}`;
  document.getElementById('task-in-board').textContent = `${tasksCount}`;
  document.getElementById('quantity-urgent').textContent = `${urgentTaskCount}`;
  document.getElementById('date-urgent').innerHTML = `${dateFormat}`;
}

/**
 * This function return a Date of the closer and urgent task.
 * @param {date} closerUrgentDate - That is the closer Date to the actual Date that is urgent
 * @returns - Date format
 */
function setDateFormat(closerUrgentDate) {
  let dateFormat;
  if(closerUrgentDate){
    dateFormat = changeDateFormat(closerUrgentDate);
  }else{
    dateFormat = "No urgent task";
  }
  return dateFormat;
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
  let allTasks = tasksArray.filter(task => task.priorityTask == "urgent" && task.status != 4);
  let urgentLength = allTasks.length;
  return urgentLength;
}

/**
 * This function return the closer urgent date of the task
 * @returns The closer Date
 */
function calculateDatePrio() {
  let allTask = Object.values(tasks);
  let allTaskPrio = allTask.filter(task=> task.priorityTask == "urgent" && task.status != 4);
  let datesArray = allTaskPrio.map(date => date.timeDeadlineTask);
  const today = new Date();
  // Initialize variables for the nearest date and the minimum difference
  let dateCloser = null;
  let minimunDiferenceDate = Infinity;
  if (datesArray.length >= 1) {
    datesArray.forEach(date => {
      const currentDate = new Date(date);
      // Only consider dates that are today or in the future
      if (currentDate >= today) {
        const difference = calculateDays(currentDate, today);
        // Update if we find a date with a smaller difference
        if (difference < minimunDiferenceDate) {
          minimunDiferenceDate = difference;
          dateCloser = date;
        }
      }
    });
    return dateCloser;
  }else{
    return null;
  }
}

/**
 * Function to calculate the difference in days between two dates
 * @param {Date} date1 - First Date to compare
 * @param {Date} date2 - First Date to compare
 * @returns 
 */
function calculateDays(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in a day
  return Math.floor((date1 - date2) / oneDay);
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

