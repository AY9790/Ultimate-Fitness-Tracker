// Function to Simulate Heart Rate (Random BPM)
function trackHeartbeat() {
    let bpm = Math.floor(Math.random() * (120 - 60) + 60); // Random BPM between 60-120
    document.getElementById("bpm").innerText = bpm;
}

// Function to Calculate Calories Based on Height, Weight & Age
function calculateCalories() {
    let age = document.getElementById("age").value;
    let height = document.getElementById("height").value;
    let weight = document.getElementById("weight").value;

    if (age && height && weight) {
        let calories = Math.round((10 * weight) + (6.25 * height) - (5 * age) + 5); // Basic calorie formula
        document.getElementById("caloriesResult").innerText = calories;
    } else {
        alert("Please enter all fields.");
    }
}
