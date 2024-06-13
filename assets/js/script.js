/**
 * This Function load all elements from contacts and tasks
 * @param {string} path - That is the name of the File in the Data Base
 * where the elements saved are.
 */
async function loadData(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  let responseToJson = await response.json();
  if (path == "contacts") {
    if(!responseToJson){
      contacts = [];
    }else{
      contacts = responseToJson;
    }
    console.log(contacts);
  } 
  if (path == "tasks") {
      tasks = responseToJson;
  }
}


let userData = readLoggedInUser();
// document.getElementById('userInitial').innerHTML = userData.initials;
document.getElementById('header').innerHTML += /* HTML */ `
<h1>Kanban Project Management Tool</h1>
<div class="headerIcons">
<a href="./help.html"><img src="./assets/img/help_icon.svg" alt=""></a>
<a onclick="openHeaderMenu()"><span id="userInitial" class="profile">${userData.initials}</span></a>
</div> 
<div id="headerMenu" class="d-none">
    <a href="./legal_notice.html">Legal Notice</a>
    <a href="./pripo.html">Privacy Policy</a>
    <a href="#" onclick="logout()">Log out</a>
</div>
`;

function openHeaderMenu() {
   document.getElementById('headerMenu').classList.toggle('d-none');
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
      body: JSON.stringify(data)
  });
  return (responseToJson = await response.json());
}

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
 * This function show a pop up with an error. The user can know, what he did wrong.
 * @param {string} idContainer - This is the id of the container where the pop up is.
 * @param {string} idPopUp - This the id of the pop up.
 * @param {string} messageError - That is the error 
 */
function showError(idContainer, idPopUp, messageError){
  document.getElementById(`${idContainer}`).classList.add('error');
  document.getElementById(`${idPopUp}`).innerHTML = /*html*/ `
  ${messageError} <img class="closeDialog" src="./assets/img/close_icon.svg" alt="close button"> 
  `;
}

/**
 * That function hidde the pop where the error was showed
 * @param {*} idContainer - This is the id of the container where the pop up is.
 * @param {*} idPopUp - This the id of the pop up.
 */
function hiddeError(idContainer, idPopUp){
  document.getElementById(`${idContainer}`).classList.remove('error');
  document.getElementById(`${idPopUp}`).innerHTML = "";
}
