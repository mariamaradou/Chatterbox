const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const dateTime = require("simple-datetime-formater");
const chatRouter = require("./route/chatroute");
const onlineRouter = require("./route/onlineroute");
const fileUpload = require('express-fileupload');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
// Initializations
const app = express();
const http = require("http").Server(app);
const io = require("socket.io");
socket = io(http);
app.use("/chats", chatRouter);
app.use("/online", onlineRouter);
require('./database');
require('./passport/local-auth');

// settings
//app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + "/views"));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
/*app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}));*/

app.use(session({
  secret: 'iamtired',
  saveUninitialized: false, // don't create session until something stored
  resave: false, //don't save session if unmodified
  store: new MongoStore({
      url: "mongodb+srv://MariaMaradou:Maria8132024@cluster0-jrach.azure.mongodb.net/<dbname>?retryWrites=true&w=majority",
      touchAfter: 24 * 3600 // time period in seconds
  })
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.user = req.user;
    
    next();
});



const connect = require("./dbconnect");
const Chat = require("./models/Chat");
const onlineUsers = require("./models/online");
 

// Routes
app.use('/', require('./routes/index'));
 
var users = [];

socket.on("connection", socket => {
    console.log("user connected");
   
    
    var userId;
    socket.on('setUsername', function(data) {
      connect.then(db => {
        console.log("connected correctly to the server");
        let newUser = new onlineUsers({ name: data });
  
        newUser.save();
      });
      console.log(data);
      users.push(data);
      users.push(socket.id)
      userId=data;
      
     
         
         console.log(users + "users")
         socket.emit('userSet', {username: data});
         //send username to everyone
       socket.broadcast.emit('newuser',data)
      
   });
   socket.on("disconnect", function() {
     
    var remove_id = users.indexOf(socket.id)-1;
    console.log(users[remove_id] + " " + " id")
   // users.splice(remove_id, 2);
    socket.broadcast.emit('disconnected',users[remove_id])

     connect.then(db =>  {
       
        
     onlineUsers.findOneAndRemove({
       name: users[remove_id]
       }, (err, user) => {
        if(err) {
         console.log(err)
        } else {
         console.log(user);
        
       }
     }) });
   
  
 
    console.log("user disconnected" );
  }); 
  
   socket.on('status',function(data){
    socket.broadcast.emit('statusnew',data);
    console.log(data)
    
  })
  
  
   app.post('/upload', function(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.photofile;
  files.push(req.files.photofile.data)
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('views' + '/' +  userId +'!' + '.'+ 'jpg', function(err) {
      if (err)
        return res.status(500).send(err);
        
       // socket.broadcast.emit('fileimage',id ); 
     
       connect.then(db => {
        console.log("connected correctly to the server");
        var newItem = new Chat();
        
        newItem.img.data = fs.readFileSync('views' + '/' + userId + '!' + '.'+ 'jpg')
        newItem.img.contentType = 'image/jpg';
        newItem.save();
        
      });
      res.redirect('/')
    });
    id=id+1;
  });

  
 
  app.post('/prof', function(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.photofile;
   
  files.push(req.files.photofile.data)
  
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('views' + '/' + userId + '.'+ 'jpg', function(err) {
      if (err)
        return res.status(500).send(err);
        socket.broadcast.emit('profimage',req.files.photofile.data );
       res.redirect('/')
      console.log(req.files.photofile.data)
      
    });
  });
    socket.on("chat message", function(data) {
      console.log("message: " + data.message);
  
      
      socket.broadcast.emit("received", { message:data.message , sender:data.user }); 
  
      //save chat to the database
      connect.then(db => {
        console.log("connected correctly to the server");
        let chatMessage = new Chat({ message:data.message, sender: data.user });
  
        chatMessage.save();
      });
    });
    socket.on('typingInfo',function(data) {
      socket.broadcast.emit('typing',data);
   })
  
   socket.on('profileInfo', function(data){
  
    socket.broadcast.emit('myProfile', {user: data.user,gender:data.gender, gender:data.gender, age: data.age, country: data.country, study: data.study, interests:data.interests})
    
    
    
   })
   
   
   socket.on('radio', function(data) {
    // can choose to broadcast it to whoever you want
    socket.broadcast.emit('voice', data.radio ,data.user);
    connect.then(db => {
        console.log("connected correctly to the server");
        var newItem = new Chat({message: 'audio', img: data.radio, sender: data.user});
        
        newItem.img.data = data.radio;
        newItem.img.contentType = 'binary/octet-stream';
       newItem.save();
        
      });
    console.log(data.radio)
    
   
   });
    
  });
  
// Starting the server
http.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
