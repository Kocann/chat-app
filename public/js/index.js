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

socket.on('newLocationMessage', (message) => {
  let li = $('<li></li>');
  let a = $('<a target="_blank">my current location</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.url);

  li.append(a);
  $('#chat').append(li);
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

let geoBtn = $('#geo');
geoBtn.on('click',  function (e) {
  if (!navigator.geolocation) {
    return alert('Geolocation not available... ;(');
  } else {
    navigator.geolocation.getCurrentPosition((position) => {
      //console.log(position)
      socket.emit('createLocationMessage', {
        lat: position.coords.latitude,
        long: position.coords.longitude
      })
    },
    (err) => {
      alert('unable to fetch location')
    })
  }
})