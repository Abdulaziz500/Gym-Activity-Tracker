get_exercise()

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