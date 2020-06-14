const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const dateTime = require("simple-datetime-formater");
const chatRouter = require("./route/chatroute");
const userRoute = require("./route/useroute");
const fileUpload = require('express-fileupload');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');

const app = express();
const http = require("http").Server(app);
const io = require("socket.io");
socket = io(http);

//pairnw ta routes me tis collections ths bashs
app.use("/chats", chatRouter);
app.use("/users", userRoute);

require('./database');
require('./passport/local-auth');

// kanw rythmiseis

app.use(express.static(__dirname + "/views"));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);


app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//vazw ta sessions kai apothikeuw ta cookies sth basi dedomenwn
app.use(session({
  secret: 'iamtired',
  saveUninitialized: false, // don't create session until something stored
  resave: false, //don't save session if unmodified
  store: new MongoStore({
      url: "mongodb+srv://MariaMaradou:Maria8132024@cluster0-jrach.azure.mongodb.net/<dbname>?retryWrites=true&w=majority",
      touchAfter: 24 * 3600 // time period in seconds
  })
}));
app.use(fileUpload());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.user = req.user;
    
    next();
});


//pairnw th bash dedomenwn kai ta collections
const connect = require("./dbconnect");
const Chat = require("./models/Chat");
const User = require('./models/user');
 

// Routes gia to anoigma twn selidwn
app.use('/', require('./routes/index'));
 
var users = [];

//otan sundeetai o xrhsths
socket.on("connection", socket => {
    console.log("user connected");
   
    
    var userId;
    socket.on('setUsername', function(data) {
     //sth bash dedomenwn vazw thn katastash toy xrhsth online
      connect.then(db =>  {
        User.updateOne({'name' : data}, 
         { $set: {'status': 'online', 'state' : 'online'  } }, function(err, result) { 
           if(err) { throw err; } 
           
         }); 
       });
    
      users.push(data);
      users.push(socket.id)
      userId=data;
         socket.emit('userSet', {username: data});
         //send username to everyone
       socket.broadcast.emit('newuser',data)
      
   });

   //otan aposundeetai  o xrhsths
   socket.on("disconnect", function() {
     
    //auto to kanw wste na anagnwrizw to onoma tou xristi mesw tou socket.id
    var remove_id = users.indexOf(socket.id)-1;
    console.log(users[remove_id] + " " + " id")

    socket.broadcast.emit('disconnected',users[remove_id])
    // sth bash dedomenwn vazw thn katastash tou xrhsth offline
     connect.then(db =>  {
      User.updateOne({'name' :  users[remove_id]}, 
       { $set: {'status': 'offline'  } }, function(err, result) { 
         if(err) { throw err; } 
         
         }); 
     });
 
    console.log("user disconnected" );
  }); 
  
   socket.on('status',function(data){
    socket.broadcast.emit('statusnew',data);
    console.log(data)
    connect.then(db =>  {
      
      User.updateOne({'name' :  data.user}, 
       { $set: {'state': data.currentStatus  } }, function(err, result) { 
         if(err) { throw err; } 
         
         }); 
     });
  })
  
  var files=[];

 //o xrhsths stelnei eikona profil. apothikeuetai ston ypologisth/server!
 // sto profilemit.js pairnw thn eikona apo ton server kai thn moirazomai
 
  app.post('/prof', function(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
   let sampleFile = req.files.photofile;
   
  files.push(req.files.photofile.data)
  
    
    sampleFile.mv('views' + '/' + req.user.name + '.'+ 'jpg', function(err) {
      if (err)
        return res.status(500).send(err);
  
       res.redirect('/')
      console.log(req.files.photofile.data)
      
    });
  });

  //stelnw minima
    socket.on("chat message", function(data) {
      console.log("message: " + data.message);
  
      
      socket.broadcast.emit("received", { message:data.message , sender:data.user }); 
  
      //Apothikeuw kathe neo minima sth vash
      connect.then(db => {
        console.log("connected correctly to the server");
        let chatMessage = new Chat({ message:data.message, sender: data.user });
  
        chatMessage.save();
      });
    });

    //pote pliktrologei kapoios
    socket.on('typingInfo',function(data) {
      socket.broadcast.emit('typing',data);
   })
  
   //stelnw stoixeia profil xrhsth
   socket.on('profileInfo', function(data){
  
    socket.broadcast.emit('myProfile', {user: data.user,gender:data.gender, gender:data.gender, age: data.age, country: data.country, study: data.study, interests:data.interests})
    
   })

   //stelnw fwto profil ston xristi
   socket.on('profilePhoto', function(data){
     socket.broadcast.emit('myPhoto',{user: data.user,gender:data.gender, gender:data.gender, age: data.age, country: data.country, study: data.study, interests:data.interests})
   })
   
   //stelnw hxhtiko
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