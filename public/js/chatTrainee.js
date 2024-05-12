// (
//     async function() {
//         const { io } = await import("socket.io-client");

//         // use the `io` object to connect to your Socket.IO server
//         const socket = io();
//         const app = document.querySelector(".app");


//         let uname;

//         app.querySelector(".join-screen #join-user").addEventListener("click", function() {
//             const username = app.querySelector(".join-screen #username").value;
//             if(username.length == 0) return alert("Please enter username")
//             uname = username
//             socket.emit("newUser", username)
//             app.querySelector(".join-screen").classList.remove("active");
//             app.querySelector(".chat-screen").classList.add("active");

//         })

//         app.querySelector(".chat-screen #send-message").addEventListener("click", function() {
//             let message = app.querySelector(".chat-screen #message-input").value
//             if(message.length == 0){
//                 return
//             }
//             renderMessage("my",{
//                 username: uname,
//                 text: message
//             }) 
//             socket.emit("chat", {
//                 username: uname,
//                 text: message
//             })
//             app.querySelector(".chat-screen #message-input").value = "";
//         })

//         app.querySelector(".chat-screen #exit-chat").addEventListener("click", function() {
//             socket.emit("exitUser", uname)
//             window.location.href = window.location.href
//         })

//         socket.on("update", function(message) {
//             renderMessage("update",message)
//         })

//         socket.on("chat", function(message) {   
//             renderMessage("other",message)  
//         })

//         function renderMessage(type,message) {
//             let messageContainer = app.querySelector(".chat-screen .messages")
//             if(type == "my"){
//                 let el = document.createElement("div")
//                 el.classList.add("message")
//                 el.classList.add("my-message")
//                 el.innerHTML = `
//                     <div>
//                         <div class="name">You</div>
//                         <div class="text">${message.text}</div>
//                     </div>
//                 `
//                 messageContainer.appendChild(el)
//             }else if(type == "other"){
//                 let el = document.createElement("div")
//                 el.classList.add("message")
//                 el.classList.add("other-message")
//                 el.innerHTML = `
//                     <div>
//                         <div class="name">${message.username}</div>
//                         <div class="text">${message.text}</div>
//                     </div>
//                 `
//                 messageContainer.appendChild(el)
//             }else if(type == "update"){
//                 let el = document.createElement("div")
//                 el.classList.add("update")
//                 el.innerText = message
//                 messageContainer.appendChild(el)
//             }

//             //scroll chat to end
//             messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight
//         }
//     }
// )()





// Import the necessary modules
// import { io } from "/node_modules/socket.io-client/dist/socket.io.js";

// Define a function to handle chat functionality
function setupChat() {
    // const socket = io('http://localhost:3000/socket.io/socket.io.js');
    // const socket = io('https://socketio-chatapp.onrender.com/socket.io/socket.io.js');
    // const socket = io();
    const app = document.querySelector(".app");

    let uname;

    // Function to handle user join event
    function handleUserJoin() {
        const username = app.querySelector(".join-screen #username").value;
        if (username.length == 0) return alert("Please enter username");
        uname = username;
        socket.emit("newUser", username);
        app.querySelector(".join-screen").classList.remove("active");
        app.querySelector(".chat-screen").classList.add("active");
    }

    // Function to handle sending messages
    function sendMessage() {
        let message = app.querySelector(".chat-screen #message-input").value;
        if (message.length == 0) {
            return;
        }
        renderMessage("my", {
            username: uname,
            text: message
        });
        socket.emit("chat", {
            username: uname,
            text: message
        });
        app.querySelector(".chat-screen #message-input").value = "";
    }

    // Function to handle user exit event
    function exitChat() {
        socket.emit("exitUser", uname);
        window.location.href = window.location.href;
    }

    // Function to render messages
    function renderMessage(type, message) {
        let messageContainer = app.querySelector(".chat-screen .messages");
        if (type == "my") {
            let el = document.createElement("div");
            el.classList.add("message");
            el.classList.add("my-message");
            el.innerHTML = `
                <div>
                    <div class="name">You</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
            messageContainer.appendChild(el);
        } else if (type == "other") {
            let el = document.createElement("div");
            el.classList.add("message");
            el.classList.add("other-message");
            el.innerHTML = `
                <div>
                    <div class="name">${message.username}</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
            messageContainer.appendChild(el);
        } else if (type == "update") {
            let el = document.createElement("div");
            el.classList.add("update");
            el.innerText = message;
            messageContainer.appendChild(el);
        }

        // Scroll chat to end
        messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
    }

    // Add event listeners
    app.querySelector(".join-screen #join-user").addEventListener("click", handleUserJoin);
    app.querySelector(".chat-screen #send-message").addEventListener("click", sendMessage);
    app.querySelector(".chat-screen #exit-chat").addEventListener("click", exitChat);
}

// Call the setupChat function when the DOM is ready
document.addEventListener("DOMContentLoaded", setupChat);

// Event listener for "others" link
document.getElementById('othersLink').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent the default link behavior
    var othersOptions = document.getElementById('othersOptions');
    if (othersOptions.style.display === 'none') {
        othersOptions.style.display = 'block';
    } else {
        othersOptions.style.display = 'none';
    }
});
