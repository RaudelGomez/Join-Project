let userData = readLoggedInUser();
renderHeader(userData);

/**
 * This function returns the Initials of any given name
 * @param {string} name - The name to get the initials for
 * @returns - Returns the Initials in uppercase Letters
 */
function getInitials(name) {
  let initials = name.split(" ");
  let initial = initials[0].charAt(0);
  if (initials[1]) {
    initial += initials[1].charAt(0);
  }
  return initial.toUpperCase();
}

/**
 * This function is to close the popup window (animated)
 */
function closeDialog() {
  document.getElementById("dialog").classList.remove("animate__fadeIn");
  document.getElementById("dialog").classList.add("animate__fadeOut");
  document.getElementById("dialog").classList.add("d-none");
  document.getElementById("innerDialog").classList.add("animate__slideOutRight");
  document.getElementById("innerDialog").classList.remove("animate__slideInRight");
  document.getElementById("dialog").classList.add("d-none");
  // setTimeout(() => {
  //   document.getElementById("dialog").classList.add("d-none");
  // }, 500);
  document.body.classList.remove("noscroll");
}

function closeDropDownAssignUser() {
  //Close dropdown assigned to user
  let assignedTask = document.getElementById("assigned-task");
  if (assignedTask.classList.contains("assigned-task-show")) {
    assignedTask.classList.remove("assigned-task-show");
    assignedTask.classList.add("assigned-task-hidden");
  }
}

function closeTaskPop() {
  closeDialog();
  closeDropDownAssignUser();
  document.getElementById("addTaskPopup").classList.remove("mobile-version-only");
  // let assignedTask = document.getElementById("assigned-task");
  // assignedTask.classList.toggle("assigned-task-hidden");
  // assignedTask.classList.toggle("assigned-task-show");

  // showCheckboxes();
  if (document.getElementById("footer-button-addtask")) {
    document.getElementById("footer-button-addtask").classList.remove("position-relative");
  }
  currentTaskId = "";
  currentTask = "";
  deleteDataFormTask();
  document.getElementById("container-select-option").classList.remove("pointer-none");
  //Setting button Create Task again after close form edit
  document.getElementById("btn-clear-add-Task").classList.remove("d-none");
  let footerButtonAddTask = document.getElementById("footer-button-addtask");
  footerButtonAddTask.firstElementChild.classList.remove("d-none");
  footerButtonAddTask.classList.remove("justify-end");
  let btnCreatetask = document.getElementById("btn-create-task");
  btnCreatetask.firstElementChild.textContent = "Create Task";
  btnCreatetask.classList.remove("btn-edit-task");

  if (document.getElementById("addTaskPopup")) {
    let firstChild = document.getElementById("addTaskPopup").firstElementChild;
    firstChild.innerHTML = "Add Task";
  }
}

/**
 * This function is to protect some pages from any access when user is not logged in
 * @returns - Returns the Name, Initials and username of the logged in user.
 */
function readLoggedInUser() {
  let initials;
  let mail;
  let userName;
  let protectedPages = [
    "board.html",
    "contacts.html",
    "summary.html",
    "add_task.html",
    "board",
    "contacts",
    "summary",
    "add_task",
  ];
  if (localStorage.getItem("Join")) {
    // console.log("test");
    initials = JSON.parse(localStorage.getItem("Join")).initials;
    mail = JSON.parse(localStorage.getItem("Join")).mail;
    userName = JSON.parse(sessionStorage.getItem("Join")).userName;
    loggedIn = true;
  }
  if (sessionStorage.getItem("Join")) {
    initials = JSON.parse(sessionStorage.getItem("Join")).initials;
    mail = JSON.parse(sessionStorage.getItem("Join")).mail;
    userName = JSON.parse(sessionStorage.getItem("Join")).userName;
    loggedIn = true;
  }
  let page = window.location.href.substring(window.location.href.lastIndexOf("/") + 1);
  setTimeout(setActiveMenueLinks, 200);

  if (!loggedIn && protectedPages.includes(page)) {
    location.href = "./index.html";
  }
  return {
    mail: mail,
    initials: initials,
    name: userName,
  };
}

