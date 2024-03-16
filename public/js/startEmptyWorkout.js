document.addEventListener('DOMContentLoaded', function() {
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
        const url = 'https://api.api-ninjas.com/v1/exercises';

        axios.get(url, {
            headers: {
                'X-Api-Key': '+FKKTzZrSAqvFlAZf2zddg==9Pu70bnuEer0iXMz',
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
                                <td><button class="rest-timer-btn" onclick="displayRestTimerModal(60)">Rest Timer</button></td>
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

                    // Insert the new exercise before the "Add Exercise" button
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
            console.error('Error:', error);
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
        // Handle finishing workout
        alert('Workout Finished!');
    });
    
    // Event listener for "Cancel Workout" button
    document.getElementById('cancel-workout-btn').addEventListener('click', function() {
        // Handle cancelling workout
        alert('Workout Cancelled!');
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