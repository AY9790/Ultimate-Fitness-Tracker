let steps = parseInt(localStorage.getItem("steps")) || 0;
let rank = localStorage.getItem("rank") || "Beginner";

document.getElementById("steps").innerText = steps;
document.getElementById("rank").innerText = rank;

function trackSteps() {
    steps += 100; // Increase steps by 100
    document.getElementById("steps").innerText = steps;
    saveProgress();
    updateRank();
}

function updateRank() {
    if (steps >= 10000) rank = "Pro";
    else if (steps >= 5000) rank = "Intermediate";
    else rank = "Beginner";

    document.getElementById("rank").innerText = rank;
    saveProgress();
}

function saveProgress() {
    localStorage.setItem("steps", steps);
    localStorage.setItem("rank", rank);
}
