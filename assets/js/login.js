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

function getInitials(name) {
  let initials = name.split(" ");
  let initial = initials[0].charAt(0) + initials[1].charAt(0);
  return initial.toUpperCase();
}



function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let checked = document.getElementById("confirm").checked;
  let contact = Object.values(contacts);
  let results = contact.filter((element) => element.email == email && element.password == password && element.user);
  if (results.length > 0) {
    console.log("Sie sind angemeldet!");
    let initial = getInitials(results[0].name);
    let logData = {
      "mail": email,
      "initials": initial,
    };
    if (checked) {
      localStorage.setItem("Join", JSON.stringify(logData));
      sessionStorage.clear();
    } else {
      sessionStorage.setItem("Join", JSON.stringify(logData));
      localStorage.clear();
    }
    location.href = "./summary.html";
  } else {
    console.log("Email nicht bekannt oder Passwort falsch");
  }
}

function readLoggedInUser() {
    let initials;
    let mail;
    let loggedIn = false;
    if (localStorage.getItem("Join")) {
      initials = JSON.parse(localStorage.getItem("Join")).initials;
      mail = JSON.parse(localStorage.getItem("Join")).mail;
      loggedIn = true;
    }
  
    if (sessionStorage.getItem("Join")) {
      initials = JSON.parse(sessionStorage.getItem("Join")).initials;
      mail = JSON.parse(sessionStorage.getItem("Join")).mail;
      loggedIn = true;
    }
    if (!loggedIn) {

        location.href = "./index.html";
    }
    return {
      mail: mail,
      initials: initials,
    };
  }


