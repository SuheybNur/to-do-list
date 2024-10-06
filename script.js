const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const clearTasksBtn = document.getElementById("clear-tasks-btn");

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToList(task));
}

function addTaskToList(taskText) {
    const taskItem = document.createElement("li");
    taskItem.innerText = taskText;
    taskItem.addEventListener("click", function() {
        taskItem.classList.toggle("completed");
        saveTasks();
    });
    taskList.appendChild(taskItem);
}

function saveTasks() {
    const tasks = Array.from(taskList.children).map(li => li.innerText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

addTaskBtn.addEventListener("click", function() {
    const taskText = taskInput.value;
    if (taskText.trim() !== "") {
        addTaskToList(taskText);
        taskInput.value = "";
        saveTasks();
    }
});

// Allow adding tasks with Enter key
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTaskBtn.click();
    }
});

// Clear all tasks
clearTasksBtn.addEventListener("click", function() {
    taskList.innerHTML = "";
    localStorage.removeItem("tasks");
});

// Load tasks when the application starts
loadTasks();
