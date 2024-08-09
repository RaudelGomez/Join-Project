/**
 * Base URL of project
 */
const BASE_URL = "https://join-2-75316-default-rtdb.europe-west1.firebasedatabase.app/";
/**
 * This variable is used to lnow if the user is logged
 */
let loggedIn = false;
/**
 * This variable is used to save contacts
 */
let contacts = [];
/**
 * This variable is used to save tasks
 */
let tasks = [];
/**
 * This variable is used to save the subTasks in the current Task that is editing. That will be deleted after editing
 */
let subTasks = [];
/**
 * This variable save the current id of the task that is editing
 */
let currentTaskId = "";
/**
 * This variable save the current task that is editing
 */
let currentTask = "";
/**
 * That wil be used to set he priority of the task to meium after a created task.
 */
let priorityTask = "medium";
/**
 * That variable is used to set task type: To-do if any parameter is sent.
 */
let typeOfTask = 1;
/**
 * That variable will be used to know which element will be used in drag. To move in another column in Board
 */
let currentDragElement;
/**
 * That is the array of objects, where to every kind of task will given an ID and better query to do.
 */
let statusTask = [
	{ id: 1, name: "To do" },
	{ id: 2, name: "In progress do" },
	{ id: 3, name: "Await feedback" },
	{ id: 4, name: "Done" },
];
/**
 * That is a array of object where every color has an ID.
 */
let colors = [
	{ id: "heat-wave", color: "#ff7a00" },
	{ id: "girls-night-out", color: "#ff5eb3" },
	{ id: "venetian-night", color: "#6e52ff" },
	{ id: "sugar-grape", color: "#9327ff" },
	{ id: "blue-bikini", color: "#00bee8" },
	{ id: "blue-martina", color: "#1fd7c1" },
	{ id: "peachy-pinky", color: "#ff745e" },
	{ id: "peahes-creme", color: "#ffa35e" },
	{ id: "blush-pink", color: "#fc71ff" },
	{ id: "forsythia", color: "#ffc701" },
	{ id: "sunflowe", color: "#ffe62b" },
	{ id: "brimstone", color: "#ffbb2b" },
];



