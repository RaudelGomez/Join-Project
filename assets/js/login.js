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
  location.href = "./summary.html?login=true";
}

/**
 * Login in user and save session in localStorage or sessionStorage depending on remember me check
 */
function login() {
  let email = document.getElementById("email").value.trim();
  let password = String(document.getElementById("password").value.trim());
  let credentials = 0;
  credentials = passwordValidation(password, credentials);
  credentials = validationEmail(email, credentials);
  checkingIfEmailAndPasswordExist(credentials, email, password);
}

/**
 * This function validate if the data that was introduced in the field exist in the data base
 * @param {number} credentials - 2 level of calification to messure if the 2 field email and passowrd are filled
 * @param {string} email - email to validate in data base
 * @param {string} password - password to validate in data base
 */
function checkingIfEmailAndPasswordExist(credentials, email, password) {
  if (credentials == 2) {
    let checked = document.getElementById("confirm").checked;
    let contact = Object.values(contacts);
    let results = contact.filter((element) => element.email == email && element.password == password && element.user);
    if (results.length > 0) {
      console.log('here');
      ifResultCredentialBigZero(checked, results, email);
    } else {
      let results = contact.filter((element) => element.email == email && element.user);
      filterEmailValidation(results);
      results = contact.filter((element) => element.email == email && element.password == password && element.user);
      filterEmailAndPassword(results);
      document.getElementById("password").classList.add("inputRedBorder");
    }
  }
}

/**
 * This function give a point if the password was filled, and let the function continue to the next validation
 * @param {string} password - password introduced 
 * @param {number} credentials - firt level of validation. If the password was given, then continue the function to the next validation
 * @returns 
 */
function passwordValidation(password, credentials) {
  let results = credentials;
  if (password == "") {
    document.getElementById("password").classList.add("inputRedBorder");
    document.getElementById("passwordError").innerHTML = "Password is required!";
  } else {
    document.getElementById("password").classList.remove("inputRedBorder");
    document.getElementById("mailError").innerHTML = "";
    results++;
  }
  return results;
}

/**
 * This function give a point if the password was filled, and let the function continue to the next validation
 * @param {string} email - Email introduced
 * @param {number} credentials - Second level of validation. If the password was given, then continue the function to the next validation 
 * @returns 
 */
function validationEmail(email, credentials) {
  let results = credentials;
  if (email == "") {
    document.getElementById("email").classList.add("inputRedBorder");
    document.getElementById("mailError").innerHTML = "Email is required!";
  } else {
    document.getElementById("email").classList.remove("inputRedBorder");
    document.getElementById("mailError").innerHTML = "";
    results++;
  }
  return results;
}

/**
 * This function save the info of the user in the local storage or session storage.
 * @param {boolean} checked - If the check rember me is true, will be in local storage saved like this the person dont have to introduce his data every time. If the checked is fals will be only in a session storage saved
 * @param {object} results - That is an object that has the info of the person that loged in
 * @param {string} email - Email of the person who loged in
 */
function ifResultCredentialBigZero(checked, results, email) {
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
  location.href = "./summary.html?login=true";
}

/**This function check if the Field email is filled
 * 2 level of calification to messure if the 2 field email and
 * @param {number} results - First level of calification to messure if the field email is filled
 */
function filterEmailValidation(results) {
  if (results.length == 0) {
    document.getElementById("email").classList.add("inputRedBorder");
    document.getElementById("mailError").innerHTML = "Email adress is not registered as user!";
  } else {
    document.getElementById("email").classList.remove("inputRedBorder");
    document.getElementById("mailError").innerHTML = "";
  }
}

/**This function check if the Field password is filled
 * Second level of calification to messure if the field password is filled
 * @param {*} results 
 */
function filterEmailAndPassword(results) {
  if (results.length == 0) {
    document.getElementById("password").classList.add("inputRedBorder");
    document.getElementById("passwordError").innerHTML = "Password incorrect!";
  } else {
    document.getElementById("password").classList.remove("inputRedBorder");
    document.getElementById("passwordError").innerHTML = "";
  }
}
