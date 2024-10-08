document.addEventListener('DOMContentLoaded', function() {

    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.size !== 0){
        getSavedWorkoutData()
    }

    // get information for the saved workout that user clicked on from 'workouts.html' page
    function getSavedWorkoutData() {
        const workoutId = urlParams.get('id');
        const url = `http://localhost:3000/api/v1/workouts/get_workout/${workoutId}`;
    
        axios.get(url)
            .then(response => {
                const workout = response.data;
                console.log(workout);
    
                // Populate the form fields with the workout data
                const workoutNameInput = document.getElementById('workout-name');
                workoutNameInput.value = workout.name;
    
                // Loop through each exercise in the workout
                workout.includes.forEach(exercise => {
                    // Create a new exercise container
                    const newExercise = document.createElement('div');
                    newExercise.classList.add('exercise');
                    newExercise.innerHTML = `
                        <h2>${exercise.exercise.name}</h2>
                        <button class="add-set-btn">Add Set</button>
                        <table>
                            <tr>
                                <th>Set</th>
                                <th>Kg</th>
                                <th>Reps</th>
                                <th>Done?</th>
                                <th>Action</th>
                                <th>Action</th>
                            </tr>
                        </table>
                        <button class="delete-exercise-btn">Delete Exercise</button>
                    `;
    
                    // Loop through each set in the exercise
                    exercise.exercise.sets.forEach(set => {
                        // Create a new row for each set
                        const setRow = document.createElement('tr');
                        setRow.classList.add('set-row');
                        setRow.innerHTML = `
                            <td>${set.setNumber}</td>
                            <td><input type="number" id="weight" value="${set.weight}"></td>
                            <td><input type="number" id="reps" value="${set.reps}"></td>
                            <td><input type="checkbox" ></td>
                            <td><button class="delete-set-btn">Delete Set</button></td>
                            <td><button class="rest-timer-btn" onclick="displayRestTimerModal(90)">Rest Timer</button></td>
                        `;
    
                        // Add event listener to checkboxes
                        const checkbox = setRow.querySelector('input[type="checkbox"]');
                        checkbox.addEventListener('change', function() {
                            // Get the corresponding Reps input field
                            const repsInput = this.closest('.set-row').querySelector('#reps');
    
                            // Check if Reps input field has a value
                            if (repsInput.value.trim() === '') {
                                // Add red border to Reps input field if it's empty
                                repsInput.style.border = '1px solid red';
    
                                // Set focus to Reps input field
                                repsInput.focus();
    
                                // If Reps input field is empty, prevent checkbox from being checked
                                this.checked = false;
                            } else {
                                // Remove red border from Reps input field if it's not empty
                                repsInput.style.border = 'inherit';
    
                                // Check if checkbox is checked
                                if (this.checked) {
                                    // Add class to parent row
                                    this.closest('.set-row').classList.add('done');
                                } else {
                                    // Remove class from parent row
                                    this.closest('.set-row').classList.remove('done');
                                }
                            }
                        });
    
                        // Append the new set row to the table
                        newExercise.querySelector('table').appendChild(setRow);
                    });
    
                    // Add event listener to the new "Add Set" button
                    const newAddSetButton = newExercise.querySelector('.add-set-btn');
                    newAddSetButton.addEventListener('click', addSet);
    
                    // Add event listener to the new "Delete Exercise" button
                    const newDeleteExerciseButton = newExercise.querySelector('.delete-exercise-btn');
                    newDeleteExerciseButton.addEventListener('click', deleteExercise);
    
                    // Insert the new exercise into the exercise container
                    const exerciseContainer = document.getElementById('exercise-container');
                    exerciseContainer.appendChild(newExercise);
                });
    
            })
            .catch(error => {
                console.error('Error fetching workout data:', error);
            });
    }
    





    const editWorkoutBtn = document.getElementById('edit-workout-name');
    const workoutNameInput = document.getElementById('workout-name');

    editWorkoutBtn.addEventListener('click', function() {
        if (workoutNameInput.disabled) {
            workoutNameInput.disabled = false;
            workoutNameInput.focus();
            editWorkoutBtn.textContent = 'Save';
        } else {
            workoutNameInput.disabled = true;
            editWorkoutBtn.textContent = 'Edit Name';
        }
    });

    workoutNameInput.addEventListener('blur', function() {
        workoutNameInput.disabled = true;
        editWorkoutBtn.textContent = 'Edit Name';
    });

    // Workout Timer
    const timerElement = document.getElementById('timer');
    let totalSeconds = 0;

    function pad(val) {
        return val > 9 ? val : "0" + val;
    }

    setInterval(function() {
        ++totalSeconds;
        timerElement.textContent = pad(parseInt(totalSeconds / 60, 10)) + ":" + pad(totalSeconds % 60);
    }, 1000);


    
    // Function to handle adding a new set
    function addSet() {
        // Get the table of the current exercise
        const table = this.closest('.exercise').querySelector('table');
        
        // Find the last set number
        const lastSetNumber = table.querySelectorAll('.set-row').length;
        
        // Create a new row for the set
        const newRow = document.createElement('tr');
        newRow.classList.add('set-row');
        newRow.innerHTML = `
            <td>${lastSetNumber + 1}</td>
            <td><input type="number" id="weight"></td>
            <td><input type="number" id="reps"></td>
            <td><input type="checkbox"></td>
            <td><button class="delete-set-btn">Delete Set</button></td>
            <td><button class="rest-timer-btn" onclick="displayRestTimerModal(60)">Rest Timer</button></td>
        `;

        // Add event listener to checkboxes
        const checkboxes = newRow.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                // Get the corresponding Reps input field
                const repsInput = this.closest('.set-row').querySelector('#reps');

                // Check if Reps input field has a value
                if (repsInput.value.trim() === '') {
                    // Add red border to Reps input field if it's empty
                    repsInput.style.border = '1px solid red';

                    // Set focus to Reps input field
                    repsInput.focus();

                    // If Reps input field is empty, prevent checkbox from being checked
                    this.checked = false;
                } else {
                    // Remove red border from Reps input field if it's not empty
                    repsInput.style.border = 'inherit';

                    // Check if checkbox is checked
                    if (this.checked) {
                        // Add class to parent row
                        this.closest('.set-row').classList.add('done');
                    } else {
                        // Remove class from parent row
                        this.closest('.set-row').classList.remove('done');
                    }
                }
            });
        });
        
        // Append the new row to the table
        table.appendChild(newRow);
    }
    
    // Add event listener to the "Add Set" buttons
    const addSetButtons = document.querySelectorAll('.add-set-btn');
    addSetButtons.forEach(button => {
        button.addEventListener('click', addSet);
    });

    // Add event listener to the parent element of "Delete Set" buttons
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-set-btn')) {
            deleteSet(event.target);
        }
    });

    // Function to handle deleting a set
    function deleteSet(button) {
        // Find the closest ancestor element with the class 'set-row'
        const setRow = button.closest('.set-row');
        if (setRow) {
            // Find the closest ancestor element with the class 'exercise'
            const exercise = setRow.closest('.exercise');
            
            // Find the last set number within the exercise
            const lastSetNumber = exercise.querySelectorAll('.set-row').length;
            
            // Remove the row of the deleted set
            if (lastSetNumber > 1) {
                setRow.remove();
            } else if (lastSetNumber <= 1) {
                // Display a message informing the user that at least one set is required
                showCustomAlert();
            }
        } else {
            console.error("Error: Could not find ancestor element with class 'set-row'.");
        }
    }





    

    // Function to handle adding a new exercise
    function addExercise() {
        const url = 'http://localhost:3000/api/v1/exercises/get_exercises';

        axios.get(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            // Handle successful response from the server
            console.log('Success:', response.data);
            let exercises = response.data;
            console.log(exercises);

            // Create a modal for exercise selection
            let modal = document.createElement('div');
            modal.classList.add('exercise-modal');

            // Create a container for the exercise list
            let exerciseList = document.createElement('ul');
            exerciseList.classList.add('exercise-list');

            // Create list items for each exercise
            exercises.forEach(exercise => {
                let listItem = document.createElement('li');
                listItem.textContent = exercise.name;
                listItem.classList.add('exercise-item');

                // Add click event listener to select the exercise
                listItem.addEventListener('click', () => {
                    // Create a new exercise container
                    const newExercise = document.createElement('div');
                    newExercise.classList.add('exercise');
                    newExercise.innerHTML = `
                        <h2>${exercise.name}</h2>
                        <button class="add-set-btn">Add Set</button>
                        <table>
                            <tr>
                                <th>Set</th>
                                <th>Kg</th>
                                <th>Reps</th>
                                <th>Done?</th>
                                <th>Action</th>
                                <th>Action</th>
                            </tr>
                            <tr class="set-row">
                                <td>1</td>
                                <td><input type="number" id="weight"></td>
                                <td><input type="number" id="reps"></td>
                                <td><input type="checkbox"></td>
                                <td><button class="delete-set-btn">Delete Set</button></td>
                                <td><button class="rest-timer-btn" onclick="displayRestTimerModal(90)">Rest Timer</button></td>
                            </tr>
                        </table>
                        <button class="delete-exercise-btn">Delete Exercise</button>
                    `;

                    // Add event listener to checkboxes
                    const checkboxes = newExercise.querySelectorAll('input[type="checkbox"]');
                    checkboxes.forEach(checkbox => {
                        checkbox.addEventListener('change', function() {
                            // Get the corresponding Reps input field
                            const repsInput = this.closest('.set-row').querySelector('#reps');

                            // Check if Reps input field has a value
                            if (repsInput.value.trim() === '') {
                                // Add red border to Reps input field if it's empty
                                repsInput.style.border = '1px solid red';

                                // Set focus to Reps input field
                                repsInput.focus();

                                // If Reps input field is empty, prevent checkbox from being checked
                                this.checked = false;
                            } else {
                                // Remove red border from Reps input field if it's not empty
                                repsInput.style.border = 'inherit';

                                // Check if checkbox is checked
                                if (this.checked) {
                                    // Add class to parent row
                                    this.closest('.set-row').classList.add('done');
                                } else {
                                    // Remove class from parent row
                                    this.closest('.set-row').classList.remove('done');
                                }
                            }
                        });
                    });

                    // Add event listener to the new "Add Set" button
                    const newAddSetButton = newExercise.querySelector('.add-set-btn');
                    newAddSetButton.addEventListener('click', addSet);

                    // Add event listener to the new "Delete Exercise" button
                    const newDeleteExerciseButton = newExercise.querySelector('.delete-exercise-btn');
                    newDeleteExerciseButton.addEventListener('click', deleteExercise);

                    // Insert the new exercise into the exercise container
                    const exerciseContainer = document.getElementById('exercise-container');
                    exerciseContainer.appendChild(newExercise);

                    // Close the modal
                    modal.remove();
                });

                exerciseList.appendChild(listItem);
            });

            // Append the exercise list to the modal
            modal.appendChild(exerciseList);

            // Append the modal to the body
            document.body.appendChild(modal);

        })
        .catch(error => {
            // Handle errors during the Axios request
            console.error('Error during the request:', error);
            // Display custom alert
            const customAlert = document.createElement('div');
            customAlert.classList.add('custom-alert');
            customAlert.textContent = 'Error during the request';
            customAlert.style.backgroundColor = "red";
            customAlert.style.display = "block";

            document.body.appendChild(customAlert);

            // Hide the alert after three seconds
            setTimeout(() => {
                customAlert.style.display = 'none';
            }, 3000);
        });
    }
    
    // Event listener for "Add Exercise" button
    document.getElementById('add-exercise-btn').addEventListener('click', addExercise);
    
    // Function to handle deleting an exercise
    function deleteExercise() {
        // Remove the exercise
        this.closest('.exercise').remove();
    }
    
    // Event listener for "Finish Workout" button
    document.getElementById('finish-workout-btn').addEventListener('click', function() {
        saveWorkoutData();
    });
    
    // Event listener for "Cancel Workout" button
    document.getElementById('cancel-workout-btn').addEventListener('click', function() {
        window.location.href = '../html/workouts.html';
    });
});





