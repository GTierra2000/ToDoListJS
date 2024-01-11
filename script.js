document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.ariaValueMax.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        text: taskInput, value,
        timestamp: new Date().getTime(),
    };

    saveTask(task);
    displayTask(task, taskList);
    taskInput.value = ""; // Clear the input field
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify("tasks"));
}

function loadTasks() {
    const taskList = document.getElementById("taskList");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => displayTask(task, taskList));
}

function displayTask(task, taskList) {
    const li = document.createElement("li");
    li.innerHTML = `
    <span>${task.text}</span>
    <button onclick="deleteTask(${task.timestamp})">Delete</button>
    `;
    taskList.appendChild(li);
}

function deleteTask(timestamp) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.timestamp !== timestamp);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear the list
    loadTasks(); // Reload tasks after deletion
}
