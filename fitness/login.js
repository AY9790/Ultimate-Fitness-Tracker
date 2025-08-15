document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("login-password");
    const errorMessage = document.getElementById("error-message");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

        const enteredEmail = emailField.value;
        const enteredPassword = passwordField.value;

        const storedUser = JSON.parse(localStorage.getItem("user"));

        // Validate login credentials
        if (storedUser && enteredEmail === storedUser.email && enteredPassword === storedUser.password) {
            alert("Login successful!");
            window.location.href = "dashboard.html"; // Redirect to dashboard
        } else {
            errorMessage.textContent = "Invalid Email or Password!";
        }
    });
});

// Password Toggle Feature
function togglePassword(fieldId) {
    let passwordField = document.getElementById(fieldId);
    passwordField.type = passwordField.type === "password" ? "text" : "password";
}
