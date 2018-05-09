let socket = io();

socket.on('connect', () => {
  console.log('connected to server')

  socket.emit('createMessage', {
    from: 'Ania',
    text: 'from client'
  })
})

socket.on('disconnect', () => {
  console.log('disconnected from server')
})

socket.on('newMessage', (Message) => {
  console.log('new Message', Message)
})