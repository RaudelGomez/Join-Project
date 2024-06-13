/**
 * That function init the Variables from FireBase
 */
async function init() {
    await loadData("contacts");
}

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
        alert("You have to fill all Field!");
        return
    }
    if (passwordIdSignUp.value === passwordConfirmIdSignUp.value && passwordIdSignUp.value != "" && passwordConfirmIdSignUp.value !="") {
        await addNewUserDataBase(contact, nameIdSignUp, emailIdSignUp, passwordIdSignUp, passwordConfirmIdSignUp, confirmSignUp); 
        await loadData("contacts");       
    } else {
        //pop to show
        alert("Password incorrect!")
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
        //pop to show
        alert("User already exist!")
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


