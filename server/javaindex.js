

   var socket = io();
   
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
            messageSound();
            
          }

          function messageSound() {
            
            
            socket.emit('msg', {message: 'sound', user: user}); 
        } */

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
        str = data.user;
        n=str.length;
         var Value= data.user + ': ' + data.message ; // ONOMA KAI MINIMA
         
         var p=document.createElement("p");
         var text=document.createTextNode(Value); //apothikeuw to text
         p.appendChild(text);
         p.style.border="thick solid #026670";
         p.style.backgroundColor="#026670";
         p.style.borderRadius="25px";
         
         /*if(Value=data.user + 'sound'){
            
            
          p.addEventListener("click", getSound);
           var messageRec= document.getElementById("recordedAudio");
           
           
          function getSound() { 
          messageRec.play();} 

           }

           
           
           console.log(messageRec.src) */

        
        if(user===data.user) {
            
            var div=document.createElement("div");
            var valueu="";
            var textu=document.createTextNode(valueu);
            div.appendChild(textu);
            
             document.getElementById("mylist").appendChild(p);
             
             
             var offsetHeight=p.offsetHeight + 10;
             console.log(offsetHeight)

             div.style.height=offsetHeight + "px";
             document.getElementById("userslist").appendChild(div);
             
             
           
             $(Messagebox).ready(function() { 
         
         $(Messagebox).scrollTop($(mylist).height()); 
     
 });
         }
         else {
            
             var elseu=document.createElement("div");
            var valueelseu="";
            var textelseu=document.createTextNode(valueelseu);
            elseu.appendChild(textelseu);
             document.getElementById("userslist").appendChild(p);
             
             var offsetHeightu=p.offsetHeight + 10;

             elseu.style.height=offsetHeightu + "px";
             document.getElementById("mylist").appendChild(elseu);
             $(document).ready(function() { 
         
         $(Messagebox).scrollTop($(userslist).height()); 
     
 });}
        

        
       
     
  


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
     
         socket.on('disconnection',function(data){ 
             
             
             var list = document.getElementsByTagName("UL")[0];
              for(i=0; i< list.getElementsByTagName("LI").length; i++){
                     
                     if(list.getElementsByTagName("LI")[i].innerHTML=== data){
                         console.log(list.getElementsByTagName("LI")[i].innerHTML)
                         list.removeChild(list.getElementsByTagName("LI")[i]);
                     }
                     
                 } })
         
 

