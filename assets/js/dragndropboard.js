let tasks = [{
    'id': 0,
    'title': 'Putzen',
    'category': 'inProgress'
}, {
    'id': 1,
    'title': 'Kochen',
    'category': 'done'
}, {
    'id': 2,
    'title': 'Einkaufen',
    'category': 'toDo'
}];

let currentDraggedElement;

// function updateHTML() {
//     let open = tasks.filter(t => t['category'] == 'open');

//     document.getElementById('open').innerHTML = '';

//     for (let index = 0; index < open.length; index++) {
//         const element = open[index];
//         document.getElementById('open').innerHTML += generateTodoHTML(element);
//     }

//     let closed = tasks.filter(t => t['category'] == 'closed');

//     document.getElementById('closed').innerHTML = '';

//     for (let index = 0; index < closed.length; index++) {
//         const element = closed[index];
//         document.getElementById('closed').innerHTML += generateTodoHTML(element);
//     }
// }

function startDragging(id) {
    currentDraggedElement = id;
}

function generateTodoHTML(element) {
    return `<div draggable="true" ondragstart="startDragging(${element['id']})" class="todo">${element['title']}</div>`;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    tasks[currentDraggedElement]['category'] = category;
    updateHTML();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}