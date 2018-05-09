const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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

  socket.emit('newMessage', {
    from: 'server',
    text: 'trollo',
    createdAt: '1,2,3'
  })

  socket.on('createMessage', (message) => {
    console.log(message);

    // io.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getDate()
    // })

 

    //broadcasting event to everyone but sender
    // socket.broadcast.emit('newMessage', {
    //     from: message.from,
    //     text: message.text,
    //     createdAt: new Date().getDate()
    //   })

  });

  socket.emit('newMessage', {
    from: 'admin',
    text: 'welcome',
    createdAt: new Date().getDate()
  })

  socket.broadcast.emit('newMessage', {
    from: 'new user',
    text: 'new user',
    createdAt: new Date().getTime()
  })


})

server.listen(port, () => {
  console.log(`'listening on port ${port}`);
})

module.exports = {app};