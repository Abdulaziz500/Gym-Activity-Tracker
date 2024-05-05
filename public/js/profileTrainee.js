// Function to fetch trainee info
function fetchTraineeInfo() {
    // Get user id from local storage
    const userData = JSON.parse(localStorage.getItem('user'));
    const traineeId = userData.id;
    // Make a GET request to your backend API endpoint
    const url = `http://localhost:3000/api/v1/trainees/get_trainee/${traineeId}`;
    axios.get(url)
        .then(function (response) {
            // Handle the successful response
            const traineeData = response.data;
            console.log(traineeData);
            // Update the HTML elements with the fetched trainee info
            document.getElementById('firstName').textContent = traineeData.firstName;
            document.getElementById('lastName').textContent = traineeData.lastName;
            document.getElementById('username').textContent = traineeData.username;
            document.getElementById('email').textContent = traineeData.email;
            document.getElementById('userRole').textContent = traineeData.userRole;
            document.getElementById('dateOfBirth').textContent = traineeData.dateOfBirth;
            document.getElementById('gender').textContent = traineeData.gender;
            document.getElementById('age').textContent = traineeData.age;
            document.getElementById('weight').textContent = traineeData.weight;
            document.getElementById('height').textContent = traineeData.height;
        })
        .catch(function (error) {
            // Handle the error
            console.error('Error fetching trainee info:', error);
            // Display custom alert
            const customAlert = document.createElement('div');
            customAlert.classList.add('custom-alert');
            customAlert.textContent = 'Error fetching trainee info. Please try again.';
            customAlert.style.backgroundColor = "red";
            customAlert.style.display = "block";

            document.body.appendChild(customAlert);

            // Hide the alert after three seconds
            setTimeout(() => {
                customAlert.style.display = 'none';
            }, 3000);
        });
}


// to update trainee info
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
  // Create an object with the updated trainee info
  const updatedTraineeInfo = {
    firstName: document.getElementById("updatedFirstName").value,
    lastName: document.getElementById("updatedLastName").value,
    username: document.getElementById("updatedUsername").value,
    email: document.getElementById("updatedEmail").value,
    dateOfBirth: document.getElementById("updatedDateOfBirth").value,
    gender: document.getElementById("updatedGender").value,
    age: document.getElementById("updatedAge").value,
    weight: document.getElementById("updatedWeight").value,
    height: document.getElementById("updatedHeight").value,
  };

  // Get user id from local storage
  const userData = JSON.parse(localStorage.getItem('user'));
  const traineeId = userData.id;
  
  const url = `http://localhost:3000/api/v1/trainees/update_trainee/${traineeId}`;

  // Make a PUT request to backend API endpoint with the updated trainee info
  axios.put(url, updatedTraineeInfo)
    .then(function (response) {
        // Handle success
        console.log('Trainee Info Updated successfully:', response.data);
        // Display custom alert
        const customAlert = document.createElement('div');
        customAlert.classList.add('custom-alert');
        customAlert.innerHTML = 'Trainee Info Updated successfully!';
        customAlert.style.backgroundColor = '#04a104'; // Degree of Green color
        customAlert.style.display = "block"

        document.body.appendChild(customAlert);

        // Hide the alert after three seconds
        setTimeout(() => {
            customAlert.style.display = 'none';
        }, 3000);

        // Optionally, you can fetch trainee info again to update the displayed data
        fetchTraineeInfo();
    })
    .catch(function (error) {
        // Handle the error
        console.error('Error updating trainee info:', error);

        // Display custom alert
        const customAlert = document.createElement('div');
        customAlert.classList.add('custom-alert');
        customAlert.textContent = 'Error updating trainee info. Please try again.';
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
    fetchTraineeInfo();
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