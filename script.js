const socket = io();

const chatForm = document.getElementById('chat-form');
const msgInput = document.getElementById('msg');
const messages = document.getElementById('messages');

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = msgInput.value;
  socket.emit('chatMessage', msg);
  msgInput.value = '';
});

socket.on('message', (msg) => {
  const div = document.createElement('div');
  div.textContent = msg;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
});
