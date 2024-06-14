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
  let initial = initials[0].charAt(0);  
  if (initials[1]) {
    initial+= initials[1].charAt(0);
  }  
  return initial.toUpperCase();
}



function login() {
  let email = document.getElementById("email").value;
  let password = String(document.getElementById("password").value);
  let checked = document.getElementById("confirm").checked;
  let contact = Object.values(contacts);
  let results = contact.filter((element) => element.email == email && element.password == password && element.user);
  if (results.length > 0) {
    console.log(results);
    // console.log("Sie sind angemeldet!");
    let initial = getInitials(results[0].name);
    let logData = {
      "mail": email,
      "initials": initial,
      "userName": results[0].name
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
    
    if (localStorage.getItem("Join")) {
      initials = JSON.parse(localStorage.getItem("Join")).initials;
      mail = JSON.parse(localStorage.getItem("Join")).mail;
      loggedIn = true;
    }
  
    if (sessionStorage.getItem("Join")) {
      initials = JSON.parse(sessionStorage.getItem("Join")).initials;
      mail = JSON.parse(sessionStorage.getItem("Join")).mail;
      userName = JSON.parse(sessionStorage.getItem("Join")).userName;
      loggedIn = true;
    }
    if (!loggedIn) {

        location.href = "./index.html";
    }
    return {
      mail: mail,
      initials: initials,
      name: userName
    };
  }


