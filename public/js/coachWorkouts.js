//When user click on start-empty-workout-button
document.addEventListener('DOMContentLoaded', function() {
    // Get the start-empty-workout-button element
    const startEmptyWorkoutButton = document.querySelector('#start-empty-workout-btn');

    // Add click event listener to the startEmptyWorkoutButton
    startEmptyWorkoutButton.addEventListener('click', function(event) {
        // Navigate to the startEmptyWorkout page
        window.location.href = '../html/coachStartEmptyWorkout.html';
    });
});

getSavedWorkouts();

function getSavedWorkouts() {

    //get saved workouts from back-end
    document.addEventListener("DOMContentLoaded", async function() {
        const savedWorkoutsContainer = document.getElementById("saved-workouts-container");
        const noWorkoutsMessage = document.getElementById("no-workouts-message");
        // Get user id from local storage
        const userData = JSON.parse(localStorage.getItem('user'));
        const userId = userData.id;
        const userRole = userData.userRole;
        try {
            const url = `http://localhost:3000/api/v1/workouts/get_trainee_workouts/${userId}/${userRole}`;
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
                    workoutCard.setAttribute("data-id", workout.id);
        
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


                // Add event listener to the "Start Workout" button of each workout card
                const workoutCards = document.querySelectorAll('.workout-card');
                workoutCards.forEach(function(card) {
                    const startWorkoutBtn = card.querySelector('.start-workout-btn');
                    const deleteWorkoutBtn = card.querySelector('.delete-workout-btn');

                    startWorkoutBtn.addEventListener('click', function() {
                        // Get the workout ID from the workout card
                        const workoutId = card.getAttribute('data-id');

                        // Navigate to startEmptyWorkout.html with the workout ID as a parameter
                        window.location.href = `../html/coachStartEmptyWorkout.html?id=${workoutId}`;
                    });

                    // Add event listener for delete button if needed
                    deleteWorkoutBtn.addEventListener('click', function() {
                        const workoutId = card.getAttribute('data-id');
                        deleteWorkout(workoutId);
                    });
                });
            }
        } catch (error) {
            console.error("Error fetching workouts:", error);
        }
    });
}


function deleteWorkout(workoutId) {
    const url = `http://localhost:3000/api/v1/workouts/delete_workout/${workoutId}`;

    axios.delete(url)
        .then(response => {
            // Handle success
            console.log('Workout deleted successfully:', response.data);
            // Display custom alert
            const customAlert = document.createElement('div');
            customAlert.classList.add('custom-alert');
            customAlert.innerHTML = 'Workout deleted successfully!';
            customAlert.style.backgroundColor = '#04a104'; // Degree of Green color
            customAlert.style.display = "block"

            document.body.appendChild(customAlert);

            // Remove the workout card from the DOM
            const workoutCard = document.querySelector(`.workout-card[data-id="${workoutId}"]`);
            if(workoutCard) {
                workoutCard.remove();
            }
            
            // Hide the alert after three seconds
            setTimeout(() => {
                customAlert.style.display = 'none';
            }, 3000);
        })
        .catch(error => {
            // Handle errors during the Axios request
            console.error('Error during the delete request:', error);
            // Display custom alert
            const customAlert = document.createElement('div');
            customAlert.classList.add('custom-alert');
            customAlert.textContent = 'Error during the delete request. Please try again.';
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