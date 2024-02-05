document.addEventListener("DOMContentLoaded", function () {
    // Function to check if the "Login" cookie exists
    function checkLoginCookie() {
        return document.cookie.split(';').some((item) => item.trim().startsWith('Login='));
    }

    // Event listener for the logout button
    const logoutButton = document.getElementById("logout-button");

    if (logoutButton) {
        // Check if the "Login" cookie exists
        if (checkLoginCookie()) {
            // If the cookie exists, show the logout button
            logoutButton.style.display = "block";
        } else {
            // If the cookie doesn't exist, hide the logout button
            logoutButton.style.display = "none";
        }

        logoutButton.addEventListener("click", function (event) {
            event.preventDefault();
            // Call your logout function here, e.g., deleteCookie()
            deleteCookie("Login");
            // Show a success message
            // showLogoutSuccessMessage();
            alert("Anda Berhasil Sign Out!");
            // Redirect or perform any other necessary actions
            window.location.href = '/';
        });
    }
});

// Function to delete a cookie
function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}
