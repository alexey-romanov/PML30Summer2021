const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('dist'))

io.on('connection', (socket) => {
    console.log(`a user connected: ${socket.id}`);

    const sendMessage = () => {
        socket.emit("heartbeat", { date: Date.now() })
        setTimeout(sendMessage, 500);
    }

    sendMessage();

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const sendBroadcast = () => {
    io.emit("broadcast", { date: Date.now() });
    setTimeout(sendBroadcast, 1000);
}

sendBroadcast();

server.listen(8000, () => {
    console.log("Server listening");
})