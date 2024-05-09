const form = document.getElementById('coachRegistrationForm');
const firstNameInput = document.getElementById('firstName');
const firstNameError = document.getElementById('firstNameError');
const lastNameInput = document.getElementById('lastName');
const lastNameError = document.getElementById('lastNameError');
const usernameInput = document.getElementById('username');
const usernameError = document.getElementById('usernameError');
const passwordInput = document.getElementById('password');
const passwordError = document.getElementById('passwordError');
const confirmPasswordInput = document.getElementById('confirmPassword');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');
const certificateInput = document.getElementById('certificate');
const certificateError = document.getElementById('certificateError');
const yearsOfExperienceInput = document.getElementById('yearsOfExperience');
const yearsOfExperienceError = document.getElementById('yearsOfExperienceError');
const selectedGender = document.querySelector('input[name="gender"]:checked');
const dateOfBirthInput = document.getElementById('dateOfBirth');
const dateOfBirthError = document.getElementById('dateOfBirthError');
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener('submit', function(event) {
    // Prevent form submission if the submit button is disabled
    if (submitButton.disabled) {
        // Prevent form submission
        event.preventDefault();
    }else{
        event.preventDefault();// Prevent the default behavior of the form submission
        const formData = new FormData(); // Create FormData object from the form
        formData.append("firstName", firstNameInput.value);
        formData.append("lastName", lastNameInput.value);
        formData.append("username", usernameInput.value);
        formData.append("password", passwordInput.value);
        formData.append("email", emailInput.value);
        formData.append("certificate", certificateInput.value);
        formData.append("yearsOfExperience", yearsOfExperienceInput.value);
        formData.append("gender", selectedGender.value);
        formData.append("dateOfBirth", dateOfBirthInput.value);
    
    
        const url = 'http://localhost:3000/api/v1/coachingRequests/create_coaching_request';
    
        axios.post(url, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                // Handle successful response from the server
                console.log('Success:', response.data);
    
                // Store token and user data in local storage
                // localStorage.setItem('token', response.data.token);
                // localStorage.setItem('user', JSON.stringify(response.data.user));
    
                // Redirect the user to the waiting page
                window.location.href = '../html/waitingPage.html'; 
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



firstNameInput.addEventListener('input', function() {
    const errorMessage = validateFirstName(firstNameInput.value);
    if (errorMessage) {
        firstNameError.textContent = errorMessage;
        firstNameError.style.display = 'block';
        // Disable the submit button if there are validation errors
        submitButton.disabled = true;
    } else {
        firstNameError.style.display = 'none';
        // Enable the submit button if input field are valid
        submitButton.disabled = false;
    }
});



function validateFirstName(firstName) {
    // Check if the first name is not empty
    if (!firstName.trim()) {
        return "First name is required.";
    }

    // Check if the first name contains only letters and possibly spaces, hyphens, or apostrophes
    const regex = /^[a-zA-Z]+(?:[' -][a-zA-Z]+)*$/;
    if (!regex.test(firstName)) {
        return "First name should contain only letters, spaces, hyphens, or apostrophes.";
    }

    // Check if the length of the first name is within a reasonable range
    if (firstName.length < 2 || firstName.length > 50) {
        return "First name should be between 2 and 50 characters.";
    }

    // Validation passed
    return null;
}




lastNameInput.addEventListener('input', function() {
    const errorMessage = validateLastName(lastNameInput.value);
    if (errorMessage) {
        lastNameError.textContent = errorMessage;
        lastNameError.style.display = 'block';
        // Disable the submit button if there are validation errors
        submitButton.disabled = true;
    } else {
        lastNameError.style.display = 'none';
        // Enable the submit button if input field are valid
        submitButton.disabled = false;
    }
});

function validateLastName(lastName) {
    if (!lastName.trim()) {
        return "Last name is required.";
    }
    const regex = /^[a-zA-Z]+(?:[' -][a-zA-Z]+)*$/;
    if (!regex.test(lastName)) {
        return "Last name should contain only letters, spaces, hyphens, or apostrophes.";
    }
    if (lastName.length < 2 || lastName.length > 50) {
        return "Last name should be between 2 and 50 characters.";
    }
    return null;
}





usernameInput.addEventListener('input', function() {
    const errorMessage = validateUsername(usernameInput.value);
    if (errorMessage) {
        usernameError.textContent = errorMessage;
        usernameError.style.display = 'block';
        // Disable the submit button if there are validation errors
        submitButton.disabled = true;
    } else {
        usernameError.style.display = 'none';
        // Enable the submit button if input field are valid
        submitButton.disabled = false;
    }
});

function validateUsername(username) {
    if (!username.trim()) {
        return "Username is required.";
    }
    const regex = /^[a-zA-Z0-9_]+$/;
    if (!regex.test(username)) {
        return "Username should contain only letters, numbers, or underscores.";
    }
    if (username.length < 3 || username.length > 20) {
        return "Username should be between 3 and 20 characters.";
    }
    return null;
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
        // Enable the submit button if input field are valid
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





confirmPasswordInput.addEventListener('input', function() {
    const errorMessage = validateConfirmPassword(passwordInput.value, confirmPasswordInput.value);
    if (errorMessage) {
        confirmPasswordError.textContent = errorMessage;
        confirmPasswordError.style.display = 'block';
        // Disable the submit button if there are validation errors
        submitButton.disabled = true;
    } else {
        confirmPasswordError.style.display = 'none';
        // Enable the submit button if input field are valid
        submitButton.disabled = false;
    }
});

function validateConfirmPassword(password, confirmPassword) {
    if (!confirmPassword.trim()) {
        return "Please confirm your password.";
    }
    if (password !== confirmPassword) {
        return "Passwords do not match.";
    }
    return null;
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
        // Enable the submit button if input field are valid
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



//certificate validation
certificateInput.addEventListener('input', function() {
    const errorMessage = validateCertificate(certificateInput.value);
    if (errorMessage) {
        certificateError.textContent = errorMessage;
        certificateError.style.display = 'block';
    } else {
        certificateError.style.display = 'none';
    }
});
function validateCertificate(certificate) {
    if (!certificate.trim()) {
        return "Certificate is required.";
    }
    return null;
}

//Years of experience validation
yearsOfExperienceInput.addEventListener('input', function() {
    const errorMessage = validateYearsOfExperience(yearsOfExperienceInput.value);
    if (errorMessage) {
        yearsOfExperienceError.textContent = errorMessage;
        yearsOfExperienceError.style.display = 'block';
    } else {
        yearsOfExperienceError.style.display = 'none';
    }
});
function validateYearsOfExperience(yearsOfExperience) {
    if (!yearsOfExperience.trim()) {
        return "Years of experience is required.";
    }
    if (yearsOfExperience < 0) {
        return "Years of experience should be a positive number.";
    }
    return null;
}




dateOfBirthInput.addEventListener('input', function() {
    const errorMessage = validateDateOfBirth(dateOfBirthInput.value);
    if (errorMessage) {
        dateOfBirthError.textContent = errorMessage;
        dateOfBirthError.style.display = 'block';
    } else {
        dateOfBirthError.style.display = 'none';
    }
});
function validateDateOfBirth(dateOfBirth) {
    if (dateOfBirth.trim() !== "") {
        const currentDate = new Date();
        const userDateOfBirth = new Date(dateOfBirth);
        if (isNaN(userDateOfBirth.getTime()) || userDateOfBirth >= currentDate) {
            return "Please enter a valid date of birth.";
        }
    }
    return null;
}