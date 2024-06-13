/**
 * That function init the Variables from FireBase
 */
async function init() {
    await loadData("contacts");
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
        "id": "",
        "password": passwordIdSignUp.value,
    }
    if(nameIdSignUp.value == "" || emailIdSignUp.value == "" || passwordIdSignUp =="" || passwordConfirmIdSignUp == "" || confirmSignUp.checked == false){
        showError("container-signUp-error", "signUp-error", "You have to fill all Field!");
        return
    }
    if (passwordIdSignUp.value === passwordConfirmIdSignUp.value && passwordIdSignUp.value != "" && passwordConfirmIdSignUp.value !="") {
        await addNewUserDataBase(contact, nameIdSignUp, emailIdSignUp, passwordIdSignUp, passwordConfirmIdSignUp, confirmSignUp); 
        await loadData("contacts");       
    } else {
        //Show pop up error
        showError("container-signUp-error", "signUp-error", "Password incorrect!");
    }
}

/**
 * This function check, if there is someone with this email
 * @param {string} email - This is the Email, that it will be validated
 * @returns The Object of the person, who was find or undefined if it was any person with that email.
 */
function checkMail(email) {
    let data = Object.values(contacts);
    let mailFound= data.find(user => user.email == email);
    return mailFound;
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
async function addNewUserDataBase(contact, nameIdSignUp, emailIdSignUp, passwordIdSignUp, passwordConfirmIdSignUp, confirmSignUp ) {
    if(!checkMail(`${contact.email}`)){
        await postData(contact, "contacts");
        nameIdSignUp.value = "";
        emailIdSignUp.value = "";
        passwordIdSignUp.value = "";
        passwordConfirmIdSignUp.value = "";
        confirmSignUp.checked = false;
    }else {
        //Show pop error
        showError("container-signUp-error", "signUp-error", "This user already exist!");
    }
}




