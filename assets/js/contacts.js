/**
 * This function add a new contact in the contact page
 * Button: id # add new contact
 */
function addContact() {
  let nameContact = document.getElementById("nameContact");
  let emailContact = document.getElementById("emailContact");
  let phoneContact = document.getElementById("phoneContact");
  let contact = {
      "name": nameContact.value,
      "email": emailContact.value,
      "phone": phoneContact.value,
      "user": false,
      "id":"",
      "password": "",
  }
  contacts.push(contact);
}