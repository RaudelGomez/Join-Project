function registUser() {
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
    if (passwordIdSignUp.value === passwordConfirmIdSignUp.value && confirmSignUp.checked == true) {
        postData(contact, "contacts");
        // idCurrentContact++;
        nameIdSignUp.value = "";
        emailIdSignUp.value = "";
        passwordIdSignUp.value = "";
        passwordConfirmIdSignUp.value = "";
        confirmSignUp.checked = false;
    } else {
        alert("Password incorrect!")
    }
}


async function postData(data = {}, path = "") {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "POST",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return (responseToJson = await response.json());
}

async function loadData(path = "") {
    let response = await fetch(BASE_URL + path + ".json");
    responseToJson = await response.json();
    if (path == "contacts") {
        contacts = responseToJson;
    } if (path == "tasks") {
        tasks = responseToJson;
    }
}


async function checkMail() {

    let data = await Object.values(contacts);
    //  let mailFound= data.find(element => element.email==mail);
    console.log(data);
}
loadData("contacts");