// let tasks = [{
//     'id': 0,
//     'title': 'Putzen',
//     'description':'Beschreibung',
//     'priority': 'urgent',
//     'status':'inProgress',
//     'category': 'User Story',
//     'dueDate': 'date',
//     'assignedTo' : 'user',
//     'subtasks': {
// 'subtask': 'unteraufgabe'
//     }
// }, {
//     'id': 1,
//     'title': 'Kochen',
//     'category': 'inProgress'
// }, {
//     'id': 2,
//     'title': 'Einkaufen',
//     'category': 'toDo'
// }];



// function updateHTML() {
//     let open = tasks.filter(t => t['status'] == 'open');

//     document.getElementById('open').innerHTML = '';

//     for (let index = 0; index < open.length; index++) {
//         const element = open[index];
//         document.getElementById('open').innerHTML += generateTodoHTML(element);
//     }

//     let closed = tasks.filter(t => t['status'] == 'closed');

//     document.getElementById('closed').innerHTML = '';

//     for (let index = 0; index < closed.length; index++) {
//         const element = closed[index];
//         document.getElementById('closed').innerHTML += generateTodoHTML(element);
//     }
// }

function startDragging(id) {
    currentDragElement = id;
    console.log(id);
}

// function generateTodoHTML(element) {
//     return `<div draggable="true" ondragstart="startDragging(${element['id']})" class="todo">${element['title']}</div>`;
// }

function allowDrop(ev) {
    ev.preventDefault();
}

async function moveTo(status) {      
    let firebaseURL=
    `/tasks/${currentDragElement}/status`; 
    await putData(status, firebaseURL);
    loadDataBoard();    
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}