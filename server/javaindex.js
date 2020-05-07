

   var socket = io();
   var l;
   var textmessage;
    var profilePicture;
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
                 if(checkBox.checked==true){
                list.getElementsByTagName("LI")[i].style.color="white";}
                else{ list.getElementsByTagName("LI")[i].style.color="black";}
             } }                
                    } }
     
        }) 

    
        
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
    
   audio.setAttribute("class", "myAudioClip")
    
    
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
       var str=data.user.length;
        
       
        
         var p=document.createElement("p");
         p.setAttribute("class","messages");
         length=document.getElementsByClassName("messages").length;
         console.log(length)
        
         textmessage=true;
         var text=document.createTextNode(Value); //apothikeuw to text
         p.appendChild(text);
         
         p.style.fontWeight="545";
         
         p.style.borderRadius="25px"; 
         
        if(user===data.user) {
            if (checkBox.checked == true){
                p.style.backgroundColor="#9e7bb0";
                p.style.border="thick solid #9e7bb0";
                p.style.color="black";
            }
            else {p.style.backgroundColor="#026670";
            p.style.border="thick solid #026670";
            p.style.color="white";} 
            
            
            var div=document.createElement("div");
            var valueu="";
            var textu=document.createTextNode(valueu);
            div.appendChild(textu);
            if(Value!== data.user + ': ' + 'audio'){
             document.getElementById("mylist").appendChild(p);
            }
            
            
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
            if(Value=== data.user + ': ' + 'image'){
                p.style.display="none";
                var imageElement = document.getElementsByClassName("myImage")[document.getElementsByClassName("myImage").length-1];
                document.getElementById("mylist").appendChild(imageElement);
                imageElement.style.width="150px";
                imageElement.style.height="150px";
                imageElement.style.borderRadius="20px";
                console.log("image sent")
                var spaceme='';
                var textspace=document.createTextNode(spaceme);
                var spaces=document.createElement("div");
                spaces.appendChild(textspace)
                spaces.style.height="70px";
                document.getElementById("userslist").appendChild(spaces);
            }
            if(Value=== data.user + ': ' + 'profile'){
                p.style.display="none";}



                
             
            
                $(document).ready(function() { 
         
                    $(Messagebox).scrollTop($(mylist).height()); });
      sound=false;
         }
         else {
            if (checkBox.checked == true){
                p.style.backgroundColor="#af86c4";
                p.style.border="thick solid #af86c4";
                p.style.color="black";
            }
            else {p.style.backgroundColor="#026670";
            p.style.border="thick solid #026670";
            p.style.color="white";} 
            textmessage=true;
            
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
                if(Value=== data.user + ': ' + 'image'){
                    p.style.display="none";
                    var imageElement = document.getElementsByClassName("myImage")[document.getElementsByClassName("myImage").length-1];
                    document.getElementById("userslist").appendChild(imageElement);
                    imageElement.style.width="150px";
                imageElement.style.height="150px";
                imageElement.style.borderRadius="20px";
                var spaceme='';
                var textspace=document.createTextNode(spaceme);
                var spaces=document.createElement("div");
                spaces.appendChild(textspace)
                spaces.style.height="70px";
                document.getElementById("mylist").appendChild(spaces);
                    console.log("image sent")
                }
                if(Value=== data.user + ': ' + 'profile'){
                    p.style.display="none";}
                
                
                  
             $(document).ready(function() { 
         
         $(Messagebox).scrollTop($(userslist).height()); 
     
 }); }
        
         }
          })


         socket.on('newuser', function(data) {
            
            document.getElementById("usersonline");
      
      
            //h lista me tous online users
      var nameOfUser= data; // ONOMA user
      
         var li=document.createElement("li");
         var userlist=document.createTextNode(nameOfUser); //apothikeuw to text
        
         li.appendChild(userlist);
         var y=document.createElement("FIGURE");
         li.appendChild(y);
        var imgf=document.createElement("IMG");
        imgf.setAttribute("id",data);
        imgf.src= src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAANlBMVEX////Fx8nBw8Xd3uDi4+TGyMr6+vry8/PLzc/t7u7k5ebg4eL39/jo6erJy8309PXY2dvR09QXDCJbAAAEXElEQVR4nO2d2XarMAxFy1CmMOX/f/ZC4FKSUIJtCR26zn7qQxdlL8uyLWz364sQQgghhBBCLkWWN9UtSZJb1eSZ9ctIkzV9EQ9EE+OPRd/8Gc0uaRe3NXHcJp31ywlQtVt2i2VbWb9gGFm/pzdL9teN1iN+l3ZMj/k9HFPrl/Wg2+1/b4rt5XLOzcXv4XizfmU3ClfBQbGwfmkHame9idr6xY+Suzfg3Iyl9asfo/QVvIpigOA1FL1DdFbMrQU+kYUJDoro6eY7UHDAWmGfe7hgdLeW2KMKjdER5ElqcCecFXG7YiEiGEWw87dGpgmHRkRd+Av5jYrWKtvc5AyjxFpmE6kYHYFsxFRQELMRRQURZzZBS4p34sZa6A2J+doavDFRtgmHRkSroYqN9gtoo750kOItMcSbEG1IDKxdbBpilWwqccEowlom9gqGWB1RamW45tta6gn5bgiWaoTKFy+GSMWMWsUQqTisMFiADRfCC4vZEGl5QUMa0tCev59LdcZDqC02KoZQdQwFQax5qUIRA63aligY9tZST8iX2rAGC5XlE9Ti6UtkD8Yr1kovyHdErG6oMG+DmtE8EBYEGw1HpMMULUjFp6ZQRZoZ2ZIp1oRmQjTXgA33M62gIVa9+z+CjYjZhJILDMReOCKWTrFW92sSIUW8sXBBJtlgppkJkTjFjdERgW3QyJugRw4eqtwB6+P2BqGTN9SBYkVYtkHOMgshipcQDFFsrV/9KHe/dHOlU6ReGTUGnsq841EhRl1P/EbtdFh9PK4OVgA+gNN59audVZ/IDiec+A71qdCB/JBjXADW1Q7z2TG+X9lvJEt3ck78nV41Pp+o0/vGJUNxXKTXy5+/k1d98bgf6kFU9NXVg3ObrK67uv4TgUkIIYQQQsCp87KpqtSdqmrKHHu1sVo/HFjab6wWodcdZVJ4em27FgnUvrayF7T7sexBJDsNvUXS/ntw6XHLpZNkYduQpWNl28uxtXPslNtvcSyMYjX8k/1xR4vPUuVpehOnh6rU9qfDxCffq3RSD3xSPPMLse89waGcNmlVOU95hLM2f5sJnqXY2Qmes6tP5QoMB0X9jx4KR7icUN81pXFY1A3lvYsO/9FBC93LTVVOpbuievRS47IkdxQnNwqnfX1Q3B9mrbagJSh5jW4YWnvEMGJ0ROmAqciF6zIojRjWs5k1KjMblVt2fFE56a1xNaI/GqUppCZUyTVQQaoSphr3s4QgX3rDmJL+ID85xQpShY5oWH7aRrwoBTShmRBfYKAlGvlUY1+feUW6XoOWSuWTqbXPBsKGaIlGfrig4fnQkIY0tIeGNKShPTSkIQ3toSENafjy13yPyXx45t5DTzWsygHhD6jx+My9zR9nGk7lZ2nD8Zl72wRpSEMa0pCGNKQhDWlIQxrSkIY0pCENaUhDGtKQhjSkIQ1pSEMa0pCGNKTh74aygucbJnvUH3/Dg4fhp18ghBBCCCGEkJP4B3ymXHSpa16yAAAAAElFTkSuQmCC";
        imgf.setAttribute("class","hoverPhoto")
        imgf.style.height="150px";
        imgf.style.width="150px";
        y.appendChild(imgf);

        
        
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
        console.log(profilepic.src)
        console.log(user)
         socket.emit('profile',{image: profilepic.src, user:user });
         socket.emit('msg', {message: 'profile', user: user}); 
          
    }  

         var sendImage = function(event) {
           
         var picture=document.createElement("IMG");
        picture.src = URL.createObjectURL(event.target.files[0]);
        console.log(picture.src)
        
         socket.emit('image', { user: user});
         socket.emit('msg', {message: 'image', user: user}); 
          
    }  

      socket.on('fileimage', function(blob){
        
        var image = document.createElement('IMG'); 
        console.log(blob)
        image.src = blob;
        document.getElementById("imagelist").appendChild(image);
    
        image.setAttribute("class", "myImage") 
        document.getElementById("imagelist").style.display="none";
   
    
      })

      socket.on('profimage', function(blob){
        
        var image = document.createElement('IMG'); 
        console.log(blob.user)
        image.src = blob.image;
        
        document.getElementById("proflist").appendChild(image);
        
        image.setAttribute("id", blob.user) //PROAIRETIKO
       image.setAttribute("class","profileImage")
        profilePicture=true;
        document.getElementById("proflist").style.display="none";
       var j;
       var k;
       for(j=0; j<document.getElementsByClassName("profileImage").length;j++){
           for(k=0;k<document.getElementsByClassName("hoverPhoto").length; k++){
               if(document.getElementsByClassName("profileImage")[j].id===document.getElementsByClassName("hoverPhoto")[k].id){
                document.getElementsByClassName("hoverPhoto")[k].src=document.getElementsByClassName("profileImage")[j].src
                document.getElementsByClassName("hoverPhoto")[k].style.width="150px";
                document.getElementsByClassName("hoverPhoto")[k].style.height="150px";
                break;

               }
           }
       }
        
        
        
    
      })
      
        

         function setSmall(){ var n=document.getElementById("Messagebox"); 
                                n.style.fontSize="14px"}
         function setMedium(){ var n=document.getElementById("Messagebox"); 
                            n.style.fontSize="18px"}
         function setLarge(){ var n=document.getElementById("Messagebox"); 
                            n.style.fontSize="23px"}

            function nightMode() { 
            var checkBox = document.getElementById("checkBox");
           var online=document.getElementById("onlineFriends");
           var messagebox=document.getElementById("messageExchange");
           var user=document.getElementById("user");
           var files=document.getElementById("Files");
           var photos=document.getElementById("Photos");
           var record=document.getElementById("record");
           var send=document.getElementById("Send");
           var settings=document.getElementById("SETTINGS");
           var call=document.getElementById("CALL");
           var videocall=document.getElementById("VIDEOCALL");
           var typewrite=document.getElementById("typewrite");
           
           var li=document.getElementById("usersonline");
           
           if( textmessage==true){
           var text=document.getElementsByClassName("messages");}
           
            if (checkBox.checked == true){
                 li.style.color="c2c7cc";
                 if(textmessage==true){
                    console.log(textmessage)
                    
                    for (var i = 0; i < text.length; i++) {
                        text[i].style.backgroundColor="#9e7bb0";
                        text[i].style.borderColor="#9e7bb0";
                        text[i].style.color="black";
                        text[i].style.color="black";
                    }
                   }
                   var list = document.getElementsByTagName("UL")[0];
                   for(i=0; i<list.getElementsByTagName("LI").length; i++){
                    
                        if(checkBox.checked==true){
                       list.getElementsByTagName("LI")[i].style.color="white";}
                       
                                   
                            }
                settings.style.backgroundColor="#9e7bb0";
                call.style.backgroundColor="#9e7bb0";
                videocall.style.backgroundColor="#9e7bb0";
                typewrite.style.borderColor="#9e7bb0";
                files.style.backgroundColor="#9e7bb0";
                photos.style.backgroundColor="#9e7bb0";
                record.style.backgroundColor="#9e7bb0";
                send.style.backgroundColor="#9e7bb0";
                user.style.backgroundColor="#1d2936"
              online.style.backgroundColor="#1d2936"
              messagebox.style.backgroundColor="#141d26";
              user.style.color="#c2c7cc";
              online.style.color="#c2c7cc";
                
              $(document).ready(function(){
                $(".Label").hover(function(){
                  $(this).css("background-color", "#644375");
                  }, function(){
                  $(this).css("background-color", "#9e7bb0");
                });
              });


            } else {
                $(document).ready(function(){
                    $(".Label").hover(function(){
                      $(this).css("background-color", " #67e6f1");
                      }, function(){
                      $(this).css("background-color", "#026670");
                    });
                  });
                  var list = document.getElementsByTagName("UL")[0];
                   for(i=0; i<list.getElementsByTagName("LI").length; i++){
                    
                        
                       list.getElementsByTagName("LI")[i].style.color="black";}
                       
                                   
                            
                typewrite.style.borderColor="#026670";
                settings.style.backgroundColor="#026670";
                if(textmessage==true){
                    li.style.color="black";
                    for (var i = 0; i < text.length; i++) {
                        text[i].style.backgroundColor="#026670";
                        text[i].style.borderColor="#026670";
                        text[i].style.color="white";
                        text[i].style.color="white";
                    }
                    
                   }
                
                call.style.backgroundColor="#026670";
                videocall.style.backgroundColor="#026670";
                files.style.backgroundColor="#026670";
                photos.style.backgroundColor="#026670";
                record.style.backgroundColor="#026670";
                send.style.backgroundColor="#026670";
                user.style.color="black";
                online.style.color="black";
                user.style.backgroundColor="#FCE181";
                online.style.backgroundColor="#9fedd7";
                messagebox.style.backgroundColor="#FEF9C7";
            }}

            function soundOnOff(){
                if (checkBoxtwo.checked == true){
                document.getElementsByTagName("audio")[0].muted=true;}
                else{document.getElementsByTagName("audio")[0].muted=false;}
            }
     
         socket.on('disconnection',function(data){ 
             
             
             var list = document.getElementsByTagName("UL")[0];
              for(i=0; i< list.getElementsByTagName("LI").length; i++){
                     
                     if(list.getElementsByTagName("LI")[i].innerHTML=== data){
                         console.log(list.getElementsByTagName("LI")[i].innerHTML)
                         list.removeChild(list.getElementsByTagName("LI")[i]);
                     }
                     
                 } })
         
 
               
             
             
  
