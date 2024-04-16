//When user click on log Workouts Card
document.addEventListener('DOMContentLoaded', function() {
    // Get the logWorkoutsCard element
    const logWorkoutsCard = document.querySelector('.div-14');

    // Add click event listener to the logWorkoutsCard
    logWorkoutsCard.addEventListener('click', function(event) {
        // Navigate to the workouts page
        window.location.href = '../html/workouts.html';
    });
});



//When user click on recommended Exercises Card
document.addEventListener('DOMContentLoaded', function() {
    // Get the recommendedExercisesCard element
    const recommendedExercisesCard = document.querySelector('.div-17');

    // Add click event listener to the recommendedExercisesCard
    recommendedExercisesCard.addEventListener('click', function(event) {
        // Navigate to the recommendedBodyPart page
        window.location.href = '../html/recommendedBodyPart.html';
    });
});



//When user click on Exercise library Card
document.addEventListener('DOMContentLoaded', function() {
    // Get the ExerciseLibraryCard element
    const ExerciseLibraryCard = document.querySelector('.div-26');

    // Add click event listener to the recommendedExercisesCard
    ExerciseLibraryCard.addEventListener('click', function(event) {
        // Navigate to the ExerciseLibrary page
        window.location.href = '../html/exerciseLibrary.html';
    });
});