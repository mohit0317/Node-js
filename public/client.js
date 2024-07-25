const socket = io();

let name;
let textarea = document.querySelector('#textarea');
const messageArea = document.querySelector('.message_area');

do {
    name = prompt('Please enter your name');
} while (!name);

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
        textarea.value = '';
    }
});

function sendMessage(msg1) {
    let msg = {
        user: name,
        message: msg1.trim(),
    };
    // Append message
    appendMessage(msg, 'outgoing');

    // Send to server
    socket.emit('message', msg);
}

const appendMessage = (msg, type) => {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `
     <h4>${msg.user}</h4>
     <p>${msg.message}</p>
    `;
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
};

// Receive message from server
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
});
