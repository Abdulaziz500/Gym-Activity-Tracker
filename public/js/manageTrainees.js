const url = 'http://localhost:3000/api/v1/trainees/get_trainees';

getTrainees();

function getTrainees() {
    axios.get(url)
        .then(function (response) {
            const trainees = response.data;
            console.log(trainees);


            const manageTrainees = document.getElementById('manage-trainees');
            manageTrainees.innerHTML = '';

            if(trainees.length === 0) {
                const noTraineesMessage = document.createElement('div');
                noTraineesMessage.textContent = 'No trainee found.';
                manageTrainees.appendChild(noTraineesMessage);
            }else{
                trainees.forEach(function(trainee) {
                    const traineeCard = document.createElement('div');
                    traineeCard.classList.add('trainee-card');
                    traineeCard.setAttribute('data-id', trainee.id);
    
                    const traineeName = document.createElement('h2');
                    traineeName.textContent = trainee.firstName + ' ' + trainee.lastName;
    
                    traineeCard.appendChild(traineeName);
                    manageTrainees.appendChild(traineeCard);
                });
    
                // Add click event listener to coach cards
                const traineeCards = document.querySelectorAll('.trainee-card');
                traineeCards.forEach(function(card) {
                    card.addEventListener('click', function() {
                        const traineeId = card.getAttribute('data-id');
                        window.location.href = `../html/manageProfileTrainee.html?id=${traineeId}`;
                    });
                });
            }
        })
        .catch(function (error) {
            console.error('Error fetching trainee data:', error);
        });
}