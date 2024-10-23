// TypeScript DOM Elements
const taskInput = document.getElementById("task-input") as HTMLInputElement;
const addTaskBtn = document.getElementById("add-task-btn") as HTMLButtonElement;
const taskList = document.getElementById("task-list") as HTMLUListElement;

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

// Tasks array to store tasks
let tasks: Task[] = [];

// Function to create a new task
function addTask(): void {
    const taskTitle = taskInput.value.trim();
    if (taskTitle === "") return;

    const newTask: Task = {
        id: Date.now(),
        title: taskTitle,
        completed: false,
    };

    tasks.push(newTask);
    renderTasks();
    taskInput.value = ""; // Clear input field after adding
}

// Function to render the tasks on the screen
function renderTasks(): void {
    taskList.innerHTML = ""; // Clear the list before re-rendering

    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";

        const title = document.createElement("span");
        title.textContent = task.title;
        li.appendChild(title);

        // Complete Task Button
        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Undo" : "Complete";
        completeBtn.addEventListener("click", () => toggleTaskCompletion(task.id));
        li.appendChild(completeBtn);

        // Delete Task Button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", () => deleteTask(task.id));
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

// Function to toggle task completion status
function toggleTaskCompletion(taskId: number): void {
    tasks = tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
}

// Function to delete a task
function deleteTask(taskId: number): void {
    tasks = tasks.filter((task) => task.id !== taskId);
    renderTasks();
}

// Event listener for the Add Task button
addTaskBtn.addEventListener("click", addTask);

// Optional: Add task with Enter key
taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});
