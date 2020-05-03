

   var socket = io();
   var l;

   function setUsername() {
      socket.emit('setUsername', document.getElementById('name').value);
   };
   var user;
   socket.on('userExists', function(data) {
      document.getElementById('error-container').innerHTML = data;
   });

   socket.on('userSet', function(data) {
      user = data.username;
     

   });


   function sendMessage() {
      
      var msg = document.getElementById('typewrite').value;
      if(msg==="") {
         alert("You didn't type anything!");
      }
      else {  socket.emit('msg', {message: msg, user: user}); 
      document.getElementById('typewrite').value="";}
   }




  


   function typing() {
     
       var typingInfo="yes";
       socket.emit('typingInfo', {typingNow: typingInfo, user: user});
   }

   function notTyping () {
     
     var typingInfo="no";
     socket.emit('typingInfo', {typingNow: typingInfo, user: user});
     
   }

   socket.on('typing',function(data){
     var list = document.getElementsByTagName("UL")[0];
     
      if(user) { if(data.typingNow==="yes"){
         console.log(data.typingNow)

          for(i=0; i< list.getElementsByTagName("LI").length; i++){
                     
                     if(list.getElementsByTagName("LI")[i].innerHTML===data.user){
                        
                         list.getElementsByTagName("LI")[i].style.color="IndianRed";
                     }
                     
                 }
                 } 

  
     if(data.typingNow==="no") { 
         console.log(data.typingNow)
         for(i=0; i<list.getElementsByTagName("LI").length; i++){
             if(list.getElementsByTagName("LI")[i].innerHTML===data.user){
                list.getElementsByTagName("LI")[i].style.color="black";
             }
         }                


         } 
     
     }
     
        }) 

        // AUDIO RECORDING
       /* navigator.mediaDevices.getUserMedia({audio:true})
        .then(stream => {handlerFunction(stream)})
      
      
              function handlerFunction(stream) {
              rec = new MediaRecorder(stream);
              rec.ondataavailable = e => {
                audioChunks.push(e.data);
                if (rec.state == "inactive"){
                  let blob = new Blob(audioChunks,{type:'audio/mpeg-3'});
                  recordedAudio.src = URL.createObjectURL(blob);
                  console.log(blob);
                 
                  recordedAudio.controls=true;
                  recordedAudio.autoplay=true; 
                  sendData(blob)
                  
                }
              }
            }  
                  function sendData(data) {}
      
         function mouseDown(e) {
            console.log('I was clicked')
            record.disabled = true;
           
            record.disabled=false;
            audioChunks = [];
            rec.start();
          }
          function mouseUp(e) {
            console.log("I was clicked")
            record.disabled = false;
            stop.disabled=true;
           
            rec.stop();
          
            
          }

         */ 
        var sound;
