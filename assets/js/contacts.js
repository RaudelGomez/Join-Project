let contactDetails = {};
renderContacts();
// loadData("tasks");

/**
 * This function add a new contact in the contact page
 * Button: id # add new contact
 */
async function addContact() {
  let nameContact = document.getElementById("name");
  let emailContact = document.getElementById("email");
  let phoneContact = document.getElementById("phone");
  let color = await setColorUser();
  if (nameContact.value && emailContact.value) {
    if (checkMail(emailContact.value) == undefined) {
      let contact = {
        "name": nameContact.value,
        "email": emailContact.value,
        "phone": phoneContact.value,
        "user": false,
        "password": "",
        "color": color,
      };
      let postSuccess = await postData(contact, "contacts");
      if (postSuccess) {
        showAlert("container-signUp-alert", "signUp-alert", "Success", "succes-alert", "Contact successfully created!");
        await renderContacts();
        setTimeout(() => {
          closeDialog();
        }, 2000);
      }
    } else {
      showAlert("container-signUp-alert", "signUp-alert", "Warning", "error-alert", "Email alreay exists!");
    }
  }
}

/**
 * This function resets all form elements
 * @param {string} formid - That is the ID of the Form
 */
function clearForm(formid) {
  document.getElementById(formid).reset();
}

/**
 * Open popup window for add new contact
 */
function openNewContactPopup() {
  document.getElementById("template").classList.add("addContact");
  document.getElementById("template").classList.remove("editContact");
  openPopup();
  changeContactPopup('Add');
  document
    .getElementById("contactFormLeftButton")
    .setAttribute("onclick", "clearForm('addContactForm'); return false;");
  document.getElementById("addContactForm").setAttribute("onsubmit", "addContact(); return false;");
  clearForm("addContactForm");
  document.getElementById("profileIcon").innerHTML = /* HTML */ ` <img src="./assets/img/person_fill.svg" alt="" /> `;
}

/**
 * Just open an animated popup
 */
function openPopup() {
  document.getElementById("innerDialog").classList.remove("d-none");
  document.getElementById("innerDialog").classList.remove("animate__slideOutRight");
  document.getElementById("innerDialog").classList.add("animate__slideInRight");
  document.getElementById("dialog").classList.add("animate__fadeIn");
  document.getElementById("dialog").classList.remove("animate__fadeOut");
  document.getElementById("dialog").classList.remove("d-none");
  document.body.classList.add("noscroll");
}

/**
 * Opens the popup for edit contact
 * @param {string} iconColor - The hexcode of the profile icon color
 * @param {string} contactName - the name of the contact
 * @param {string} contactMail - the mail of the contact
 * @param {string} initials - the initials of the contact
 * @param {string} results - the firebase key
 * @param {string} phone - the phone number of the contact
 * @param {integer} id - the index number of the sorted array
 */
async function openEditContactPopup(iconColor, contactName, contactMail, initials, results, phone, id) {
  document.getElementById("template").classList.remove("addContact");
  document.getElementById("template").classList.add("editContact");
  document.getElementById("profileIcon").innerHTML = /* HTML */ `
    <span id="popupInitials" class="profileIconBig" style="background-color: ${iconColor};">${initials}</span>
  `;
  openPopup();
  changeContactPopup('Edit');
  document
    .getElementById("addContactForm")
    .setAttribute("onsubmit", 'updateContact("' + results + '",' + id + "); return false;");
  document
    .getElementById("contactFormLeftButton")
    .setAttribute("onclick", `deleteContact('${results}','${contactMail}'); return false;`);
  document.getElementById("name").value = contactName;
  document.getElementById("email").value = contactMail;
  document.getElementById("phone").value = phone;
}

/**
 * Changes the Type of contact Popup (Edit or Add)
 * @param {string} popupType - Type of Popup (Headline "Edit contact" or "Add contact")
 */
