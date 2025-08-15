let historyData = JSON.parse(localStorage.getItem("historyData")) || [];  // Load stored history
let caloriesData = { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 };
let waterData = {};

// Chart Variables
let caloriesChartInstance;
let waterChartInstance;

function addWorkout() {
    let day = document.getElementById("day").value;
    let workout = document.getElementById("workout").value;
    let time = document.getElementById("time").value;
    let calories = document.getElementById("calories").value;
    let water = document.getElementById("water").value;

    if (!day || !workout || !time) {
        alert("Please fill in at least Day, Workout, and Time.");
        return;
    }

    let entry = { day, workout, time, calories: calories || 0, water: water || 0 };
    historyData.push(entry);
    saveData();  // Save updated history to storage
    updateHistory();
    updateCharts();
}

function saveData() {
    localStorage.setItem("historyData", JSON.stringify(historyData));  // Save history to localStorage
}

function updateHistory() {
    let historyDiv = document.getElementById("history");
    historyDiv.innerHTML = "";

    historyData.forEach((entry, index) => {
        let div = document.createElement("div");
        div.classList.add("history-entry");
        div.innerHTML = `
            <p><strong>${entry.day}:</strong> ${entry.workout} at ${entry.time}, ${entry.calories} cal</p>
            <div class="button-group">
                <button class="edit-btn" onclick="editWorkout(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteWorkout(${index})">Delete</button>
            </div>
        `;
        historyDiv.appendChild(div);
    });
}

// Function to delete a workout entry
function deleteWorkout(index) {
    if (confirm("Are you sure you want to delete this workout?")) {
        historyData.splice(index, 1);
        saveData();
        updateHistory();
    }
}

function editWorkout(index) {
    let entry = historyData[index];
    document.getElementById("day").value = entry.day;
    document.getElementById("workout").value = entry.workout;
    document.getElementById("time").value = entry.time;
    document.getElementById("calories").value = entry.calories;
    document.getElementById("water").value = entry.water;

    historyData.splice(index, 1);
    saveData();
    updateHistory();
}


function editWorkout(index) {
    let entry = historyData[index];
    document.getElementById("day").value = entry.day;
    document.getElementById("workout").value = entry.workout;
    document.getElementById("time").value = entry.time;
    document.getElementById("calories").value = entry.calories;
    document.getElementById("water").value = entry.water;

    historyData.splice(index, 1);
    saveData();  // Save changes to localStorage
    updateHistory();
    updateCharts();
}

function clearHistory() {
    historyData = [];
    localStorage.removeItem("historyData");  // Clear stored history
    updateHistory();
    updateCharts();
}

function updateCharts() {
    caloriesData = { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 };
    waterData = {};

    historyData.forEach(entry => {
        caloriesData[entry.day] += Number(entry.calories);
        waterData[entry.day] = (waterData[entry.day] || 0) + Number(entry.water);
    });

    drawCaloriesChart();
    drawWaterChart();
}

function drawCaloriesChart() {
    if (caloriesChartInstance) caloriesChartInstance.destroy();
    let ctx = document.getElementById("caloriesChart").getContext("2d");

    let neonColors = ["#00FF7F", "#00E5FF", "#FF007F", "#9400D3", "#00FF7F", "#00E5FF", "#FF007F"];

    caloriesChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
            labels: Object.keys(caloriesData),
            datasets: [{
                label: "Calories Burned",
                data: Object.values(caloriesData),
                backgroundColor: neonColors,
                borderColor: "#FFF",
                borderWidth: 1,
                hoverBackgroundColor: "#FFFF00", // Yellow glow on hover
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { color: "#E0E0E0" } }
            },
            scales: {
                x: { ticks: { color: "#E0E0E0" }, grid: { color: "#555" } },
                y: { ticks: { color: "#E0E0E0" }, grid: { color: "#555" } }
            }
        }
    });
}

function drawWaterChart() {
    if (waterChartInstance) waterChartInstance.destroy();
    let ctx = document.getElementById("waterChart").getContext("2d");

    let pieColors = ["#00E5FF", "#FF007F", "#9400D3", "#00FF7F", "#FF6B6B", "#FFD700", "#34D399"];

    waterChartInstance = new Chart(ctx, {
        type: "pie",
        data: {
            labels: Object.keys(waterData),
            datasets: [{
                data: Object.values(waterData),
                backgroundColor: pieColors,
                borderColor: "#FFF",
                hoverBackgroundColor: "#FFFF00", // Yellow glow on hover
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { color: "#E0E0E0" } }
            }
        }
    });
}

// Load stored history on page load
document.addEventListener("DOMContentLoaded", function () {
    historyData = JSON.parse(localStorage.getItem("historyData")) || [];  // Load history
    updateHistory();
    updateCharts();
});