function mouseDown(){
        var constraints = { audio: true };
navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream) {
    var mediaRecorder = new MediaRecorder(mediaStream);
    mediaRecorder.onstart = function(e) {
        this.chunks = [];
    };
    mediaRecorder.ondataavailable = function(e) {
        this.chunks.push(e.data);
    };
    mediaRecorder.onstop = function(e) {
        var blob = new Blob(this.chunks, { 'type' : 'audio/ogg; codecs=opus' });
        socket.emit('radio', blob);
        socket.emit('msg', {message: 'audio', user: user}); 
        sound=true;
        console.log(true)
    };

    // Start recording
    
    mediaRecorder.start();

    // Stop recording after 5 seconds and broadcast it to server
    setTimeout(function() {
        mediaRecorder.stop()
    }, 6000);
});
}
// When the client receives a voice message it will play the sound
socket.on('voice', function(arrayBuffer) {
    var blob = new Blob([arrayBuffer], { 'type' : 'audio/ogg; codecs=opus' });
    var audio = document.createElement('audio');
    audio.src = window.URL.createObjectURL(blob);
    document.getElementById("audiolist").appendChild(audio);
    console.log("here")
   audio.setAttribute("class", "myAudioClip")
     /*var div = document.getElementById(id);
    div.appendChild(audio); */
    
    audio.setAttribute("controls", "controls");
    audio.play();
    
    
         
});

   function enterMessage() {
var key = window.event.keyCode;

// If the user has pressed enter
if (key === 13) {
var msg = document.getElementById('typewrite').value;

      if(msg==="") {
         alert("You didn't type anything!");
      }
      else {  socket.emit('msg', {message: msg, user: user}); 
      document.getElementById('typewrite').value="";
      }
   return false;
}
else {
   return true;
}
}

 //listening with socket.on
   socket.on('newmsg', function(data) {
    
      if(user) {
      
         var messagesound= document.getElementById("myAudio"); 
         
        messagesound.play();

        
        
         var Value= data.user + ': ' + data.message ; // ONOMA KAI MINIMA
        
         var p=document.createElement("p");
         var text=document.createTextNode(Value); //apothikeuw to text
         p.appendChild(text);
         p.style.border="thick solid #026670";
         p.style.backgroundColor="#026670";
         p.style.borderRadius="25px";
         
        if(user===data.user) {
            
            var div=document.createElement("div");
            var valueu="";
            var textu=document.createTextNode(valueu);
            div.appendChild(textu);
            if(Value!== data.user + ': ' + 'audio'){
             document.getElementById("mylist").appendChild(p);}
             var offsetHeight=p.offsetHeight + 10;
             
            div.style.height=offsetHeight + "px";
             document.getElementById("userslist").appendChild(div);
              if(Value=== data.user + ': ' + 'audio'){
               
               console.log('audio')
                var audioElement = document.getElementsByClassName("myAudioClip")[document.getElementsByClassName("myAudioClip").length-1];
                document.getElementById("mylist").appendChild(audioElement);
                var spaceme='';
                var textspace=document.createTextNode(spaceme);
                var spaces=document.createElement("div");
                spaces.appendChild(textspace)
                spaces.style.height="30px";
                document.getElementById("userslist").appendChild(spaces);

            }
                
             
            
                $(document).ready(function() { 
         
                    $(Messagebox).scrollTop($(mylist).height()); });
      sound=false;
         }
         else {
          
            var elseu=document.createElement("div");
            var valueelseu="";
            var textelseu=document.createTextNode(valueelseu);
            elseu.appendChild(textelseu);
            if(Value!== data.user + ': ' + 'audio'){
             document.getElementById("userslist").appendChild(p); }
             var offsetHeightu=p.offsetHeight + 10;
     elseu.style.height=offsetHeightu + "px";
             document.getElementById("mylist").appendChild(elseu);
             if(Value=== data.user + ': ' + 'audio'){
               var audioElement = document.getElementsByClassName("myAudioClip")[document.getElementsByClassName("myAudioClip").length-1];
                document.getElementById("userslist").appendChild(audioElement);
                var spaceme='';
                var textspace=document.createTextNode(spaceme);
                var spaces=document.createElement("div");
                spaces.appendChild(textspace)
                spaces.style.height="30px";
                document.getElementById("mylist").appendChild(spaces);
                
}
                
                
                  
             $(document).ready(function() { 
         
         $(Messagebox).scrollTop($(userslist).height()); 
     
 }); }
        sound=false;
        console.log(sound)
         }
          })


         socket.on('newuser', function(data) {
            
            document.getElementById("usersonline");
      
      
            //h lista me tous online users
      var nameOfUser= data; // ONOMA user
      
         var li=document.createElement("li");
         var userlist=document.createTextNode(nameOfUser); //apothikeuw to text
         li.appendChild(userlist);
        
        document.getElementById("usersonline").appendChild(li); 

        window.setInterval(function() {
      var elem = document.getElementById("usersonline");
       elem.scrollTop = elem.scrollHeight;
        }, 4000); 
      
         })
         
                
         socket.on('statusnew',function(data){
             if(user){
                 if(data.currentStatus==="offline"){
                 
                 
                 var list = document.getElementsByTagName("UL")[0];
                 for(i=0; i< list.getElementsByTagName("LI").length; i++){
                     
                     if(list.getElementsByTagName("LI")[i].innerHTML===data.user){
                        
                         list.getElementsByTagName("LI")[i].style.opacity="0.4";
                     }
                     
                 }
                 console.log(data.currentStatus)  }
             
             
                 else { 
                 var list = document.getElementsByTagName("UL")[0];
                 for(i=0; i< list.getElementsByTagName("LI").length; i++){
                     
                     if(list.getElementsByTagName("LI")[i].innerHTML===data.user){
                         
                         list.getElementsByTagName("LI")[i].style.opacity="1";
                     }
                     
                 }
             
                 console.log(data.currentStatus)  
                     
                 }

             }
             })
             
         function setOffline() {
      
             var status = document.getElementById("offline").value;
             socket.emit('status', {currentStatus: status, user: user});
             
      
             }

             function setOnline() {
      
      var status = document.getElementById("online").value;
      socket.emit('status', {currentStatus: status, user: user});
             

      }
      
      
      
         var getImage = function(event) {


     var profilepic = document.getElementById('photoimage');
     profilepic.src = URL.createObjectURL(event.target.files[0]);
      

      
         }  

         function setSmall(){ var n=document.getElementById("Messagebox"); 
                                n.style.fontSize="14px"}
         function setMedium(){ var n=document.getElementById("Messagebox"); 
                            n.style.fontSize="18px"}
         function setLarge(){ var n=document.getElementById("Messagebox"); 
                            n.style.fontSize="23px"}

            function nightMode() { var checkBox = document.getElementById("checkBox");
           var online=document.getElementById("onlineFriends");
           var messagebox=document.getElementById("messageExchange");
            if (checkBox.checked == true){
              
              messagebox.style.backgroundColor="#2E4053";
            } else {
                online.style.backgroundColor="#9fedd7";
                messagebox.style.backgroundColor="#FEF9C7";
            }}
     
         socket.on('disconnection',function(data){ 
             
             
             var list = document.getElementsByTagName("UL")[0];
              for(i=0; i< list.getElementsByTagName("LI").length; i++){
                     
                     if(list.getElementsByTagName("LI")[i].innerHTML=== data){
                         console.log(list.getElementsByTagName("LI")[i].innerHTML)
                         list.removeChild(list.getElementsByTagName("LI")[i]);
                     }
                     
                 } })
         
 
               
             
             
  
