const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

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

  // socket.emit('newMessage', generateMessage('server', 'trollo'))

  socket.on('createMessage', (message, callback) => {
    console.log(message);
    // emitting to everyone
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('this is from the server');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('admin', coords.lat, coords.long))
  })

  socket.emit('newMessage', generateMessage('admnin', 'welcome'))

  // socket.broadcast.emit('newMessage', generateMessage('new user', 'new user'))


})

server.listen(port, () => {
  console.log(`'listening on port ${port}`);
})

module.exports = {app};