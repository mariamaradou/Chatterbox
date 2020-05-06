var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var express = require('express');


var multer = require('multer');
/*const path = require("path");
const hbs=require('hbs');
const bodyParser = require('body-parser'); */


/*app.get('/', function(req, res) {
   res.sendfile('newindex.html');
 
   
}); */


app.use(express.static('public'));



users = [];
io.on('connection', function(socket) {
   console.log('A user connected');
   var userId;
   socket.on('setUsername', function(data) {
      
      console.log(data);
      userId=data;
      if(users.indexOf(data) > -1) {
         //send data with socket.emit
         socket.emit('userExists', data + ' username is taken! Try some other username.');
         
      } else {
         users.push(data);
         socket.emit('userSet', {username: data});
         //send username to everyone
         io.sockets.emit('newuser',data)
      }
   });
   
   socket.on('msg', function(data) {
      //Send message to everyone
      io.sockets.emit('newmsg', data);
      console.log(data)

      
   })

 

 socket.on('status',function(data){
    io.sockets.emit('statusnew',data);
    
 })

 //VIDEOCALL


socket.on('typingInfo',function(data) {
   io.sockets.emit('typing',data);
})


socket.on('radio', function(blob) {
   // can choose to broadcast it to whoever you want
   io.sockets.emit('voice', blob);
   console.log(blob)
});

socket.on('disconnect', function(data) {
   console.log('A user disconnected'); 

   io.sockets.emit('disconnection', userId);
  })

});






http.listen(3000, function() {
   console.log('listening on localhost:3000');
});
