/**
 * This Function load all elements from contacts and tasks
 * @param {string} path - That is the name of the File in the Data Base
 * where the elements saved are.
 */
async function loadData(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  responseToJson = await response.json();
  if (path == "contacts") {
      contacts = responseToJson;
  } if (path == "tasks") {
      tasks = responseToJson;
  }
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
