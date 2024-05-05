const form = document.getElementById('inputForm');
const leanBodyMassLeftArm = document.getElementById('leanBodyMassLeftArm');
const leanBodyMassPercentLeftArm = document.getElementById('leanBodyMassPercentLeftArm');
const leanBodyMassRightArm = document.getElementById('leanBodyMassRightArm');
const leanBodyMassPercentRightArm = document.getElementById('leanBodyMassPercentRightArm');
const leanBodyMassLeftLeg = document.getElementById('leanBodyMassLeftLeg');
const leanBodyMassPercentLeftLeg = document.getElementById('leanBodyMassPercentLeftLeg');
const leanBodyMassRightLeg = document.getElementById('leanBodyMassRightLeg');
const leanBodyMassPercentRightLeg = document.getElementById('leanBodyMassPercentRightLeg');
const leanBodyMassTrunk = document.getElementById('leanBodyMassTrunk');
const leanBodyMassPercentTrunk = document.getElementById('leanBodyMassPercentTrunk');


// Add a submit event listener to the form
form.addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Create an object to hold form data
    const formData = {
        leanBodyMassLeftArm: leanBodyMassLeftArm.value,
        leanBodyMassPercentLeftArm: leanBodyMassPercentLeftArm.value,
        leanBodyMassRightArm: leanBodyMassRightArm.value,
        leanBodyMassPercentRightArm: leanBodyMassPercentRightArm.value,
        leanBodyMassLeftLeg: leanBodyMassLeftLeg.value,
        leanBodyMassPercentLeftLeg: leanBodyMassPercentLeftLeg.value,
        leanBodyMassRightLeg: leanBodyMassRightLeg.value,
        leanBodyMassPercentRightLeg: leanBodyMassPercentRightLeg.value,
        leanBodyMassTrunk: leanBodyMassTrunk.value,
        leanBodyMassPercentTrunk: leanBodyMassPercentTrunk.value
    };

    // Get user data from local storage
    const userData = JSON.parse(localStorage.getItem('user'));
    formData.traineeId = userData.id;

    // Convert formData object to FormData
    const formDataToSend = new FormData();
    for (const key in formData) {
        formDataToSend.append(key, formData[key]);
    }
    
    
    const url = 'http://localhost:3000/api/v1/recommendation/create_recommendation';

    // Send the data to the backend using Axios
    axios.post(url, formDataToSend, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        // Handle successful response from the server
        console.log('Success:', response.data);
        const data = response.data;
        // Update the content of the elements
        const weakestBodyPartElement = document.getElementById('weakest-body-part');
        const infoElement = document.getElementById('info');

        weakestBodyPartElement.textContent = data;
        infoElement.textContent = `Focus on ${data} Exercises`
        infoElement.style.display = 'block'; // Show the exercise info
    })
    .catch(error => {
        // Handle error response
        console.error('Error:', error);
        //display error message to user in right bottom corner
        const customAlert = document.createElement('div');
        customAlert.classList.add('custom-alert');
        customAlert.textContent = 'Error: ' + error.message;
        customAlert.style.backgroundColor = "red";
        customAlert.style.display = "block";
        document.body.appendChild(customAlert);

        // Hide the alert after three seconds
        setTimeout(() => {
            customAlert.style.display = 'none';
        }, 3000);
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