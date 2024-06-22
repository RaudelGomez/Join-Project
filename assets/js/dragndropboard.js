
function startDragging(id, cardElement) {
    currentDragElement = id;
    cardElement.classList.add("rotateCard");
}

function allowDrop(ev) {
    ev.preventDefault();
}

async function moveTo(status) {      
    let firebaseURL=
    `/tasks/${currentDragElement}/status`; 
    await putData(status, firebaseURL);
    document.getElementById("toDoBoard").classList.remove('drag-area-highlight');
    document.getElementById("inProgress").classList.remove('drag-area-highlight');
    document.getElementById("awaitFeedback").classList.remove('drag-area-highlight');
    document.getElementById("done").classList.remove('drag-area-highlight');
    loadDataBoard();    
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}