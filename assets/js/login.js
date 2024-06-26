loadData("contacts");

/**
 * Login in as Guest and save session in localStorage or sessionStorage depending on remember me check
 */
function loginGuest() {
  let checked = document.getElementById("confirm").checked;
  let logData = {
    "mail": "guest@test.de",
    "initials": "G",
    "userName": "Guest",
  };
  if (checked) {
    localStorage.setItem("Join", JSON.stringify(logData));
    sessionStorage.clear();
  } else {
    sessionStorage.setItem("Join", JSON.stringify(logData));
    localStorage.clear();
  }
  location.href = "./summary.html";
}

/**
 * Login in user and save session in localStorage or sessionStorage depending on remember me check
 */
function login() {
  let email = document.getElementById("email").value.trim();
  let password = String(document.getElementById("password").value.trim());
  let credentials = 0;

  if (password == "") {
    document.getElementById("password").classList.add("inputRedBorder");
    document.getElementById("passwordError").innerHTML = "Password is required!";
  } else {
    document.getElementById("password").classList.remove("inputRedBorder");
    document.getElementById("mailError").innerHTML = "";
    credentials++;
  }

  if (email == "") {
    document.getElementById("email").classList.add("inputRedBorder");
    document.getElementById("mailError").innerHTML = "Email is required!";
  } else {
    document.getElementById("email").classList.remove("inputRedBorder");
    document.getElementById("mailError").innerHTML = "";
    credentials++;
  }

  if (credentials == 2) {
    let checked = document.getElementById("confirm").checked;
    let contact = Object.values(contacts);
    let results = contact.filter((element) => element.email == email && element.password == password && element.user);
    if (results.length > 0) {
      let initial = getInitials(results[0].name);
      let logData = {
        "mail": email,
        "initials": initial,
        "userName": results[0].name,
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
      let results = contact.filter((element) => element.email == email && element.user);
      if (results.length == 0) {
        document.getElementById("email").classList.add("inputRedBorder");
        document.getElementById("mailError").innerHTML = "Email adress is not registered as user!";
      } else {
        document.getElementById("email").classList.remove("inputRedBorder");
        document.getElementById("mailError").innerHTML = "";
      }
      results = contact.filter((element) => element.email == email && element.password == password && element.user);
      if (results.length == 0) {
        document.getElementById("password").classList.add("inputRedBorder");
        document.getElementById("passwordError").innerHTML = "Password incorrect!";
      } else {
        document.getElementById("password").classList.remove("inputRedBorder");
        document.getElementById("passwordError").innerHTML = "";
      }
      document.getElementById("password").classList.add("inputRedBorder");
    }
  }
}
