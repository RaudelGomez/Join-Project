/**
 * This function add a new contact in the contact page
 * Button: id # add new contact
 */
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
      await loadData("contacts");
      setTimeout(() => {
        closeDialog();
      }, 2000);
    }
  }
}



function deleteContact(i) {}

function clearForm(formid) {
  document.getElementById(formid).reset();
}
let contactDetails = [];

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
  document.getElementById("addContactForm").setAttribute("onsubmit", "addContact(); return false;");
  clearForm("addContactForm");
}

function openEditContactPopup(contactName, contactMail,initials,results,phone,id) {
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
  let data = {
    "email": contactMail,
    "id":"",
    "name":contactName,
    "password":"",
    "phone":phone,
    "user":false 
  };

  document.getElementById("addContactForm").setAttribute("onsubmit", `await putData(${data},'/contacts/${results}'); return false;`);
  document.getElementById("contactFormLeftButton").setAttribute("onclick", `deleteContact('${results}'); return false;`);
// await putData( { like: 1000}, '/tasks/-O-_C8hoeXkD9TjC6O4y');
  document.getElementById('name').value =contactName;
  document.getElementById('email').value =contactMail;
  document.getElementById('phone').value =phone;


  // getContactDetails(i);
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

function addContact() {
  // console.log('addContact started...');
  let nameContact = document.getElementById("name");
  let emailContact = document.getElementById("email");
  let phoneContact = document.getElementById("phone");
   if (checkMail(emailContact) == undefined) {

alert('Mail exists');
   }
   else {
  let contact = {
    "name": nameContact.value,
    "email": emailContact.value,
    "phone": phoneContact.value,
    "user": false,
    "id": "",
    "password": "",
  }
  if (nameContact.value !="" && emailContact.value !="") {
    postData(contact, "contacts");
    renderContacts();
    closeDialog();
    // showAlert(idContainer, idPopUp, typeMessage, classMsg, 'Contact successfully created');
  }
}
 

}

async function renderContacts() {
  let renderContacts = document.getElementById("contactListID");
  renderContacts.innerHTML = "";
  await loadData("contacts");
 
  let contactDetails = Object.values(contacts);
  let contactKeys = Object.keys(contacts);
  // console.log(contactDetails);
  // console.log(contacts);
  contactDetails.sort((a,b)=>a.name.localeCompare(b.name));
  let lastLetter;
  
  for (let i = 0; i < contactDetails.length; i++) {
    // let id = Object.keys(contacts[i]);
    const contactName= contactDetails[i]["name"]; //At this command we will take the name and other attributes.
    const contactPhone= contactDetails[i]["phone"]; 
    const letter = Array.from(contactName)[0].toUpperCase();
    let initials= getInitials(contactName);
    // to make the Title for every single letter.
    if(letter != lastLetter){
    renderContacts.innerHTML+= 
    ` <h3>${letter}</h3>
    `;
    lastLetter=letter;
  } 
    const contactMail= contactDetails[i]["email"];
    let results = contactKeys[i];

    renderContacts.innerHTML +=
      `
  <div onclick="showContact('${contactName}','${contactMail}','${initials}','${results}','${contactPhone}',${i})" data-id="${results}" class="contactBox">
                <span class="profileSmall am">${initials}</span>
                <div class="contactDetails">
                  <div class="contactName">${contactName}</div>
                  <div class="contactMail">${contactMail}</div>
                </div>
              </div>
`;
  }}
  // loadData("contacts");

  renderContacts();


  function showContact(contactName, contactMail,initials,results,phone,id) {
    document.getElementById('contactName').innerHTML = contactName;
    document.getElementById('contactMail').innerHTML = contactMail;
    document.getElementById('contactPhone').innerHTML = phone;
    document.getElementById('initials').innerHTML = initials;
    document.getElementById('editButton').setAttribute('onclick',`openEditContactPopup('${contactName}', '${contactMail}','${initials}','${results}','${phone}',${id})`);
  
  }


  function editInnerContact(contactName, contactMail,initials,results,phone) {
    document.getElementById('name').innerHTML = contactName;
    document.getElementById('email').innerHTML = contactMail;
    document.getElementById('phone').innerHTML = phone;
    document.getElementById('initials').innerHTML = initials;
  }
  // console.log(contacts);
