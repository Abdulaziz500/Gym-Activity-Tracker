function get_exercise() {
    // Get the exercise ID from the URL parameters
    const params = new URLSearchParams(window.location.search);
    const exerciseId = params.get('id');

    // Fetch exercise details using exercise ID from URL parameter
    axios.get(`http://localhost:3000/api/v1/exercises/get_exercise/${exerciseId}`)
        .then(function(response) {
            const exercise = response.data;
            console.log(exercise);
            document.getElementById('exercise-image').src = exercise.imagePath;
            document.getElementById('exercise-name').textContent = exercise.name;
            document.getElementById('exercise-difficulty').textContent = exercise.difficulty;
            document.getElementById('exercise-equipment').textContent = exercise.equipment;
            document.getElementById('exercise-muscle').textContent = exercise.muscle;
            document.getElementById('exercise-type').textContent = exercise.type;
            document.getElementById('exercise-instructions').textContent = exercise.instructions;
        })
        .catch(function(error) {
            console.error('Error fetching exercise details:', error);
        });
}

// to update trainee info
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
  // Create an object with the updated trainee info
  const updatedExerciseInfo = {
    exerciseName: document.getElementById("updatedExerciseName").value,
    difficulty: document.getElementById("updatedDifficulty").value,
    equipment: document.getElementById("updatedEquipment").value,
    muscle: document.getElementById("updatedMuscle").value,
    type: document.getElementById("updatedType").value,
    instructions: document.getElementById("updatedInstructions").value
  };


    // Get the user ID from the URL parameters
    const params = new URLSearchParams(window.location.search);
    const exerciseId = params.get('id');
  
  const url = `http://localhost:3000/api/v1/exercises/update_exercise/${exerciseId}`;

  axios.put(url, updatedExerciseInfo)
    .then(function (response) {
        // Handle success
        console.log('Exercise Info Updated successfully:', response.data);
        // Display custom alert
        const customAlert = document.createElement('div');
        customAlert.classList.add('custom-alert');
        customAlert.innerHTML = 'Exercise Info Updated successfully!';
        customAlert.style.backgroundColor = '#04a104'; // Degree of Green color
        customAlert.style.display = "block"

        document.body.appendChild(customAlert);

        // Hide the alert after three seconds
        setTimeout(() => {
            customAlert.style.display = 'none';
        }, 3000);

        // Optionally, you can fetch exercise info again to update the displayed data
        get_exercise();
    })
    .catch(function (error) {
        // Handle the error
        console.error('Error updating exercise info:', error);

        // Display custom alert
        const customAlert = document.createElement('div');
        customAlert.classList.add('custom-alert');
        customAlert.textContent = 'Error updating exercise info. Please try again.';
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
    const exerciseId = params.get('id');
    const url = `http://localhost:3000/api/v1/exercises/delete_exercise/${exerciseId}`;
    axios.delete(url)
        .then(function (response) {
            // Handle success
            console.log('Exercise deleted from exercise table :', response.data);

            // Display custom alert
            const customAlert = document.createElement('div');
            customAlert.classList.add('custom-alert');
            customAlert.innerHTML = 'Exercise deleted successfully!<br>Redirecting to previous page...';
            customAlert.style.backgroundColor = '#04a104'; // Degree of Green color
            customAlert.style.display = "block";

            document.body.appendChild(customAlert);

            // Hide the alert after two seconds and redirect to coachingRequests page
            setTimeout(() => {
                customAlert.style.display = 'none';
                window.location.href = '../html/manageExercises.html';
            }, 2000);
        })
        .catch(function (error) {
            // Handle the error
            console.error("Error during deleting exercise",error);

            // Display custom alert
            const customAlert = document.createElement('div');
            customAlert.classList.add('custom-alert');
            customAlert.textContent = 'Error deleting exercise. Please try again.';
            customAlert.style.backgroundColor = "red";
            customAlert.style.display = "block";

            document.body.appendChild(customAlert);

            // Hide the alert after two seconds
            setTimeout(() => {
                customAlert.style.display = 'none';
            }, 2000);
        });
}


// Call the fetchTraineeInfo function when the page loads
window.onload = function() {
    get_exercise();
};