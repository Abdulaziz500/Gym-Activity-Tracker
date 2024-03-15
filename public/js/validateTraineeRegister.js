const form = document.getElementById('traineeRegistrationForm');
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
const selectedGender = document.querySelector('input[name="gender"]:checked');
const weightInput = document.getElementById('weight');
const weightError = document.getElementById('weightError');
const heightInput = document.getElementById('height');
const heightError = document.getElementById('heightError');
const dateOfBirthInput = document.getElementById('dateOfBirth');
const dateOfBirthError = document.getElementById('dateOfBirthError');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(); // Create FormData object from the form
    formData.append("firstName", firstNameInput.value);
    formData.append("lastName", lastNameInput.value);
    formData.append("username", usernameInput.value);
    formData.append("password", passwordInput.value);
    formData.append("email", emailInput.value);
    formData.append("gender", selectedGender.value);
    formData.append("weight", weightInput.value);
    formData.append("height", heightInput.value);
    formData.append("dateOfBirth", dateOfBirthInput.value);


    const url = 'http://localhost:3000/api/v1/auth/register'; // Replace 'your-backend-url' with your actual backend endpoint

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
            window.location.href = 'trainee_home.html'; 
        })
        .catch(error => {
            // Handle errors during the Axios request
            console.error('Error:', error);
            showCustomAlert();
        });
});

function showCustomAlert() {
    const alertBox = document.querySelector('.custom-alert');
    alertBox.style.display = 'block';
    
    const closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', function() {
        alertBox.style.display = 'none';
    });
}


firstNameInput.addEventListener('input', function() {
    const errorMessage = validateFirstName(firstNameInput.value);
    if (errorMessage) {
        firstNameError.textContent = errorMessage;
        firstNameError.style.display = 'block';
    } else {
        firstNameError.style.display = 'none';
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
    } else {
        lastNameError.style.display = 'none';
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
    } else {
        usernameError.style.display = 'none';
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
    } else {
        passwordError.style.display = 'none';
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
    } else {
        confirmPasswordError.style.display = 'none';
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
    } else {
        emailError.style.display = 'none';
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




weightInput.addEventListener('input', function() {
    const errorMessage = validateWeight(weightInput.value);
    if (errorMessage) {
        weightError.textContent = errorMessage;
        weightError.style.display = 'block';
    } else {
        weightError.style.display = 'none';
    }
});
function validateWeight(weight) {
    if (weight.trim() !== "") {
        const numericWeight = parseFloat(weight);
        if (isNaN(numericWeight) || numericWeight < 30 || numericWeight > 300) {
            return "Please enter a valid weight.";
        }
    }
    return null;
}




heightInput.addEventListener('input', function() {
    const errorMessage = validateHeight(heightInput.value);
    if (errorMessage) {
        heightError.textContent = errorMessage;
        heightError.style.display = 'block';
    } else {
        heightError.style.display = 'none';
    }
});
function validateHeight(height) {
    if (height.trim() !== "") {
        const numericHeight = parseFloat(height);
        if (isNaN(numericHeight) || numericHeight < 130 || numericHeight > 250) {
            return "Please enter a valid height.";
        }
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