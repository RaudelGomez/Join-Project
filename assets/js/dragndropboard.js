/**
 * That function gives CSS to a card in Board when it will moved and save that id in a variable to know which card will be moved
 * @param {string} id - Id of card to move
 * @param {object} cardElement - That is the HTML element 
 */
function startDragging(id, cardElement) {
    currentDragElement = id;
    cardElement.classList.add("rotateCard");
}

/**
 * Rgis function prevent the default behaviour of the form in HTML
 * @param {Event} ev - event
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * That function update in the data base the current status of the task that was moved. Then show the task in he current column.
 * @param {number} status - that is the number of the kind of task that will be taken.
 */
async function moveTo(status) {      
    let firebaseURL= `/tasks/${currentDragElement}/status`; 
    await putData(status, firebaseURL);
    document.getElementById("toDoBoard").classList.remove('drag-area-highlight');
    document.getElementById("inProgress").classList.remove('drag-area-highlight');
    document.getElementById("awaitFeedback").classList.remove('drag-area-highlight');
    document.getElementById("done").classList.remove('drag-area-highlight');
    loadDataBoard();    
}

/**
 * This function highlight the column where the task will be moved
 * @param {string} id - id of the current task
 */
function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

/**
 * This function remove highlight the column where the task was taken
 * @param {string} id - id of the current task
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}