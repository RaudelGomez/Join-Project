const BASE_URL =
	"https://join-99216-default-rtdb.europe-west1.firebasedatabase.app/";
let loggedIn = false;
let contacts = [];
let tasks = [];
let subTasks = [];
let currentTask = "";
let priorityTask = "urgent";
let statusTask = [
	{ id: 1, name: "To do" },
	{ id: 2, name: "In progress do" },
	{ id: 3, name: "Await feedback" },
	{ id: 4, name: "Done" },
];
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


