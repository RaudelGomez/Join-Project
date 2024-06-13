

let userData = readLoggedInUser();
// document.getElementById('userInitial').innerHTML = userData.initials;
document.getElementById('header').innerHTML += /* HTML */ `
<h1>Kanban Project Management Tool</h1>
<div class="headerIcons">
<a href="./help.html"><img src="./assets/img/help_icon.svg" alt=""></a>
<a onclick="openHeaderMenu()"><span id="userInitial" class="profile">${userData.initials}</span></a>
</div> 
<div id="headerMenu" class="d-none">
    <a href="./legal_notice.html">Legal Notice</a>
    <a href="./pripo.html">Privacy Policy</a>
    <a href="#" onclick="logout()">Log out</a>
</div>
`;

function openHeaderMenu() {
   document.getElementById('headerMenu').classList.toggle('d-none');
}

function logout() {

    sessionStorage.clear();
    localStorage.clear();
    location.href = "./index.html";
}
