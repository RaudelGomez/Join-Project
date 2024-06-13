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
