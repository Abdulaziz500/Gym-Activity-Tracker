const form = document.getElementById('traineeLoginForm');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');
const passwordInput = document.getElementById('password');
const passwordError = document.getElementById('passwordError');
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener('submit', function(event) {
    if(submitButton.disabled){
        // Prevent form submission
        event.preventDefault();
    }else{
        event.preventDefault(); // Prevent the default form submission behavior

        const formData = new FormData(); // Create FormData object from the form
        formData.append("email", emailInput.value);
        formData.append("password", passwordInput.value);
    
        const url = 'http://localhost:3000/api/v1/auth/login'; // Replace 'your-backend-url' with your actual backend endpoint
    
        axios.post(url, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                // Handle successful response from the server
                console.log('Success:', response.data);
    
                // Store token and user data in local storage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
    
                // Redirect the user to the trainee home page
                window.location.href = '../html/trainee_home.html'; 
            })
            .catch(error => {
                // Handle errors during the Axios request
                console.error('Error:', error.response.data.message);
                let message = error.response.data.message;
                showCustomAlert(message);
            });

    }

});

function showCustomAlert(message) {
    // Create a new div element for the alert
    const alertBox = document.createElement('div');
    alertBox.className = 'custom-alert';

    // Set the message
    alertBox.innerHTML = `
        <span class="close-btn">&times;</span>
        <p>${message}</p>
    `;

    // Display the alert
    document.body.appendChild(alertBox);
    alertBox.style.display = 'block'; // Show the alert box

    // Close button event listener
    const closeBtn = alertBox.querySelector('.close-btn');
    closeBtn.addEventListener('click', function() {
        alertBox.style.display = 'none';
    });
}



emailInput.addEventListener('input', function() {
    const errorMessage = validateEmail(emailInput.value);
    if (errorMessage) {
        emailError.textContent = errorMessage;
        emailError.style.display = 'block';
        // Disable the submit button if there are validation errors
        submitButton.disabled = true;
    } else {
        emailError.style.display = 'none';
        // Enable the submit button if there are no validation errors
        submitButton.disabled = false;
    }
});

function validateEmail(email) {
    if (!email.trim()) {
        return "Email is required.";
    }
    // Regular expression for email validation
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
        return "Invalid email address.";
    }
    // Additional checks for common domain restrictions
    const domain = email.split('@')[1];
    if (!isValidDomain(domain)) {
        return "Invalid domain in email address.";
    }
    return null;
}

function isValidDomain(domain) {
    // List of known top-level domains (TLDs)
    const knownTLDs = [
        'com', 'net', 'org', 'edu', 'gov','info' // Generic TLDs
    ];

    // Get the TLD by splitting the domain at the last dot (.)
    const tld = domain.split('.').pop().toLowerCase();

    // Check if the TLD is present in the list of known TLDs
    return knownTLDs.includes(tld);
}



passwordInput.addEventListener('input', function() {
    const errorMessage = validatePassword(passwordInput.value);
    if (errorMessage) {
        passwordError.textContent = errorMessage;
        passwordError.style.display = 'block';
        // Disable the submit button if there are validation errors
        submitButton.disabled = true;
    } else {
        passwordError.style.display = 'none';
        // Enable the submit button if there are no validation errors
        submitButton.disabled = false;
    }
});

function validatePassword(password) {
    if (!password.trim()) {
        return "Password is required.";
    }
    if (password.length < 8) {
        return "Password should be at least 8 characters long.";
    }
    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        return "Password should contain at least one uppercase letter.";
    }
    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        return "Password should contain at least one lowercase letter.";
    }
    // Check for at least one number
    if (!/\d/.test(password)) {
        return "Password should contain at least one number.";
    }
    // Check for at least one special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return "Password should contain at least one special character.";
    }
    return null;
}