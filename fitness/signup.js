document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.querySelector("form");

    signupForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

        const firstName = document.querySelector("input[placeholder='First Name']").value;
        const lastName = document.querySelector("input[placeholder='Last Name']").value;
        const phoneNumber = document.querySelector("input[placeholder='Phone Number']").value;
        const email = document.querySelector("input[placeholder='Email']").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        // Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Store user details in localStorage
        const user = { firstName, lastName, phoneNumber, email, password };
        localStorage.setItem("user", JSON.stringify(user));

        alert("Account created successfully!");
        window.location.href = "login.html"; // Redirect to login page
    });
});

// Password Toggle Feature
function togglePassword(fieldId) {
    let passwordField = document.getElementById(fieldId);
    passwordField.type = passwordField.type === "password" ? "text" : "password";
}
