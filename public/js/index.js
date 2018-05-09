let socket = io();

socket.on('connect', () => {
  console.log('connected to server')
})

socket.on('disconnect', () => {
  console.log('disconnected from server')
})

socket.on('newMessage', (message) => {
  let messageLi = $('<li></li>');
  messageLi.text(`${message.from}: ${message.text}`)

  $('#chat').append(messageLi);
})

// socket.emit('createMessage', {
//   from: 'Ania',
//   text: 'from client Ania'
// }, () => {
//   console.log('got it')
// })

jQuery('#messageForm').on('submit', (ev) => {
  ev.preventDefault();
  socket.emit('createMessage', {
    from: 'user',
    text: $("#message").val()
  }, () => {

  })
})