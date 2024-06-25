let contactDetails = {};
renderContacts();
loadData("tasks");

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
  document
    .getElementById("contactFormLeftButton")
    .setAttribute("onclick", "clearForm('addContactForm'); return false;");
  document.getElementById("addContactForm").setAttribute("onsubmit", "addContact(); return false;");
  clearForm("addContactForm");
  document.getElementById("profileIcon").innerHTML = /* HTML */ ` <img src="./assets/img/person_fill.svg" alt="" /> `;
}

async function openEditContactPopup(iconColor, contactName, contactMail, initials, results, phone, id) {
  document.getElementById("template").classList.remove("addContact");
  document.getElementById("template").classList.add("editContact");
  document.getElementById("profileIcon").innerHTML = /* HTML */ `
    <span id="popupInitials" class="profileIconBig" style="background-color: ${iconColor};">${initials}</span>
  `;
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

function openContactButtons() {
  document.getElementById("contactMobileEditButtons").classList.remove("d-none");
}

function closeContactMenu() {
  document.getElementById("contactMobileEditButtons").classList.add("d-none");
  if (window.innerWidth > 1100) {
    document.getElementById("contactDisplay").style.display = "unset";
  }
}

/**
 * Render ale contacts with alphabetic order in the list
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
      renderContacts.innerHTML += ` <h3>${letter}</h3>
    `;
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

function closeShowContact() {
  document.getElementById("contactDisplay").style.display = "none";
  closeContactMenu();
}

async function deleteContact(firebaseKey, contactMail) {
  await deleteData("/contacts/" + firebaseKey);
  const resultUrls = await findTaskUrlsByEmail(tasks, contactMail);
  deleteUserInTask(resultUrls);
  await loadData("tasks");
  renderContacts();
}

async function findTaskUrlsByEmail(tasks, email) {
  const urls = [];
  let key;
  let i;
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

async function deleteUserInTask(urls) {
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    await deleteData(url);
  }
}
