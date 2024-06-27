/**
 * That function init the Variables from FireBase
 */
async function init() {
  await loadData("contacts");
}

/**
 * This function does the button submit available when every field ared fulled
 */
function checkAllFieldFull() {
  let nameIdSignUp = document.getElementById("nameIdSignUp").value;
  let emailIdSignUp = document.getElementById("emailIdSignUp").value;
  let passwordIdSignUp = document.getElementById("passwordIdSignUp").value;
  let passwordConfirmIdSignUp = document.getElementById("passwordConfirmIdSignUp").value;
  let confirmSignUp = document.getElementById("confirmSignUp").checked;
  if (
    nameIdSignUp != "" &&
    emailIdSignUp !== "" &&
    passwordIdSignUp !== "" &&
    passwordConfirmIdSignUp != "" &&
    passwordConfirmIdSignUp != "" &&
    confirmSignUp != false
  ) {
    document.getElementById("btn-signUp").classList.remove("btn-disabled");
  } else {
    document.getElementById("btn-signUp").classList.add("btn-disabled");
  }
}

/**
 * This function register a User
 */
async function registUser() {
  let nameIdSignUp = document.getElementById("nameIdSignUp");
  let emailIdSignUp = document.getElementById("emailIdSignUp");
  let isEmail = validateEmail(emailIdSignUp.value);
  let passwordIdSignUp = document.getElementById("passwordIdSignUp");
  let passwordConfirmIdSignUp = document.getElementById("passwordConfirmIdSignUp");
  let confirmSignUp = document.getElementById("confirmSignUp");
  let contact = {
    "name": nameIdSignUp.value,
    "email": emailIdSignUp.value,
    "phone": "",
    "user": true,
    "password": passwordIdSignUp.value,
    "color": await setColorUser(),
  };
  removeAllError('nameIdSignUp', 'emailIdSignUp', 'passwordIdSignUp', 'passwordConfirmIdSignUp');
  if (confirmSignUp.checked) {
    if (nameIdSignUp.value != "" && emailIdSignUp.value != "" && validateEmail(emailIdSignUp.value) && passwordIdSignUp.value != "" && passwordConfirmIdSignUp.value != "" && passwordIdSignUp.value === passwordConfirmIdSignUp.value) {
      await addNewUserDataBase(contact, nameIdSignUp, emailIdSignUp, passwordIdSignUp, passwordConfirmIdSignUp, confirmSignUp);
      await loadData("contacts");
      showAlert("container-signUp-alert", "signUp-alert", "Success", "succes-alert", "The user was added successfully!");
    } else {
      areAllFieldFilled('nameIdSignUp', 'emailIdSignUp', 'passwordIdSignUp', 'passwordConfirmIdSignUp', isEmail);
      if(!checkPassword(passwordIdSignUp.value, passwordConfirmIdSignUp.value)){
        validationFieldSignUp('passwordConfirmIdSignUp', "Ups! Your password do not match")
      }
    }
  }
}

/**
 * That function is a condiction to save a person in the Data base/contact
 * @param {object} contact The Person Data
 * @param {*} nameIdSignUp - That is the HTML input=name
 * @param {*} emailIdSignUp - That is the HTML input=email
 * @param {*} passwordIdSignUp - That is the HTML input=password
 * @param {*} passwordConfirmIdSignUp - That is the HTML input=confirmPassword
 * @param {*} confirmSignUp - That is the HTML input=checkbox/confirm term
 */
async function addNewUserDataBase(contact, nameIdSignUp, emailIdSignUp, passwordIdSignUp, passwordConfirmIdSignUp, confirmSignUp) {
    await postData(contact, "contacts");
    nameIdSignUp.value = "";
    emailIdSignUp.value = "";
    passwordIdSignUp.value = "";
    passwordConfirmIdSignUp.value = "";
    confirmSignUp.checked = false;
    setTimeout(() => (location.href = "./index.html"), 2000);
}

/**
 * This function add all error message of the page if there is a field that was not filled correctly
 * @param {string} nameIdSignUp - id of the container
 * @param {string} emailIdSignUp - id of the container
 * @param {string} passwordIdSignUp - id of the container
 * @param {string} passwordConfirmIdSignUp - id of the container
 * @param {boolean} isEmail - check if the field email is an email
 */
function areAllFieldFilled(nameIdSignUp, emailIdSignUp, passwordIdSignUp, passwordConfirmIdSignUp, isEmail) {
  if(document.getElementById(nameIdSignUp).value == ""){
    validationFieldSignUp(nameIdSignUp, "This field is required");
  }
  if(document.getElementById(emailIdSignUp).value == "" || !isEmail){
    validationFieldSignUp(emailIdSignUp, "This field is not a email");
  }
  if(document.getElementById(passwordIdSignUp).value == ""){
    validationFieldSignUp(passwordIdSignUp, "This field is required");
  }
  if(document.getElementById(passwordConfirmIdSignUp).value == ""){
    validationFieldSignUp(passwordConfirmIdSignUp, "This field is required");
  }
}

/**
 * This function remove all error message of the page
 * @param {string} nameIdSignUp - id of the container
 * @param {string} emailIdSignUp - id of the container
 * @param {string} passwordIdSignUp - id of the container
 * @param {string} passwordConfirmIdSignUp - id of the container
 */
function removeAllError(nameIdSignUp, emailIdSignUp, passwordIdSignUp, passwordConfirmIdSignUp) {
    removeErrorFieldSignUp(nameIdSignUp)
    removeErrorFieldSignUp(emailIdSignUp)
    removeErrorFieldSignUp(passwordIdSignUp)
    removeErrorFieldSignUp(passwordConfirmIdSignUp)
}

/**
 * This function add one error message of the page
 * @param {string} idCheck - id of the container
 * @param {string} message -  message error to show
 */
function validationFieldSignUp(idCheck, message) {
  let id = document.getElementById(`${idCheck}`);
  id.nextElementSibling.textContent = message;
  id.classList.add('inputRedBorder');
}

/**
 * This function remove one error message of the page
 * @param {string} idCheck - id of the container 
 */
function removeErrorFieldSignUp(idCheck) {
  let id = document.getElementById(`${idCheck}`);
  id.nextElementSibling.textContent = "";
  id.classList.remove('inputRedBorder');
}

/**
 * This function check if the 2 password are the same
 * @param {string} password - password
 * @param {string} checkPassword - confirm the first password
 * @returns 
 */
function checkPassword(password, checkPassword) {
  if(password !== checkPassword){
    return false;
  }else{
    return true;
  }
}



