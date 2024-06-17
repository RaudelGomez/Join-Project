getTimeOfDay();
loadLocalStorage();

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

