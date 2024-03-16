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