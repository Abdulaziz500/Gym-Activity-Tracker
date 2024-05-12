// logoutAdmin.js

// Function to logout the user
function logout() {
    // Clear user information from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    window.location.href = '../html/adminLogin.html';
}

// Select the logout link and attach the logout functionality
const logoutLink = document.getElementById('logoutLink');
if (logoutLink) {
    logoutLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default anchor behavior
        logout(); // Call the logout function
    });
}