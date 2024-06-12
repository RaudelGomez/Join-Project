  // Open Popup
  async function openDialog(template) {
    // console.log(template);
    // const htmlTemplate = 
    // document.getElementById("template").setAttribute('w3-include-html','./assets/templates/'+template);
    document.getElementById("innerDialog").classList.remove("d-none"); 
    document.getElementById("innerDialog").classList.remove("animate__slideOutRight");
    document.getElementById("innerDialog").classList.add("animate__slideInRight");
    document.getElementById("dialog").classList.add("animate__fadeIn");
    document.getElementById("dialog").classList.remove("animate__fadeOut");
    document.getElementById("dialog").classList.remove("d-none");
    document.body.classList.add("noscroll");    
  }

  function closeDialog() {
    document.getElementById("dialog").classList.remove("animate__fadeIn");
    document.getElementById("dialog").classList.add("animate__fadeOut");
    document.getElementById("innerDialog").classList.add("animate__slideOutRight");
    document.getElementById("innerDialog").classList.remove("animate__slideInRight");
    setTimeout(() => {document.getElementById("dialog").classList.add("d-none")}, 500);
    document.body.classList.remove("noscroll");
  }

