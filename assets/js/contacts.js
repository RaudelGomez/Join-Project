/**
 * This function add a new contact in the contact page
 * Button: id # add new contact
 */
async function addContact() {
  let nameContact = document.getElementById("name");
  let emailContact = document.getElementById("email");
  let phoneContact = document.getElementById("phone");
  if (nameContact && emailContact) {


  let contact = {
      "name": nameContact.value,
      "email": emailContact.value,
      "phone": phoneContact.value,
      "user": false,
      "id":"",
      "password": "",
  }
  await postData(contact, "contacts");
  loadData("contacts");
}
}

function clearForm(formid) {
  document.getElementById(formid).reset();
}





function renderContacts() {

  
}

function openNewContactPopup() {

  document.getElementById("innerDialog").classList.remove("d-none"); 
  document.getElementById("innerDialog").classList.remove("animate__slideOutRight");
  document.getElementById("innerDialog").classList.add("animate__slideInRight");
  document.getElementById("dialog").classList.add("animate__fadeIn");
  document.getElementById("dialog").classList.remove("animate__fadeOut");
  document.getElementById("dialog").classList.remove("d-none");
  document.body.classList.add("noscroll");  
  document.getElementById('contactPopupHeadline').innerHTML = 'Add contact';
  document.getElementById('contactPopupSubHeadline').classList.remove('d-none');  
  document.getElementById('contactSaveButton').innerHTML = 'Create contact';
  document.getElementById('cancelButtonText').innerHTML = 'Cancel';
  document.getElementById('cancelIcon').classList.remove('d-none');
  

  
}

function openEditContactPopup(i) {
  document.getElementById("innerDialog").classList.remove("d-none"); 
  document.getElementById("innerDialog").classList.remove("animate__slideOutRight");
  document.getElementById("innerDialog").classList.add("animate__slideInRight");
  document.getElementById("dialog").classList.add("animate__fadeIn");
  document.getElementById("dialog").classList.remove("animate__fadeOut");
  document.getElementById("dialog").classList.remove("d-none");
  document.body.classList.add("noscroll");  
  document.getElementById('contactPopupHeadline').innerHTML = 'Edit contact';
  document.getElementById('contactPopupSubHeadline').classList.add('d-none');
  document.getElementById('contactSaveButton').innerHTML = 'Save';
  document.getElementById('cancelButtonText').innerHTML = 'Delete';
  document.getElementById('cancelIcon').classList.add('d-none');

}

function closeDialog() {
  document.getElementById("dialog").classList.remove("animate__fadeIn");
  document.getElementById("dialog").classList.add("animate__fadeOut");
  document.getElementById("innerDialog").classList.add("animate__slideOutRight");
  document.getElementById("innerDialog").classList.remove("animate__slideInRight");
  setTimeout(() => {document.getElementById("dialog").classList.add("d-none")}, 500);
  document.body.classList.remove("noscroll");
}



