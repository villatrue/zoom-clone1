const express = require('express');
const app = express();
const server = require('http').Server(app); // allows server to be used with socket.io
const io = require('socket.io')(server) // creates server based on express server and passes it to socket.io and knows how to interract with that
const { v4: uuidV4 } = require('uuid');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect(`/${uuidV4()}`) // create brand new room and radds a dynamic room
  })

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

// what we want to handle on our server with socket.io
io.on("connection", socket => {
  // socket that usere is connecting to
  socket.on("join-room", (roomId, userId) => {
    // calls join room and adds room and user
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId); // broadcast sends the message to everyone in the room besides the new user
    // socket.on('message', (message) => {
    //   io.to(roomId).emit('createMessage', message);
    // });
    socket.on('message', (message) => {
      //send message to the same room
      io.to(roomId).emit('createMessage', message)
     }); 
    socket.on("disconnect", () => {
      socket.to(roomId).broadcast.emit("user-disconnected", userId);
    });
  });
});

server.listen(3030);
