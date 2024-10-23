var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// TypeScript DOM Elements
var taskInput = document.getElementById("task-input");
var addTaskBtn = document.getElementById("add-task-btn");
var taskList = document.getElementById("task-list");
// Tasks array to store tasks
var tasks = [];
// Function to create a new task
function addTask() {
    var taskTitle = taskInput.value.trim();
    if (taskTitle === "")
        return;
    var newTask = {
        id: Date.now(),
        title: taskTitle,
        completed: false,
    };
    tasks.push(newTask);
    renderTasks();
    taskInput.value = ""; // Clear input field after adding
}
// Function to render the tasks on the screen
function renderTasks() {
    taskList.innerHTML = ""; // Clear the list before re-rendering
    tasks.forEach(function (task) {
        var li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        var title = document.createElement("span");
        title.textContent = task.title;
        li.appendChild(title);
        // Complete Task Button
        var completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Undo" : "Complete";
        completeBtn.addEventListener("click", function () { return toggleTaskCompletion(task.id); });
        li.appendChild(completeBtn);
        // Delete Task Button
        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", function () { return deleteTask(task.id); });
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}
// Function to toggle task completion status
function toggleTaskCompletion(taskId) {
    tasks = tasks.map(function (task) {
        return task.id === taskId ? __assign(__assign({}, task), { completed: !task.completed }) : task;
    });
    renderTasks();
}
// Function to delete a task
function deleteTask(taskId) {
    tasks = tasks.filter(function (task) { return task.id !== taskId; });
    renderTasks();
}
// Event listener for the Add Task button
addTaskBtn.addEventListener("click", addTask);
// Optional: Add task with Enter key
taskInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});