function changeContactPopup(popupType) {
  document.getElementById("contactPopupHeadline").innerHTML = popupType + " contact";
  document.getElementById("contactPopupSubHeadline").classList.remove("d-none");
  document.getElementById("cancelIcon").classList.add("d-none");    
  if (popupType == "Add") {
    document.getElementById("contactSaveButton").innerHTML = "Create contact";
    document.getElementById("cancelButtonText").innerHTML = "Cancel";
  } else {
    document.getElementById("contactSaveButton").innerHTML = "Save";
    document.getElementById("cancelButtonText").innerHTML = "Delete"; 
  }
}

/**
 * This funtion updates the contact details after editing in the firebase db as well as on the display
 * @param {string} id - Firebase Key of the contact
 * @param {integer} index - Index Number of the sorted contacts array (contactDetails)
 */
async function updateContact(id, index) {
  let name = document.getElementById("name").value;
  let mail = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let color = contactDetails[index].color;
  let data = {
    "name": name,
    "email": mail,
    "phone": phone,
    "user": false,
    "password": "",
    "color": color,
  };
  let idString = `/contacts/${id}`;
  await putData(data, idString);
  closeDialog();
  document.getElementById("contactName").innerHTML = name;
  document.getElementById("contactPhone").innerHTML = phone;
  document.getElementById("contactMail").innerHTML = mail;
  document.getElementById("initials").innerHTML = getInitials(name);
  let initials = getInitials(name);
  document
    .getElementById("editButton")
    .setAttribute(
      "onclick",
      `openEditContactPopup('${color}','${name}', '${mail}','${initials}','${id}','${phone}',${index})`
    );
  document
    .getElementById("editButtonMobile")
    .setAttribute(
      "onclick",
      `openEditContactPopup('${color}','${name}', '${mail}','${initials}','${id}','${phone}',${index})`
    );
  renderContacts();
}

/**
 * Opens the small popup menu on mobile view with menu links for edit and delete contact
 */
function openContactButtons() {
  document.getElementById("contactMobileEditButtons").classList.remove("d-none");
}

/**
 * Closes the small popup menu on mobile view with menu links for edit and delete contact
 */
function closeContactMenu() {
  document.getElementById("contactMobileEditButtons").classList.add("d-none");
  if (window.innerWidth > 1100) {
    document.getElementById("contactDisplay").style.display = "unset";
  }
}

/**
 * Render all contacts with alphabetic order in the list
 */
async function renderContacts() {
  let renderContacts = document.getElementById("contactListID");
  renderContacts.innerHTML = "";
  await loadData("contacts");
  contactDetails = Object.values(contacts);
  let contactKeys = Object.keys(contacts);
  for (let i = 0; i < contactDetails.length; i++) {
    const element = contactDetails[i];
    element.key = contactKeys[i];
  }
  contactDetails.sort((a, b) => a.name.localeCompare(b.name));
  let lastLetter;
  for (let i = 0; i < contactDetails.length; i++) {
    const contactName = contactDetails[i]["name"];
    const contactPhone = contactDetails[i]["phone"];
    const contactKey = contactDetails[i]["key"];
    const contactMail = contactDetails[i]["email"];
    const iconColor = colors[contactDetails[i]["color"]].color;
    const letter = Array.from(contactName)[0].toUpperCase();
    const initials = getInitials(contactName);
    if (letter != lastLetter) {
      renderContacts.innerHTML += `<h3>${letter}</h3>`;
      lastLetter = letter;
    }
    let results = contactKey;
    renderContacts.innerHTML += /* HTML */ `
      <div
        onclick="showContact(this,'${iconColor}','${contactName}','${contactMail}','${initials}','${results}','${contactPhone}',${i})"
        class="contactBox">
        <span class="profileSmall" style="background-color: ${iconColor}">${initials}</span>
        <div class="contactDetails">
          <div class="contactName">${contactName}</div>
          <div class="contactMail">${contactMail}</div>
        </div>
      </div>
    `;
  }
}

