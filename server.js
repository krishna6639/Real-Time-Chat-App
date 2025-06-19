const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('message', 'Welcome to Real-Time Chat!');
  socket.broadcast.emit('message', 'A new user has joined');

  socket.on('chatMessage', (msg) => {
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
