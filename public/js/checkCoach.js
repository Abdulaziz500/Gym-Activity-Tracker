// Function to fetch user info
function fetchUserInfo() {
    // Get the user ID from the URL parameters
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');
    // Make a GET request to your backend API endpoint
    const url = `http://localhost:3000/api/v1/coachingRequests/get_coaching_request/${userId}`;
    axios.get(url)
        .then(function (response) {
            // Handle the successful response
            const userData = response.data;
            console.log(userData);
            // Update the HTML elements with the fetched user info
            document.getElementById('firstName').textContent = userData.firstName;
            document.getElementById('lastName').textContent = userData.lastName;
            document.getElementById('username').textContent = userData.username;
            document.getElementById('email').textContent = userData.email;
            document.getElementById('userRole').textContent = userData.userRole;
            document.getElementById('dateOfBirth').textContent = userData.dateOfBirth;
            document.getElementById('gender').textContent = userData.gender;
            document.getElementById('age').textContent = userData.age;
            document.getElementById('certificate').textContent = userData.certificate;
            document.getElementById('yearsOfExperience').textContent = userData.yearsOfExperience;
        })
        .catch(function (error) {
            // Handle the error
            console.error('Error fetching user info:', error);
            // Display custom alert
            const customAlert = document.createElement('div');
            customAlert.classList.add('custom-alert');
            customAlert.textContent = 'Error fetching user info. Please try again.';
            customAlert.style.backgroundColor = "red";
            customAlert.style.display = "block";

            document.body.appendChild(customAlert);

            // Hide the alert after three seconds
            setTimeout(() => {
                customAlert.style.display = 'none';
            }, 3000);
        });
}

// Call the fetchUserInfo function when the page loads
window.onload = function() {
    fetchUserInfo();
};

//When user click on accept button
document.getElementById("acceptButton").onclick = function() {

    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');
    const url1 = `http://localhost:3000/api/v1/coachingRequests/update_coaching_request/${userId}`;
    const requestBody = {
        accepted: true
    };
    axios.put(url1,requestBody)
        .then(function (response) {
            // Handle success
            console.log('User status changed to true in coachingRequests table :', response.data);

            // *****register the user in coach table******
            //get user data
            const url2 = `http://localhost:3000/api/v1/coachingRequests/get_coaching_request/${userId}`;
            axios.get(url2)
            .then(function (response) {
                // Handle the successful response
                const userData = response.data;
                console.log(userData);

                //register the user in coach table
                const formData = new FormData(); // Create FormData object from the form
                formData.append("firstName",userData.firstName);
                formData.append("lastName",userData.lastName);
                formData.append("username", userData.username);
                formData.append("password", userData.password);
                formData.append("email", userData.email);
                formData.append("userRole", userData.userRole);
                formData.append("gender", userData.gender);
                formData.append("dateOfBirth", userData.dateOfBirth);
                formData.append("age", userData.age);
                formData.append("certificate", userData.certificate);
                formData.append("yearsOfExperience", userData.yearsOfExperience);
                
                const url3 = 'http://localhost:3000/api/v1/authCoach/register';

                axios.post(url3, formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(function (response) {
                    // Handle success
                    console.log('User registered as coach successfully:', response.data);
                    // Display custom alert
                    const customAlert = document.createElement('div');
                    customAlert.classList.add('custom-alert');
                    customAlert.innerHTML = 'User registered as coach successfully!<br>Redirecting to previous page...';
                    customAlert.style.backgroundColor = '#04a104'; // Degree of Green color
                    customAlert.style.display = "block"

                    document.body.appendChild(customAlert);

                    // Hide the alert after two seconds and redirect to coachingRequests page
                    setTimeout(() => {
                        customAlert.style.display = 'none';
                        window.location.href = '../html/coachingRequests.html';
                    }, 2000);
                })
                .catch(function (error) {
                    // Handle error
                    console.error('Error registering user as coach:', error);
                    // Display custom alert
                    const customAlert = document.createElement('div');
                    customAlert.classList.add('custom-alert');
                    customAlert.textContent = 'Error registering user as coach. Please try again.';
                    customAlert.style.backgroundColor = "red";
                    customAlert.style.display = "block";

                    document.body.appendChild(customAlert);

                    // Hide the alert after two seconds
                    setTimeout(() => {
                        customAlert.style.display = 'none';
                    }, 2000);
                });
            })
            .catch(function (error) {
                // Handle the error
                console.error('Error fetching user info:', error);
            });
        })
        .catch(function (error) {
            // Handle the error
            console.error("Error during changing user status",error);
        });
}





// When user click on refuse button
document.getElementById("refuseButton").onclick = function() {

    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');
    const url = `http://localhost:3000/api/v1/coachingRequests/delete_coaching_request/${userId}`;
    axios.delete(url)
        .then(function (response) {
            // Handle success
            console.log('User deleted from coachingRequests table :', response.data);

            // Display custom alert
            const customAlert = document.createElement('div');
            customAlert.classList.add('custom-alert');
            customAlert.innerHTML = 'User deleted successfully!<br>Redirecting to previous page...';
            customAlert.style.backgroundColor = '#04a104'; // Degree of Green color
            customAlert.style.display = "block";

            document.body.appendChild(customAlert);

            // Hide the alert after two seconds and redirect to coachingRequests page
            setTimeout(() => {
                customAlert.style.display = 'none';
                window.location.href = '../html/coachingRequests.html';
            }, 2000);
        })
        .catch(function (error) {
            // Handle the error
            console.error("Error during deleting user",error);

            // Display custom alert
            const customAlert = document.createElement('div');
            customAlert.classList.add('custom-alert');
            customAlert.textContent = 'Error deleting user. Please try again.';
            customAlert.style.backgroundColor = "red";
            customAlert.style.display = "block";

            document.body.appendChild(customAlert);

            // Hide the alert after two seconds
            setTimeout(() => {
                customAlert.style.display = 'none';
            }, 2000);
        });
}