document.addEventListener("DOMContentLoaded", function () {
    const authButtons = document.getElementById("auth-buttons");
    const logoutSection = document.getElementById("logout-section");
    const startBtn = document.getElementById("start-btn");

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
        // User is logged in
        authButtons.style.display = "none";
        logoutSection.style.display = "block"; // Show Logout button
        startBtn.removeAttribute("disabled"); // Enable button
    } else {
        // User is not logged in
        authButtons.style.display = "flex";
        logoutSection.style.display = "none"; // Hide Logout button
        startBtn.setAttribute("disabled", "true"); // Disable button
        startBtn.addEventListener("click", function (event) {
            event.preventDefault();
            alert("Please sign up to continue.");
            window.location.href = "signup.html";
        });
    }
});

// Logout function
function logout() {
    localStorage.removeItem("user"); // Clear user session
    alert("You have been logged out.");
    window.location.href = "frontpage.html"; // Redirect to front page
}
