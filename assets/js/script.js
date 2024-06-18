let userData = readLoggedInUser();
renderHeader(userData);

function getInitials(name) {
  let initials = name.split(" ");
  let initial = initials[0].charAt(0);  
  if (initials[1]) {
    initial+= initials[1].charAt(0);
  }  
  return initial.toUpperCase();
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

function readLoggedInUser() {
  let initials;
  let mail;
  let userName;
  let protectedPages = ["board.html", "contacts.html", "summary.html", "add_task.html"];
  if (localStorage.getItem("Join")) {
    console.log('test');
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
  if (!loggedIn && protectedPages.includes(page)) {
    location.href = "./index.html";
  }

  return {
    mail: mail,
    initials: initials,
    name: userName
  };
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
    (!responseToJson) ? contacts = [] : contacts = responseToJson;
  }
  if (path == "tasks") {
    !responseToJson ? (tasks = []) : (tasks = responseToJson);
  }
}

function renderHeader(userData) {
  if (document.getElementById("header")) {
  if (userData.initials == undefined) {
    document.getElementById("header").innerHTML = /* HTML */ ` <h1>Kanban Project Management Tool</h1> `;
  } else {
    document.getElementById("header").innerHTML = /* HTML */ `
      <img id="mobileLogo" class="d-none" src="./assets/img/join_logo_dark.svg" alt="">
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

function openHeaderMenu() {
  document.getElementById("headerMenu").classList.toggle("d-none");
}

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
  }, 3000);
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
  let mailFound= data.find(user => user.email == email);
  return mailFound;
}

// function getInitials(name) {
//   let initials = name.split(" ");
//   let initial = initials[0].charAt(0);  
//   if (initials[1]) {
//     initial+= initials[1].charAt(0);
//   }  
//   return initial.toUpperCase();
// }

/**
 * Thisfunction give a color to the user who was created.
 * @returns - Return the index of the color that was given in the array colors in data.js
 */
async function setColorUser() {
  let contactLength = Object.values(contacts).length;
  let indexColor = (contactLength)% colors.length;
  return indexColor;    
}






