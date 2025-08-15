document.addEventListener("DOMContentLoaded", loadTasks);

let pendingTasks = JSON.parse(localStorage.getItem("pendingTasks")) || [];
let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

// Function to Add Task
function addTask() {
    let taskInput = document.getElementById("taskInput").value.trim();
    let taskDate = document.getElementById("taskDate").value;

    if (!taskInput || !taskDate) {
        alert("Please enter a task and select a date.");
        return;
    }

    let task = { text: taskInput, date: taskDate };
    pendingTasks.push(task);
    saveTasks();
    loadTasks();
    
    // Clear input fields after adding
    document.getElementById("taskInput").value = "";
    document.getElementById("taskDate").value = "";
}

// Function to Mark Task as Completed
function completeTask(index) {
    let task = pendingTasks.splice(index, 1)[0];
    completedTasks.push(task);
    saveTasks();
    loadTasks();
}

// Function to Delete Task
function deleteTask(index, type) {
    if (type === "pending") {
        pendingTasks.splice(index, 1);
    } else {
        completedTasks.splice(index, 1);
    }
    saveTasks();
    loadTasks();
}

// Function to Save Tasks in Local Storage
function saveTasks() {
    localStorage.setItem("pendingTasks", JSON.stringify(pendingTasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}

// Function to Load Tasks from Storage
function loadTasks() {
    let pendingList = document.getElementById("pendingTasks");
    let completedList = document.getElementById("completedTasks");

    pendingList.innerHTML = "";
    completedList.innerHTML = "";

    pendingTasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${task.date}: ${task.text} 
                        <button onclick="completeTask(${index})">✔ Complete</button>
                        <button onclick="deleteTask(${index}, 'pending')">❌ Delete</button>`;
        pendingList.appendChild(li);
    });

    completedTasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${task.date}: ${task.text} ✅
                        <button onclick="deleteTask(${index}, 'completed')">❌ Delete</button>`;
        completedList.appendChild(li);
    });
}

document.getElementById("addTaskButton").addEventListener("click", addTask);
