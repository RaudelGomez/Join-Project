loadData("contacts");

async function loadData(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  responseToJson = await response.json();
  if (path == "contacts") {
    contacts = responseToJson;
  }
  if (path == "tasks") {
    tasks = responseToJson;
  }
}

async function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let checked = document.getElementById("confirm").checked;
  let contact = Object.values(contacts);
  let results = contact.filter((element) => element.email == email && element.password == password && element.user);
  if (results.length > 0) {
    if (checked) {
      localStorage.setItem(email, true);
    } else {
      sessionStorage.setItem(email, true);
    }
    location.href = "./summary.html";
  } else {
    console.log("Email nicht bekannt oder Passwort falsch");
  }
}
