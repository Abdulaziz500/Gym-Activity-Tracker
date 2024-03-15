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
            <td><input type="number"></td>
            <td><input type="number"></td>
            <td><input type="checkbox"></td>
            <td><button class="delete-set-btn">Delete Set</button></td>
        `;
        
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
        // Create a new exercise container
        const newExercise = document.createElement('div');
        newExercise.classList.add('exercise');
        newExercise.innerHTML = `
            <h2>Exercise ${document.querySelectorAll('.exercise').length + 1}</h2>
            <button class="add-set-btn">Add Set</button>
            <table>
                <tr>
                    <th>Set</th>
                    <th>Kg</th>
                    <th>Reps</th>
                    <th>Done?</th>
                    <th>Action</th>
                </tr>
                <tr class="set-row">
                    <td>1</td>
                    <td><input type="number"></td>
                    <td><input type="number"></td>
                    <td><input type="checkbox"></td>
                    <td><button class="delete-set-btn">Delete Set</button></td>
                </tr>
            </table>
            <button class="delete-exercise-btn">Delete Exercise</button>
        `;
        
        // Add event listener to the new "Add Set" button
        const newAddSetButton = newExercise.querySelector('.add-set-btn');
        newAddSetButton.addEventListener('click', addSet);
        
        // Add event listener to the new "Delete Exercise" button
        const newDeleteExerciseButton = newExercise.querySelector('.delete-exercise-btn');
        newDeleteExerciseButton.addEventListener('click', deleteExercise);
        
        // Insert the new exercise before the "Add Exercise" button
        const exerciseContainer = document.getElementById('exercise-container');
        exerciseContainer.appendChild(newExercise);
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



function showCustomAlert() {
    const alertBox = document.querySelector('.custom-alert');
    alertBox.style.display = 'block';
    
    const closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', function() {
        alertBox.style.display = 'none';
    });
}