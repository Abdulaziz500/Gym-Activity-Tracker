//When user click on start-empty-workout-button
document.addEventListener('DOMContentLoaded', function() {
    // Get the start-empty-workout-button element
    const startEmptyWorkoutButton = document.querySelector('#start-empty-workout-btn');

    // Add click event listener to the startEmptyWorkoutButton
    startEmptyWorkoutButton.addEventListener('click', function(event) {
        // Navigate to the startEmptyWorkout page
        window.location.href = '../html/startEmptyWorkout.html';
    });
});





//get saved workouts from back-end
document.addEventListener("DOMContentLoaded", async function() {
    const savedWorkoutsContainer = document.getElementById("saved-workouts-container");
    const noWorkoutsMessage = document.getElementById("no-workouts-message");

    try {
        const url = 'http://localhost:3000/api/v1/workouts/get_workouts';
        const response = await axios.get(url);
        const data = response.data;
        console.log(data);

        if (data.length === 0) {
            // If there are no saved workouts, display the message
            noWorkoutsMessage.style.display = "block";
        } else {
            // If there are saved workouts, hide the message and populate the cards
            noWorkoutsMessage.style.display = "none";
            
            data.forEach(workout => {
                const workoutCard = document.createElement("div");
                workoutCard.classList.add("workout-card");
    
                const workoutName = document.createElement("div");
                workoutName.classList.add("workout-name");
                workoutName.textContent = workout.name;
                workoutCard.appendChild(workoutName);
    
                const workoutInfo = document.createElement("div");
                workoutInfo.classList.add("workout-info");
                workoutCard.appendChild(workoutInfo);
    
                workout.includes.forEach(includes => {
                    const exerciseInfo = document.createElement("div");
                    exerciseInfo.classList.add("exercise-info");
                    exerciseInfo.textContent = `${includes.exercise.name}: ${includes.exercise.sets.length} sets`;
                    workoutInfo.appendChild(exerciseInfo);
                });
    
                const startWorkoutBtn = document.createElement('button');
                startWorkoutBtn.classList.add('start-workout-btn');
                startWorkoutBtn.textContent = 'Start Workout';
    
                const deleteWorkoutBtn = document.createElement('button');
                deleteWorkoutBtn.classList.add('delete-workout-btn');
                deleteWorkoutBtn.textContent = 'Delete';
    
                workoutCard.appendChild(startWorkoutBtn);
                workoutCard.appendChild(deleteWorkoutBtn);
    
                savedWorkoutsContainer.appendChild(workoutCard);
            });
        }
    } catch (error) {
        console.error("Error fetching workouts:", error);
    }
});