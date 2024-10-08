//When user click on set up Workouts Card
document.addEventListener('DOMContentLoaded', function() {
    // Get the logWorkoutsCard element
    const logWorkoutsCard = document.querySelector('.div-14');

    // Add click event listener to the logWorkoutsCard
    logWorkoutsCard.addEventListener('click', function(event) {
        // Navigate to the workouts page
        window.location.href = '../html/coachWorkouts.html';
    });
});



//When user click on Communicate with Trainee Card
document.addEventListener('DOMContentLoaded', function() {
    // Get the Communicate with Trainee Card element
    const CommunicateWithTraineeCard = document.querySelector('.div-20');

    // Add click event listener to the CommunicateWithCoachCard
    CommunicateWithTraineeCard.addEventListener('click', function(event) {
        // Navigate to the chatroom page
        window.location.href = '../html/chatCoach.html';
    });
});



//When user click on Exercise library Card
document.addEventListener('DOMContentLoaded', function() {
    // Get the ExerciseLibraryCard element
    const ExerciseLibraryCard = document.querySelector('.div-26');

    // Add click event listener to the recommendedExercisesCard
    ExerciseLibraryCard.addEventListener('click', function(event) {
        // Navigate to the ExerciseLibrary page
        window.location.href = '../html/coachExerciseLibrary.html';
    });
});

//When user click on track Progress Card
document.addEventListener('DOMContentLoaded', function() {
    // Get the ExerciseLibraryCard element
    const trackProgressCard = document.querySelector('.div-23');

    // Add click event listener to the recommendedExercisesCard
    trackProgressCard.addEventListener('click', function(event) {
        // Navigate to the ExerciseLibrary page
        window.location.href = '../html/trackProgress.html';
    });
});




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