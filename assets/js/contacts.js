/**
 * This function add a new contact in the contact page
 * Button: id # add new contact
 */
<<<<<<< Updated upstream
async function addContact() {
  let nameContact = document.getElementById("name");
  let emailContact = document.getElementById("email");
  let phoneContact = document.getElementById("phone");
  if (nameContact.value && emailContact.value) {
    let contact = {
      "name": nameContact.value,
      "email": emailContact.value,
      "phone": phoneContact.value,
      "user": false,
      "id": "",
      "password": "",
    };
    let postSuccess = await postData(contact, "contacts");
    if (postSuccess) {
      showAlert("container-signUp-alert", "signUp-alert", "Success", "succes-alert", "Contact successfully created!");
      loadData("contacts");
      setTimeout(() => {
        closeDialog();
      }, 2000);
    }
  }
}

function editContact(i) {}

function deleteContact(i) {}

function clearForm(formid) {
  document.getElementById(formid).reset();
}

function renderContacts() {}

function openNewContactPopup() {
  document.getElementById("innerDialog").classList.remove("d-none");
  document.getElementById("innerDialog").classList.remove("animate__slideOutRight");
  document.getElementById("innerDialog").classList.add("animate__slideInRight");
  document.getElementById("dialog").classList.add("animate__fadeIn");
  document.getElementById("dialog").classList.remove("animate__fadeOut");
  document.getElementById("dialog").classList.remove("d-none");
  document.body.classList.add("noscroll");
  document.getElementById("contactPopupHeadline").innerHTML = "Add contact";
  document.getElementById("contactPopupSubHeadline").classList.remove("d-none");
  document.getElementById("contactSaveButton").innerHTML = "Create contact";
  document.getElementById("cancelButtonText").innerHTML = "Cancel";
  document.getElementById("cancelIcon").classList.remove("d-none");
  document.getElementById("addContactForm").setAttribute("onclick", "addContact(); return false;");
  clearForm("addContactForm");
}

function openEditContactPopup(i) {
  document.getElementById("innerDialog").classList.remove("d-none");
  document.getElementById("innerDialog").classList.remove("animate__slideOutRight");
  document.getElementById("innerDialog").classList.add("animate__slideInRight");
  document.getElementById("dialog").classList.add("animate__fadeIn");
  document.getElementById("dialog").classList.remove("animate__fadeOut");
  document.getElementById("dialog").classList.remove("d-none");
  document.body.classList.add("noscroll");
  document.getElementById("contactPopupHeadline").innerHTML = "Edit contact";
  document.getElementById("contactPopupSubHeadline").classList.add("d-none");
  document.getElementById("contactSaveButton").innerHTML = "Save";
  document.getElementById("cancelButtonText").innerHTML = "Delete";
  document.getElementById("cancelIcon").classList.add("d-none");
  document.getElementById("addContactForm").setAttribute("onclick", `editContact(${i}); return false;`);
  document.getElementById("contactFormLeftButton").setAttribute("onclick", `deleteContact(${i}); return false;`);
  getContactDetails(i);
}

function closeDialog() {
  document.getElementById("dialog").classList.remove("animate__fadeIn");
  document.getElementById("dialog").classList.add("animate__fadeOut");
  document.getElementById("innerDialog").classList.add("animate__slideOutRight");
  document.getElementById("innerDialog").classList.remove("animate__slideInRight");
  setTimeout(() => {
    document.getElementById("dialog").classList.add("d-none");
  }, 500);
  document.body.classList.remove("noscroll");
}

function getContactDetails(i) {
  const contactDetails = Object.values(contacts);
  const name = contactDetails[i]["name"];
  const email = contactDetails[i]["email"];
  const phone = contactDetails[i]["phone"];
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("phone").value = phone;
}
=======
function addContact() {
  let nameContact = document.getElementById("nameContact");
  let emailContact = document.getElementById("emailContact");
  let phoneContact = document.getElementById("phoneContact");
  let contact = {
    "name": nameContact.value,
    "email": emailContact.value,
    "phone": phoneContact.value,
    "user": false,
    "id": "",
    "password": "",
  }
  contacts.push(contact);
}


function renderContacts(i) {
  let renderContacts = document.getElementById(contactListID);
  renderContacts.innerHTML = "";

  for (let i = 0; i < contacts.length; i++) {
    renderContacts.innerHTML =
      `
  <div onclick="showContact(${i})" class="contactBox activeContact">
                <span class="profileSmall am">AM</span>
                <div class="contactDetails">
                  <div class="contactName">Anton Mayer</div>
                  <div class="contactMail">anton@gmail.com</div>
                </div>
              </div>
`;
  }
>>>>>>> Stashed changes
