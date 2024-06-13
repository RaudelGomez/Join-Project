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
        "id": idCurrentContact,
        "password": passwordIdSignUp.value,
    }
    if (passwordIdSignUp.value === passwordConfirmIdSignUp.value && confirmSignUp.checked == true) {
        contacts.push(contact);
        idCurrentContact++
        nameIdSignUp.value = "";
        emailIdSignUp.value = "";
        passwordIdSignUp.value = "";
        passwordConfirmIdSignUp.value = "";
        confirmSignUp.checked = false;
    } else {
        alert("Password incorrect!")
    }
}


