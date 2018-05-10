const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const  {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, './../public');

const port = process.env.PORT || 3000;

const app = express();

//------------------------------------------------------------------------//

// io.emit ---> emits event to every single connected user

// socket.broadcast.emit ---> emit to everyone coonnected except for current user

//socket.emit ---> emits to specific user

//------------------------------------------------------------------------//


//app.listen uses this method too
//but to add socket.io we have to use it lie that
const server = http.createServer(app);
const io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected')

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} just left the chat`));
    }
  });

  socket.on('join', (params, callback) => {
    // there is question mark due to some bug in downloaded code
    if (!isRealString(params['?name']) || !isRealString(params.room)) {
      return callback('Name and room are required')
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params['?name'], params.room);

    io.to(params.room).emit('updateUsersList', users.getUserList(params.room));

    socket.emit('newMessage', generateMessage('admnin', 'welcome to the chat app'))

    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params['?name']} has joined the chat`))
  })


  socket.on('createMessage', (message, callback) => {
    console.log(message);
    // emitting to everyone
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('this is from the server');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('admin', coords.lat, coords.long))
  })

})

server.listen(port, () => {
  console.log(`'listening on port ${port}`);
})

module.exports = {app};