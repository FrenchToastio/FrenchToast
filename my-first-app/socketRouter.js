const http = require('./server.js').http
const io = require('socket.io')(http);


module.exports = (payload) => {
	let roomName = payload.action
	io.sockets.in(roomName).emit('payload', payload);

}

/* Here is our routing for our socket rooms. Based on the type of event 'labeled', 'opened', ect... 
we would publish it to a specific room name corresponding to the event type. Would then pass the details of that event 
to front end for handling there */


io.on('connection', (socket) => {
  let roomName = '';
  console.log('server: a user is connected');
  socket.on('room', (room) => {
  	//when people access the cleints have them subscribe to each event room
    roomName = room;
    socket.join(room);
  });

  /* example code for how we would publish changes to the correct channel 

  socket.on('change', (evnt) => {
    io.sockets.in(roomName).emit('change', evnt);
  });

  */

//our disconnect logger
  socket.on('disconnect', (socket) => {
    console.log('a user has disconnected');
  });
});