function setActiveMenueLinks() {
  let page = window.location.href.substring(window.location.href.lastIndexOf("/") + 1);
  switch (page) {
    case "summary.html":
      document.getElementById("summaryLink").classList.add("active");
      break;

    case "add_task.html":
      document.getElementById("addTaskLink").classList.add("active");
      break;

    case "board.html":
      document.getElementById("boardLink").classList.add("active");
      break;

    case "contacts.html":
      document.getElementById("contactsLink").classList.add("active");
      break;

    case "pripo.html":
      document.getElementById("privacyPolicy").classList.add("active");
      break;

    case "legal_notice.html":
      document.getElementById("legalNotice").classList.add("active");
      break;
  }
}

/**
 * This Function load all elements from contacts and tasks
 * @param {string} path - That is the name of the File in the Data Base
 * where the elements saved are.
 */
async function loadData(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  let responseToJson = await response.json();
  if (path == "contacts") {
    !responseToJson ? (contacts = []) : (contacts = responseToJson);
  }
  if (path == "tasks") {
    !responseToJson ? (tasks = []) : (tasks = responseToJson);
  }
}

/**
 * Render the Header with Main title, profile logo of logged in user and dropdown menu
 * @param {Object} userData - Contains mail, initials and username of logged in user
 */
function renderHeader(userData) {
  if (document.getElementById("header")) {
    if (userData.initials == undefined) {
      document.getElementById("header").innerHTML = /* HTML */ `<h1>Kanban Project Management Tool</h1>`;
    } else {
      document.getElementById("header").innerHTML = /* HTML */ `
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
      `;
    }
  }
}

/**
 * simple tiny function to toggle the profile menu on the upper right side
 */
function openHeaderMenu() {
  document.getElementById("headerMenu").classList.toggle("d-none");
}

/**
 * Just logout and clear session- and localestorage
 */
function logout() {
  sessionStorage.clear();
  localStorage.clear();
  location.href = "./index.html";
}

/**
 * That function save a person in the data base in contact file
 * @param {object} data - That is the whole element to save
 * @param {string} path - That is the name of the File in the Data Base
 * where that element will be saved.
 * @returns
 */
async function postData(data = {}, path = "") {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "POST",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return (responseToJson = await response.json());
}

/**
 * This function replace al info in this path with the new info sent.
 * @param {object} data - That is the object that has all info of the Data to change
 * @param {string} path - That is the folder in Firebase of the data to change
 * @returns the object with all data in this path
 */
async function putData(data, path = "") {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return (responseToJSON = await response.json());
}

/**
 * This function delete a task in the data bank Firebase
 * @param {string} path - That is the folder in Firebase of the data to delete
 * @returns returns the deleted item
 */
async function deleteData(path = "") {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "DELETE",
  });
  return (responseToJSON = await response.json());
}

/**
 * This function show a pop up with a message. The user can know, what he must do.
 * @param {string} idContainer - This is the id of the container where the pop up is.
 * @param {string} idPopUp - This the id of the pop up.
 * @param {string} messageError - That is the error
 */
function showAlert(idContainer, idPopUp, typeMessage, classMsg, message) {
  document.getElementById(`${idContainer}`).classList.add("error");
  document.getElementById(`${idPopUp}`).innerHTML = /*html*/ `
  <h3 class="${classMsg}">${typeMessage}</h3>
  <p>${message}</p>
  `;
  setTimeout(() => {
    hiddeAlert(idContainer, idPopUp);
  }, 2000);
}

/**
 * That function hidde the pop where the alert was showed
 * @param {*} idContainer - This is the id of the container where the pop up is.
 * @param {*} idPopUp - This the id of the pop up.
 */
function hiddeAlert(idContainer, idPopUp) {
  document.getElementById(`${idContainer}`).classList.remove("error");
  document.getElementById(`${idPopUp}`).innerHTML = "";
}

/**
 * This function check, if there is someone with this email
 * @param {string} email - This is the Email, that it will be validated
 * @returns The Object of the person, who was find or undefined if it was any person with that email.
 */
function checkMail(email) {
  let data = Object.values(contacts);
  let mailFound = data.find((user) => user.email == email);
  return mailFound;
}

/**
 * Thisfunction give a color to the user who was created.
 * @returns - Return the index of the color that was given in the array colors in data.js
 */
async function setColorUser() {
  let contactLength = Object.values(contacts).length;
  let indexColor = contactLength % colors.length;
  return indexColor;
}
