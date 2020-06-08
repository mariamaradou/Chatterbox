//require the express module
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require("express");
const app = express();
const dateTime = require("simple-datetime-formater");
const bodyParser = require("body-parser");
const chatRouter = require("./route/chatroute");
var nodeStatic = require('node-static');
const bcrypt = require('bcrypt');      // module κρυπτογράφησης
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload');
//require the http module
const http = require("http").Server(app);
var os = require('os');
var smt=false;
var main=false;
var id;
var image;
id=0;
// require the socket.io module
const io = require("socket.io");

app.set("view-engine" , "ejs")

//bodyparser middleware
app.use(bodyParser.json());
const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)
users = [];
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
//routes
app.use("/chats", chatRouter);
app.get('/', checkAuthenticated,  (req, res) => {
  main=true;
  res.render('index.ejs', { name: req.user.name})
  console.log(req.user.name)
  userName=req.user.name;

  

}); 

var profileImage;

app.post('/', checkAuthenticated, async (req, res) => {
  try {
   
    //Θα αντικατασταθεί από την επόμενη εντολή
    req.user.age=req.body.age;
    req.user.country=req.body.country;
    req.user.gender=req.body.Gender;
    req.user.study=req.body.study;
    req.user.interests=req.body.interests;
  
   req.user.profile=profileImage;
      /*age: req.body.age,
      country: req.body.country,
      gender: req.body.Gender,
      study: req.body.study,
      interests:req.body.interests*/
      
    


  console.log(req.body.interests)
  console.log(req.body.age)
  console.log(req.user)
  
  res.redirect('/me')

} catch {
  res.redirect('/')

    
   
  } 
})

app.get('/me', checkAuthenticated, (req, res) => {
  main=true;
 
  res.render('me.ejs', { name: req.user.name, gender: req.user.gender, age:req.user.age, country: req.user.country, study: req.user.study, interests: req.user.interests,
  profileimage:  req.user.profile })
  


  

}); 

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
  
}));

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
});

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    //Θα αντικατασταθεί από την επόμενη εντολή
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });
    //console.log(users[0].name)
    smt=true;
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
});

app.get('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')

}


var files=[];
app.use(fileUpload());




function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next()
}

Users=[];
var userId;

//set the express.static middleware
app.use(express.static(__dirname + "/views"));

//integrating socketio
socket = io(http);

//database connection
const Chat = require("./models/Chat");
const connect = require("./dbconnect");

var files=[];


//setup event listener
socket.on("connection", socket => {
  console.log("user connected");

  socket.on("disconnect", function() {
    console.log("user disconnected");
  }); 
  socket.on('setUsername', function(data) {
      
    console.log(data);
    userId=data;
    if(users.indexOf(data) > -1) {
       //send data with socket.emit
       socket.emit('userExists', data + ' username is taken! Try some other username.');
       
    } else {
       Users.push(data);
       socket.emit('userSet', {username: data});
       //send username to everyone
     socket.broadcast.emit('newuser',data)
    }
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
  sampleFile.mv('views' + '/' + id +  userId + '.'+ 'jpg', function(err) {
    if (err)
      return res.status(500).send(err);
      socket.broadcast.emit('fileimage',id );
     res.redirect('/')
    
    id=id+1;
  });
});

app.post('/profile', function(req, res) {
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
 
 
 socket.on('radio', function(blob) {
  // can choose to broadcast it to whoever you want
  socket.broadcast.emit('voice', blob);
  
  console.log(blob)
 });
  
});


http.listen(3003, () => {
  console.log("Running on Port: " +3003);
});
