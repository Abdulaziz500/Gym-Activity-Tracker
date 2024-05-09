// Function to fetch user info
function fetchUserInfo() {
    // Get the user ID from the URL parameters
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');
    // Make a GET request to your backend API endpoint
    const url = `http://localhost:3000/api/v1/coaches/get_coach/${userId}`;
    axios.get(url)
        .then(function (response) {
            // Handle the successful response
            const userData = response.data;
            console.log(userData);
            // Update the HTML elements with the fetched user info
            document.getElementById('firstName').textContent = userData.firstName;
            document.getElementById('lastName').textContent = userData.lastName;
            document.getElementById('username').textContent = userData.username;
            document.getElementById('email').textContent = userData.email;
            document.getElementById('userRole').textContent = userData.userRole;
            document.getElementById('dateOfBirth').textContent = userData.dateOfBirth;
            document.getElementById('gender').textContent = userData.gender;
            document.getElementById('age').textContent = userData.age;
            document.getElementById('certificate').textContent = userData.certificate;
            document.getElementById('yearsOfExperience').textContent = userData.yearsOfExperience;
        })
        .catch(function (error) {
            // Handle the error
            console.error('Error fetching user info:', error);
            // Display custom alert
            const customAlert = document.createElement('div');
            customAlert.classList.add('custom-alert');
            customAlert.textContent = 'Error fetching user info. Please try again.';
            customAlert.style.backgroundColor = "red";
            customAlert.style.display = "block";

            document.body.appendChild(customAlert);

            // Hide the alert after three seconds
            setTimeout(() => {
                customAlert.style.display = 'none';
            }, 3000);
        });
}

// Call the fetchUserInfo function when the page loads
window.onload = function() {
    fetchUserInfo();
};

//When user click on update button
//update coach info
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var updateBtn = document.getElementById("updateButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
updateBtn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// When the user clicks on submit button
document.getElementById("submitUpdate").onclick = function() {
  // Create an object with the updated coach info
  const updatedCoachInfo = {
    firstName: document.getElementById("updatedFirstName").value,
    lastName: document.getElementById("updatedLastName").value,
    username: document.getElementById("updatedUsername").value,
    email: document.getElementById("updatedEmail").value,
    dateOfBirth: document.getElementById("updatedDateOfBirth").value,
    gender: document.getElementById("updatedGender").value,
    age: document.getElementById("updatedAge").value,
    certificate: document.getElementById("updatedCertificate").value,
    yearsOfExperience: document.getElementById("updatedYearsOfExperience").value,
  };

  // Get the user ID from the URL parameters
  const params = new URLSearchParams(window.location.search);
  const userId = params.get('id');
  
  const url = `http://localhost:3000/api/v1/coaches/update_coach/${userId}`;

  // Make a PUT request to backend API endpoint with the updated trainee info
  axios.put(url, updatedCoachInfo)
    .then(function (response) {
        // Handle success
        console.log('Coach Info Updated successfully:', response.data);
        // Display custom alert
        const customAlert = document.createElement('div');
        customAlert.classList.add('custom-alert');
        customAlert.innerHTML = 'Coach Info Updated successfully!';
        customAlert.style.backgroundColor = '#04a104'; // Degree of Green color
        customAlert.style.display = "block"

        document.body.appendChild(customAlert);

        // Hide the alert after three seconds
        setTimeout(() => {
            customAlert.style.display = 'none';
        }, 3000);

        // Optionally, you can fetch coach info again to update the displayed data
        fetchUserInfo();
    })
    .catch(function (error) {
        // Handle the error
        console.error('Error updating coach info:', error);

        // Display custom alert
        const customAlert = document.createElement('div');
        customAlert.classList.add('custom-alert');
        customAlert.textContent = 'Error updating coach info. Please try again.';
        customAlert.style.backgroundColor = "red";
        customAlert.style.display = "block";

        document.body.appendChild(customAlert);

        // Hide the alert after three seconds
        setTimeout(() => {
            customAlert.style.display = 'none';
        }, 3000);
    });

  // Close the modal after submitting
  modal.style.display = "none";
}





// When user click on delete button
document.getElementById("deleteButton").onclick = function() {
    
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');
    const url = `http://localhost:3000/api/v1/coaches/delete_coach/${userId}`;
    axios.delete(url)
        .then(function (response) {
            // Handle success
            console.log('User deleted from coach table :', response.data);

            // Display custom alert
            const customAlert = document.createElement('div');
            customAlert.classList.add('custom-alert');
            customAlert.innerHTML = 'User deleted successfully!<br>Redirecting to previous page...';
            customAlert.style.backgroundColor = '#04a104'; // Degree of Green color
            customAlert.style.display = "block";

            document.body.appendChild(customAlert);

            // Hide the alert after two seconds and redirect to coachingRequests page
            setTimeout(() => {
                customAlert.style.display = 'none';
                window.location.href = '../html/manageCoaches.html';
            }, 2000);
        })
        .catch(function (error) {
            // Handle the error
            console.error("Error during deleting user",error);

            // Display custom alert
            const customAlert = document.createElement('div');
            customAlert.classList.add('custom-alert');
            customAlert.textContent = 'Error deleting user. Please try again.';
            customAlert.style.backgroundColor = "red";
            customAlert.style.display = "block";

            document.body.appendChild(customAlert);

            // Hide the alert after two seconds
            setTimeout(() => {
                customAlert.style.display = 'none';
            }, 2000);
        });
}