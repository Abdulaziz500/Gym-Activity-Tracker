// Function to fetch trainee info
function fetchCoachInfo() {
    // Get user id from local storage
    const userData = JSON.parse(localStorage.getItem('user'));
    const coachId = userData.id;
    // Make a GET request to your backend API endpoint
    const url = `http://localhost:3000/api/v1/coaches/get_coach/${coachId}`;
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
            console.error('Error fetching coach info:', error);
            // Display custom alert
            const customAlert = document.createElement('div');
            customAlert.classList.add('custom-alert');
            customAlert.textContent = 'Error fetching coach info. Please try again.';
            customAlert.style.backgroundColor = "red";
            customAlert.style.display = "block";

            document.body.appendChild(customAlert);

            // Hide the alert after three seconds
            setTimeout(() => {
                customAlert.style.display = 'none';
            }, 3000);
        });
}


// to update coach info
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("updateButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
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

  // Get user id from local storage
  const userData = JSON.parse(localStorage.getItem('user'));
  const coachId = userData.id;
  
  const url = `http://localhost:3000/api/v1/coaches/update_coach/${coachId}`;

  // Make a PUT request to backend API endpoint with the updated coach info
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

        // Optionally, you can fetch trainee info again to update the displayed data
        fetchCoachInfo();
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



// Call the fetchTraineeInfo function when the page loads
window.onload = function() {
    fetchCoachInfo();
};










// when user click on (others) link
document.getElementById('othersLink').addEventListener('click', function(e) {
  e.preventDefault(); // Prevent the default link behavior
  var othersOptions = document.getElementById('othersOptions');
  if (othersOptions.style.display === 'none') {
      othersOptions.style.display = 'block';
  } else {
      othersOptions.style.display = 'none';
  }
});