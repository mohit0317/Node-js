const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('A user connected');
    // Example: Handle chat message event
    socket.on('message', (msg) => {
        console.log('Message: ' + JSON.stringify(msg));
        socket.broadcast.emit('message', msg); // Broadcast the message to all connected clients
    });

    // Example: Handle disconnect event
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
http.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});