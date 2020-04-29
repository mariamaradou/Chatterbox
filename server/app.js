var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var express = require('express');


/*var multer = require('multer');
const path = require("path");
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

  /* socket.on('profilepic',function(data) {
      //send profilepic to everyone
      
      io.sockets.emit('profpic',data);
   }) 
 */

 socket.on('status',function(data){
    io.sockets.emit('statusnew',data);
    
 })

socket.on('typingInfo',function(data) {
   io.sockets.emit('typing',data);
})
/* app.set('view engine', hbs);
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res) => {
   res.render('index.hbs');
});

app.post('/send',(req,res) => {
   console.log(req.body);
}); */

socket.on('disconnect', function(data) {
   console.log('A user disconnected'); 

   io.sockets.emit('disconnection', userId);
  })

});


// GIA UPLOAD FILES
// View Engine Setup 
/* app.set("views",path.join(__dirname,"views")) 
app.set("view engine","ejs") 
    
// var upload = multer({ dest: "Upload_folder_name" }) 
// If you do not want to use diskStorage then uncomment it 
    
var storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
  
        // Uploads is the Upload_folder_name 
        cb(null, "uploads") 
    }, 
    filename: function (req, file, cb) { 
      cb(null, file.fieldname + "-" + Date.now()+".jpg") 
    } 
  }) 
       
// Define the maximum size for uploading 
// picture i.e. 1 MB. it is optional 
const maxSize = 1 * 1000 * 1000; 
    
var upload = multer({  
    storage: storage, 
    limits: { fileSize: maxSize }, 
    fileFilter: function (req, file, cb){ 
    
        // Set the filetypes, it is optional 
        var filetypes = /jpeg|jpg|png/; 
        var mimetype = filetypes.test(file.mimetype); 
  
        var extname = filetypes.test(path.extname( 
                    file.originalname).toLowerCase()); 
        
        if (mimetype && extname) { 
            return cb(null, true); 
        } 
      
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes); 
      }  
  
// mypic is the name of file attribute 
}).single("mypic");        
  
app.get("/",function(req,res){ 
    res.render("Signup"); 
}) 
    
app.post("/uploadProfilePicture",function (req, res, next) { 
        
    // Error MiddleWare for multer file upload, so if any 
    // error occurs, the image would not be uploaded! 
    upload(req,res,function(err) { 
  
        if(err) { 
  
            // ERROR occured (here it can be occured due 
            // to uploading image of size greater than 
            // 1MB or uploading different file type) 
            res.send(err) 
        } 
        else { 
  
            // SUCCESS, image successfully uploaded 
            res.send("Success, Image uploaded!") 
        } 
    }) 
}) */




http.listen(3000, function() {
   console.log('listening on localhost:3000');
});
