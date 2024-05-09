//When user click on coachingRequests Card
document.addEventListener('DOMContentLoaded', function() {
    const coachingRequestsCard = document.querySelector('.div-14');

    coachingRequestsCard.addEventListener('click', function(event) {
        window.location.href = '../html/coachingRequests.html';
    });
});


//When user click on manageCoaches Card
document.addEventListener('DOMContentLoaded', function() {
    const manageCoachesCard = document.querySelector('.div-20');

    manageCoachesCard.addEventListener('click', function(event) {
        window.location.href = '../html/manageCoaches.html';
    });
});



//When user click on manageTrainees Card
document.addEventListener('DOMContentLoaded', function() {
    const manageTraineesCard = document.querySelector('.div-26');

    manageTraineesCard.addEventListener('click', function(event) {
        window.location.href = '../html/manageTrainees.html';
    });
});




//When user click on manageExercises Card
document.addEventListener('DOMContentLoaded', function() {
    const manageExercisesCard = document.querySelector('.div-23');

    manageExercisesCard.addEventListener('click', function(event) {
        window.location.href = '../html/manageExercises.html';
    });
});