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

  if (confirmSignUp.checked) {
    if (
      passwordIdSignUp.value === passwordConfirmIdSignUp.value &&
      passwordIdSignUp.value != "" &&
      passwordConfirmIdSignUp.value != ""
    ) {
      await addNewUserDataBase(
        contact,
        nameIdSignUp,
        emailIdSignUp,
        passwordIdSignUp,
        passwordConfirmIdSignUp,
        confirmSignUp
      );
      await loadData("contacts");
    } else {
      //Show pop up error
      showAlert("container-signUp-alert", "signUp-alert", "Error", "error-alert", "Password incorrect!");
    }
  } else {
    showAlert("container-signUp-alert", "signUp-alert", "Error", "error-alert", "Please accept the Privacy Policy!");
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
async function addNewUserDataBase(
  contact,
  nameIdSignUp,
  emailIdSignUp,
  passwordIdSignUp,
  passwordConfirmIdSignUp,
  confirmSignUp
) {
  if (!checkMail(`${contact.email}`)) {
    await postData(contact, "contacts");
    await loadData("contacts");
    showAlert("container-signUp-alert", "signUp-alert", "Success", "succes-alert", "You have registered successfully!");
    nameIdSignUp.value = "";
    emailIdSignUp.value = "";
    passwordIdSignUp.value = "";
    passwordConfirmIdSignUp.value = "";
    confirmSignUp.checked = false;
    setTimeout(() => (location.href = "./index.html"), 2000);
  } else {
    //Show pop error
    showAlert("container-signUp-alert", "signUp-alert", "Error", "error-alert", "This user already exist!");
  }
}
