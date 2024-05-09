const url = 'http://localhost:3000/api/v1/coachingRequests/get_coaching_requests';

getCoachingRequests();

function getCoachingRequests() {
    axios.get(url)
        .then(function (response) {
            const coaches = response.data;
            console.log(coaches);

            const coachingRequests = document.getElementById('coaching-requests');
            coachingRequests.innerHTML = '';

            let hasUnacceptedRequests = false; // Flag to track if there are any unaccepted requests

            coaches.forEach(function(coach) {
                if (!coach.accepted) {
                    hasUnacceptedRequests = true;
                    const coachCard = document.createElement('div');
                    coachCard.classList.add('coach-card');
                    coachCard.setAttribute('data-id', coach.id);

                    const coachName = document.createElement('h2');
                    coachName.textContent = coach.firstName + ' ' + coach.lastName;

                    coachCard.appendChild(coachName);
                    coachingRequests.appendChild(coachCard);
                }
            });

            // Display a message if there are no unaccepted requests
            if (!hasUnacceptedRequests) {
                const noRequestsMessage = document.createElement('div');
                noRequestsMessage.textContent = 'No coaching requests.';
                coachingRequests.appendChild(noRequestsMessage);
            }

            // Add click event listener to coach cards
            const coachCards = document.querySelectorAll('.coach-card');
            coachCards.forEach(function(card) {
                card.addEventListener('click', function() {
                    const coachId = card.getAttribute('data-id');
                    window.location.href = `checkCoach.html?id=${coachId}`;
                });
            });
        })
        .catch(function (error) {
            console.error('Error fetching coach data:', error);
        });
}