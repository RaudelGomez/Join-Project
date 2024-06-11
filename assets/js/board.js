  // Open Popup
  async function openDialog() {
    document.getElementById("dialog").classList.remove("d-none");
    document.body.classList.add("noscroll");
    document.getElementById("innerDialog").classList.remove("d-none"); 
  }

  function closeDialog() {
    document.getElementById("dialog").classList.add("d-none");
    document.getElementById("innerDialog").classList.add("d-none");
    document.body.classList.remove("noscroll");
  }