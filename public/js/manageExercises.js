const url = 'http://localhost:3000/api/v1/exercises/get_exercises';

getExercises();

function getExercises() {
    //Fetch exercise data from backend
    axios.get(url)
    .then(function (response) {
        // Handle success
        const exercises = response.data;
        console.log(exercises);

        // Populate exercise cards
        const exerciseLibrary = document.getElementById('exercise-library');

        // Clear previous exercise cards
        exerciseLibrary.innerHTML = '';

        exercises.forEach(function(exercise) {
            const exerciseCard = document.createElement('div');
            exerciseCard.classList.add('exercise-card');
            exerciseCard.setAttribute('data-id', exercise.id); // Set exercise ID as data attribute

            const exerciseImage = document.createElement('img');
            exerciseImage.src = exercise.imagePath;
            exerciseImage.alt = exercise.name;

            const exerciseName = document.createElement('h2');
            exerciseName.textContent = exercise.name;

            exerciseCard.appendChild(exerciseImage);
            exerciseCard.appendChild(exerciseName);
            exerciseLibrary.appendChild(exerciseCard);
        });

        // Add click event listener to exercise cards
        const exerciseCards = document.querySelectorAll('.exercise-card');
        exerciseCards.forEach(function(card) {
            card.addEventListener('click', function() {
                const exerciseId = card.getAttribute('data-id');
                window.location.href = `../html/manageProfileExercise.html?id=${exerciseId}`; // Navigate to exercise details page with exercise ID as a parameter
            });
        });
    })
    .catch(function (error) {
    // Handle error
    console.error('Error fetching exercises:', error);
    });
}