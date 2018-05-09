const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, './../public');

const port = process.env.PORT || 3000;

const app = express();


//app.listen uses this method too
//but to add socket.io we have to use it lie that
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected')

  socket.on('disconnect', () => {
    console.log('user leaved')
  });

  socket.emit('newMessage', generateMessage('server', 'trollo'))

  socket.on('createMessage', (message) => {
    console.log(message);
  });

  socket.emit('newMessage', generateMessage('admnin', 'welcome'))

  socket.broadcast.emit('newMessage', generateMessage('new user', 'new user'))


})

server.listen(port, () => {
  console.log(`'listening on port ${port}`);
})

module.exports = {app};