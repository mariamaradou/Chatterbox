if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//Δηλώσεις για το passport
const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const bcrypt = require('bcrypt');      // module κρυπτογράφησης
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload');
var os = require('os');
var nodeStatic = require('node-static');
var fileServer = new(nodeStatic.Server)();
var Flash = require('connect-flash');
const assert = require('assert');
//const taskListController = require('./controller/task-list-controller');
var smt=false;
var main=false;
var id;
var image;
id=0;
app.use(express.static('views'));

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

 users = [];

app.set('view-engine', 'ejs');
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
 io.on('connection', function(socket) {
   //if(smt==true){
    
   console.log('A user connected');
   
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
         io.sockets.emit('newuser',data)
      }
   });
 
  //}
 
 
  app.post('/upload', function(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.photofile;
    image=req.files.photofile.data;
 
  files.push(req.files.photofile.data)
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('filename.jpg', function(err) {
      if (err)
        return res.status(500).send(err);
       io.sockets.emit('fileimage',req.files.photofile.data );
      res.send('File uploaded!');
      console.log(files)
     
      
    });
  });
  
  app.post('/profile', function(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.photofile;
    image=req.files.photofile.data;
  files.push(req.files.photofile.data)
  
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('views' + '/' + userId + '.'+ 'jpg', function(err) {
      if (err)
        return res.status(500).send(err);
       io.sockets.emit('fileimage',req.files.photofile.data );
       res.redirect('/')
      console.log(files)
      id=id+1;
    });
  });
 
   function log() {
      var array = ['Message from server:'];
      array.push.apply(array, arguments);
      socket.emit('log', array);
    }
  
    socket.on('message', function(message) {
      log('Client said: ', message);
      // for a real app, would be room-only (not broadcast)
      socket.broadcast.emit('message', message);
    });
  
    socket.on('create or join', function(room) {
      log('Received request to create or join room ' + room);
  
      var clientsInRoom = io.sockets.adapter.rooms[room];
      var numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
      log('Room ' + room + ' now has ' + numClients + ' client(s)');
  
      if (numClients === 0) {
        socket.join(room);
        log('Client ID ' + socket.id + ' created room ' + room);
        socket.emit('created', room, socket.id);
  
      } else  {
        log('Client ID ' + socket.id + ' joined room ' + room);
        io.sockets.in(room).emit('join', room);
        socket.join(room);
        socket.emit('joined', room, socket.id);
        io.sockets.in(room).emit('ready');
      } 
    });
  
    socket.on('ipaddr', function() {
      var ifaces = os.networkInterfaces();
      for (var dev in ifaces) {
        ifaces[dev].forEach(function(details) {
          if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
            socket.emit('ipaddr', details.address);
          }
        });
      }
    });
  
    socket.on('bye', function(room){
      console.log('received bye');
      
     socket.emit('bye', room)
     
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

/*socket.on('image', function(blob) {
   io.sockets.emit('fileimage', blob);
   console.log(blob)
})*/



 socket.on('disconnect', function(data) {
   console.log('A user disconnected'); 

   io.sockets.emit('disconnection');
  })

}); 


http.listen(3000, function() {
  console.log('listening on localhost:3000');
});