//Define the function to display the modal:
function displayRestTimerModal(durationInSeconds) {
    // Display the modal in the middle of the screen
    const modal = document.createElement('div');
    modal.classList.add('rest-timer-modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn" onclick="closeRestTimerModal()">&times;</span>
            <h2>Rest Timer</h2>
            <div id="rest-timer">01:00</div>
        </div>
    `;
    document.body.appendChild(modal);

    // Call startRestTimer function with the specified duration
    startRestTimer(durationInSeconds);
}
function startRestTimer(durationInSeconds) {
    // Get the timer display element
    const timerDisplay = document.getElementById('rest-timer');

    // Calculate the end time by adding the duration to the current time
    const endTime = new Date().getTime() + (durationInSeconds * 1000);

    // Update the timer display every second
    const timerInterval = setInterval(updateTimer, 1000);

    // Initial update of the timer display
    updateTimer();

    function updateTimer() {
        // Calculate the remaining time
        const currentTime = new Date().getTime();
        const remainingTime = endTime - currentTime;

        // Check if the timer has reached zero
        if (remainingTime <= 0) {
            // Stop the timer interval
            clearInterval(timerInterval);
            // Update the timer display to show 00:00 when time is up
            timerDisplay.textContent = '00:00';
            // Add logic here to handle what happens when the timer ends
            // For example, close the modal or perform another action
        } else {
            // Convert remaining time to minutes and seconds
            const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

            // Format the time as MM:SS
            const formattedTime = `${pad(minutes)}:${pad(seconds)}`;

            // Update the timer display
            timerDisplay.textContent = formattedTime;
        }
    }

    // Helper function to pad single digits with leading zero
    function pad(num) {
        return num < 10 ? '0' + num : num;
    }
}


//Define the function to close the modal:
function closeRestTimerModal() {
    const modal = document.querySelector('.rest-timer-modal');
    if (modal) {
        modal.remove();
    }
} 







function showCustomAlert() {
    const alertBox = document.querySelector('.custom-alert');
    alertBox.style.display = 'block';
    
    const closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', function() {
        alertBox.style.display = 'none';
    });
}















// assemble workout data and send it to back-end when user click on "Finish Workout" button



// Function to assemble workout data
function assembleWorkoutData() {
    // Get workout name from input field
    const workoutName = document.getElementById('workout-name').value;
  
    // Get workout duration from timer
    const timerValue = document.getElementById('timer').textContent;
    const durationInSeconds = convertTimeToSeconds(timerValue);
  
    // Get user data from local storage
    const userData = JSON.parse(localStorage.getItem('user'));
  
    // Gather exercise data from the DOM
    const exercises = [];
    const exerciseElements = document.querySelectorAll('.exercise');
    exerciseElements.forEach(exerciseElement => {
      const exerciseName = exerciseElement.querySelector('h2').textContent;
      const sets = [];
      const setRows = exerciseElement.querySelectorAll('.set-row');
      setRows.forEach(setRow => {
        const setNumber = setRow.querySelector('td:nth-child(1)').textContent;
        const weight = setRow.querySelector('#weight').value;
        const reps = setRow.querySelector('#reps').value;
        const done = setRow.querySelector('input[type="checkbox"]').checked;
        sets.push({ setNumber, weight, reps, done });
      });
      exercises.push({ name: exerciseName, sets });
    });
  
    // Assemble the workout data
    const workoutData = {
      name: workoutName,
      duration: durationInSeconds,
      user: userData,
      includes: exercises
    };
  
    return workoutData;
  }
  
  // Function to convert time string (mm:ss) to seconds
  function convertTimeToSeconds(timeString) {
    const [minutes, seconds] = timeString.split(':').map(Number);
    return minutes * 60 + seconds;
  }
  
  // Function to send POST request
  function saveWorkoutData() {
    // Assemble workout data
    const workoutData = assembleWorkoutData();

    // Check if there are exercises, sets, or includes
    if (workoutData.includes.length === 0) {
        // Display custom alert
        const customAlert = document.createElement('div');
        customAlert.classList.add('custom-alert');
        customAlert.textContent = 'No exercises found. Cannot save workout.';
        customAlert.style.backgroundColor = "red";
        customAlert.style.display = "block";

        document.body.appendChild(customAlert);

        // Hide the alert after three seconds
        setTimeout(() => {
            customAlert.style.display = 'none';
        }, 3000);

        console.error('No exercises found. Cannot save workout.');
        return; // Prevent sending the request
    }
  
    // Send POST request to backend
    const url = 'http://localhost:3000/api/v1/workouts/create_workout';
  
    axios.post(url, workoutData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
        // Handle success
        console.log('Workout stored successfully:', response.data);
        // Display custom alert
        const customAlert = document.createElement('div');
        customAlert.classList.add('custom-alert');
        customAlert.innerHTML = 'Workout stored successfully!<br>Redirecting to previous page...';
        customAlert.style.backgroundColor = '#04a104'; // Degree of Green color
        customAlert.style.display = "block"

        document.body.appendChild(customAlert);

        // Hide the alert after three seconds
        setTimeout(() => {
            customAlert.style.display = 'none';
        }, 3000);

        // Redirect user to "workouts" page after three seconds
        setTimeout(() => {
            window.location.href = '../html/workouts.html';
        }, 3000);
    })
    .catch(error => {
        // Handle errors
        console.error('Error storing workout:', error);
        // Display custom alert
        const customAlert = document.createElement('div');
        customAlert.classList.add('custom-alert');
        customAlert.textContent = 'Error storing workout';
        customAlert.style.backgroundColor = "red";
        customAlert.style.display = "block";

        document.body.appendChild(customAlert);

        // Hide the alert after three seconds
        setTimeout(() => {
            customAlert.style.display = 'none';
        }, 3000);
        
    });
}









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