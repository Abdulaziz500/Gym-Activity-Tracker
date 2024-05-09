const url = 'http://localhost:3000/api/v1/coaches/get_coaches';

getCoaches();

function getCoaches() {
    axios.get(url)
        .then(function (response) {
            const coaches = response.data;
            console.log(coaches);


            const manageCoaches = document.getElementById('manage-coaches');
            manageCoaches.innerHTML = '';

            if(coaches.length === 0) {
                const noCoachesMessage = document.createElement('div');
                noCoachesMessage.textContent = 'No coaches found.';
                manageCoaches.appendChild(noCoachesMessage);
            }else{
                coaches.forEach(function(coach) {
                    const coachCard = document.createElement('div');
                    coachCard.classList.add('coach-card');
                    coachCard.setAttribute('data-id', coach.id);
    
                    const coachName = document.createElement('h2');
                    coachName.textContent = coach.firstName + ' ' + coach.lastName;
    
                    coachCard.appendChild(coachName);
                    manageCoaches.appendChild(coachCard);
                });
    
                // Add click event listener to coach cards
                const coachCards = document.querySelectorAll('.coach-card');
                coachCards.forEach(function(card) {
                    card.addEventListener('click', function() {
                        const coachId = card.getAttribute('data-id');
                        window.location.href = `../html/manageProfileCoach.html?id=${coachId}`;
                    });
                });
            }
        })
        .catch(function (error) {
            console.error('Error fetching coach data:', error);
        });
}