/**
 * This function open and render the display of contact details
 * @param {element} contactElement - The element in the contactlist which calls this function (active class will be added)
 * @param {*} iconColor - the color of the profile icon
 * @param {*} contactName - the name of the contact
 * @param {*} contactMail - mail of the contact
 * @param {*} initials - initials of the contact
 * @param {*} results - Firebase Key
 * @param {*} phone - phone of the contact
 * @param {*} id - Index Number ot the sorted contacts array (contactDetails)
 */
function showContact(contactElement, iconColor, contactName, contactMail, initials, results, phone, id) {
  document
    .getElementById("editButton")
    .setAttribute(
      "onclick",
      `openEditContactPopup('${iconColor}','${contactName}', '${contactMail}','${initials}','${results}','${phone}',${id})`
    );
  document
    .getElementById("editButtonMobile")
    .setAttribute(
      "onclick",
      `openEditContactPopup('${iconColor}','${contactName}', '${contactMail}','${initials}','${results}','${phone}',${id})`
    );
  document.getElementById("openContactButtons").classList.remove("d-none");
  document.getElementById("contactDisplay").style.display = "unset";
  let contactElements = document.getElementsByClassName("contactBox");
  for (let i = 0; i < contactElements.length; i++) {
    contactElements[i].classList.remove("activeContact");
  }
  contactElement.classList.add("activeContact");
  document.getElementById("contactInfo").classList.remove("d-none");
  document.getElementById("contactName").innerHTML = contactName;
  document.getElementById("contactMail").innerHTML = contactMail;
  document.getElementById("contactPhone").innerHTML = phone;
  document.getElementById("initials").innerHTML = initials;
  document.getElementById("initials").style.backgroundColor = iconColor;
  document
    .getElementById("editButton")
    .setAttribute(
      "onclick",
      `openEditContactPopup('${iconColor}','${contactName}', '${contactMail}','${initials}','${results}','${phone}',${id})`
    );
  document.getElementById("deleteID").setAttribute("onclick", `deleteContact('${results}','${contactMail}') `);
  document.getElementById("deleteIDMobile").setAttribute("onclick", `deleteContact('${results}','${contactMail}') `);
}

/**
 * Close the Display of Contact details
 */
function closeShowContact() {
  document.getElementById("contactDisplay").style.display = "none";
  closeContactMenu();
}

/**
 * This function delete the contact and the assignment of tasks
 * @param {string} firebaseKey - Contains the FirebaseKey
 * @param {string} contactMail - Contains the Mailadress of the contact
 */
async function deleteContact(firebaseKey, contactMail) {
  await deleteData("/contacts/" + firebaseKey);
  const resultUrls = await findTaskUrlsByEmail(tasks, contactMail);
  deleteUserInTask(resultUrls);
  await loadData("tasks");
  renderContacts();
  location.href = "./contacts.html";
}

/**
 * Find all Tasks where the contact is assigned to and create Array with the urls
 * @param {array} tasks - Contains all tasks
 * @param {string} email - The Email adress of the contact
 * @returns
 */
async function findTaskUrlsByEmail(tasks, email) {
  const urls = [];
  let key, i;
  for (key in tasks) {
    if (tasks.hasOwnProperty(key)) {
      const task = tasks[key];
      if (task.nameAssignedTask && Array.isArray(task.nameAssignedTask)) {
        for (i = 0; i < task.nameAssignedTask.length; i++) {
          const assigned = task.nameAssignedTask[i];
          if (assigned.email === email) {
            const url = `/tasks/${key}/nameAssignedTask/${i}`;
            urls.push(url);
            task.nameAssignedTask.splice(i, 1);
          }
        }
      }
    }
  }
  return urls;
}

/**
 * This function delete the assignment of contact in tasks
 * @param {array} urls - contains the urls with all tasks where the contact is assigned to
 */
async function deleteUserInTask(urls) {
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    await deleteData(url);
  }
}
