

   var socket = io();
   var l;
   var textmessage;
    var profilePicture;
    var once=false;
    var user;
   var randValue;
       var disconnect;

       console.log(document.getElementsByTagName("h2")[0].innerHTML)
    socket.emit('setUsername', document.getElementsByTagName("h2")[0].innerHTML);
 
 
    socket.on('userSet', function(data) {
        user = data.username;
       
  
     });

               
     fetch("/users").then(data => { return data.json();
     })
     .then(json => {
       json.map(data => {
        
       if(data.status=='online'){
         let li = document.createElement("li");
        
         document.getElementById("usersonline").appendChild(li).append(data.name);
       
         var y=document.createElement("FIGURE");
         for(i=0; i<document.getElementsByTagName("ul")[1].getElementsByTagName("li").length; i++){
             if(document.getElementsByTagName("ul")[1].getElementsByTagName("li")[i].innerText===data.name){
              if(document.getElementsByTagName("figure")[i]===undefined){
              document.getElementsByTagName("ul")[1].getElementsByTagName("li")[i].appendChild(y);
            
              var imageprof=document.createElement("img")
              imageprof.src=data.name + "." + "jpg"
              imageprof.alt='no image uploaded'
              imageprof.style.width="160px"
              imageprof.style.height="150px"
          
              
            var divprof=document.createElement("div");
            divprof.setAttribute("id", "identity");
            
            divprof.innerHTML="<p>" + "Gender" + ": " + "</p>" +
            "<p>" + "<b>" + data.gender + "</b>" + "</p>" +
           "<p>" + "Age" + ": " + "</p>" +
           "<p>" + "<b>" + data.age + "</b>" + "</p>" + 
           
            "<p>" + "I come from" + ": " + "</p>" +
            "<p>" + "<b>" + data.country + "</b>" + "</p>" + 
            "<p>" + "Study/Work" + ": " + "</p>" +
            "<p>" + "<b>" + data.study + "</b>" + "</p>" + 
            "<p>" + "Interests/Hobbies" + ": " + "</p>" +
            "<p>" + "<b>" + data.interests + "</b>" + "</p>" ;
            y.appendChild(imageprof)

           y.appendChild(divprof);}
                 else{
                   if( document.getElementsByTagName("figure")[i].getElementsByTagName("img")[0]===undefined){
                    var profileIm=document.createElement("img")
                    profileIm.alt='no image uploaded'
                    profileIm.style.width="160px"
                    profileIm.style.height="150px"
                   profileIm.src=data.user + "." + "jpg"
                   }
                   else{
                 document.getElementsByTagName("figure")[i].getElementsByTagName("img")[0].src=data.name + "." + "jpg"
                 document.getElementsByTagName("figure")[i].getElementsByTagName("img")[0].alt="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAANlBMVEX////Fx8nBw8Xd3uDi4+TGyMr6+vry8/PLzc/t7u7k5ebg4eL39/jo6erJy8309PXY2dvR09QXDCJbAAAEXElEQVR4nO2d2XarMAxFy1CmMOX/f/ZC4FKSUIJtCR26zn7qQxdlL8uyLWz364sQQgghhBBCLkWWN9UtSZJb1eSZ9ctIkzV9EQ9EE+OPRd/8Gc0uaRe3NXHcJp31ywlQtVt2i2VbWb9gGFm/pzdL9teN1iN+l3ZMj/k9HFPrl/Wg2+1/b4rt5XLOzcXv4XizfmU3ClfBQbGwfmkHame9idr6xY+Suzfg3Iyl9asfo/QVvIpigOA1FL1DdFbMrQU+kYUJDoro6eY7UHDAWmGfe7hgdLeW2KMKjdER5ElqcCecFXG7YiEiGEWw87dGpgmHRkRd+Av5jYrWKtvc5AyjxFpmE6kYHYFsxFRQELMRRQURZzZBS4p34sZa6A2J+doavDFRtgmHRkSroYqN9gtoo750kOItMcSbEG1IDKxdbBpilWwqccEowlom9gqGWB1RamW45tta6gn5bgiWaoTKFy+GSMWMWsUQqTisMFiADRfCC4vZEGl5QUMa0tCev59LdcZDqC02KoZQdQwFQax5qUIRA63aligY9tZST8iX2rAGC5XlE9Ti6UtkD8Yr1kovyHdErG6oMG+DmtE8EBYEGw1HpMMULUjFp6ZQRZoZ2ZIp1oRmQjTXgA33M62gIVa9+z+CjYjZhJILDMReOCKWTrFW92sSIUW8sXBBJtlgppkJkTjFjdERgW3QyJugRw4eqtwB6+P2BqGTN9SBYkVYtkHOMgshipcQDFFsrV/9KHe/dHOlU6ReGTUGnsq841EhRl1P/EbtdFh9PK4OVgA+gNN59audVZ/IDiec+A71qdCB/JBjXADW1Q7z2TG+X9lvJEt3ck78nV41Pp+o0/vGJUNxXKTXy5+/k1d98bgf6kFU9NXVg3ObrK67uv4TgUkIIYQQQsCp87KpqtSdqmrKHHu1sVo/HFjab6wWodcdZVJ4em27FgnUvrayF7T7sexBJDsNvUXS/ntw6XHLpZNkYduQpWNl28uxtXPslNtvcSyMYjX8k/1xR4vPUuVpehOnh6rU9qfDxCffq3RSD3xSPPMLse89waGcNmlVOU95hLM2f5sJnqXY2Qmes6tP5QoMB0X9jx4KR7icUN81pXFY1A3lvYsO/9FBC93LTVVOpbuievRS47IkdxQnNwqnfX1Q3B9mrbagJSh5jW4YWnvEMGJ0ROmAqciF6zIojRjWs5k1KjMblVt2fFE56a1xNaI/GqUppCZUyTVQQaoSphr3s4QgX3rDmJL+ID85xQpShY5oWH7aRrwoBTShmRBfYKAlGvlUY1+feUW6XoOWSuWTqbXPBsKGaIlGfrig4fnQkIY0tIeGNKShPTSkIQ3toSENafjy13yPyXx45t5DTzWsygHhD6jx+My9zR9nGk7lZ2nD8Zl72wRpSEMa0pCGNKQhDWlIQxrSkIY0pCENaUhDGtKQhjSkIQ1pSEMa0pCGNKTh74aygucbJnvUH3/Dg4fhp18ghBBCCCGEkJP4B3ymXHSpa16yAAAAAElFTkSuQmCC"
                }
                 
                  document.getElementsByTagName("figure")[i].getElementsByTagName("div")[0].innerHTML="<p>" + "Gender" + ": " + "</p>" +
                 "<p>" + "<b>" + data.gender + "</b>" + "</p>" +
                "<p>" + "Age" + ": " + "</p>" +
                "<p>" + "<b>" + data.age + "</b>" + "</p>" + 
                
                 "<p>" + "I come from" + ": " + "</p>" +
                 "<p>" + "<b>" + data.country + "</b>" + "</p>" + 
                 "<p>" + "Study/Work" + ": " + "</p>" +
                 "<p>" + "<b>" + data.study + "</b>" + "</p>" + 
                 "<p>" + "Interests/Hobbies" + ": " + "</p>" +
                 "<p>" + "<b>" + data.interests + "</b>" + "</p>" 
                 

                 }
             }
         }


        if(data.state=="offline"){
                   
                   
          var list = document.getElementsByTagName("UL")[1];
          for(i=0; i< list.getElementsByTagName("LI").length; i++){
              
              if(list.getElementsByTagName("LI")[i].innerText===data.name){
                 
                  list.getElementsByTagName("LI")[i].style.opacity="0.4";
              }
              
            }
          }
          else {  var list = document.getElementsByTagName("UL")[1];
          for(i=0; i< list.getElementsByTagName("LI").length; i++){
              
              if(list.getElementsByTagName("LI")[i].innerText===data.name){
                 
                  list.getElementsByTagName("LI")[i].style.opacity="1";
              }
              
            }} 
         
         $(document).ready(function() { 
            
           $(OnlineUsers).scrollTop($(usersonline).height()); 
 
           
         }); }

       });
       
     });
  
    
  
  
     //function typing()
     document.getElementById("message").addEventListener("keydown", () => {
       
         var typingInfo="yes";
         socket.emit('typingInfo', {typingNow: typingInfo, user: user});
     })
  
     document.getElementById("message").addEventListener("keyup", () => {
       
       var typingInfo="no";
       socket.emit('typingInfo', {typingNow: typingInfo, user: user});
       
     })
  
     socket.on('typing',function(data){
       var list = document.getElementsByTagName("UL")[1];
       console.log(user)
       console.log(data.user)
       console.log(user)
        if(user) { if(data.typingNow==="yes"){
           console.log(data.typingNow)
  
            for(i=0; i< list.getElementsByTagName("LI").length; i++){
                       
                       if(list.getElementsByTagName("LI")[i].innerText===data.user){
                          
                           list.getElementsByTagName("LI")[i].style.color="IndianRed";
                       }
                       
                   }
                   } 
  
    
       if(data.typingNow==="no") { 
           console.log(data.typingNow)
           for(i=0; i<list.getElementsByTagName("LI").length; i++){
               if(list.getElementsByTagName("LI")[i].innerText===data.user){
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
         
          socket.emit('radio', {radio: blob, user: user});
         
          sound=true;
          console.log(true)
      };
  
      // arxise recording
      
      mediaRecorder.start();
  
      setTimeout(function() {
          mediaRecorder.stop()
      }, 6000);
  });
  }

 
  socket.on('voice', function(arrayBuffer, User) {
      console.log(arrayBuffer)
      var blob = new Blob([arrayBuffer], { 'type' : 'audio/ogg; codecs=opus' });
      var audio = document.createElement('audio');
      audio.src = window.URL.createObjectURL(blob);
     // document.getElementById("audiolist").appendChild(audio);
     let li = document.createElement("li");
     document.getElementById("messages").appendChild(li).appendChild(audio);
     let span = document.createElement("span");
     document.getElementById("messages").appendChild(span).append("by " + User + ": " + "just now");
     audio.setAttribute("class", "myAudioClip")
      if(user!==User){
        li.style.marginLeft="50%";
        span.style.marginLeft="50%";
      }
      
      audio.setAttribute("controls", "controls");
      audio.play();
      $(document).ready(function() { 
           
        $(Messagebox).scrollTop($(messages).height()); 
      });

      
      });
  


  
  
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
           
                  
          
               
           function setOffline() {
        
               var status = document.getElementById("offline").value;
               socket.emit('status', {currentStatus: status, user: user});
               
               
               
               }
  
               function setOnline() {
        
        var status = document.getElementById("online").value;
        socket.emit('status', {currentStatus: status, user: user});
      
      
  
        }

        socket.on('statusnew',function(data) {
            console.log("status")
               if(user){
                console.log(data.currentStatus)
                if(data.currentStatus==="offline"){
                   
                   
                    var list = document.getElementsByTagName("UL")[1];
                    for(i=0; i< list.getElementsByTagName("LI").length; i++){
                        
                        if(list.getElementsByTagName("LI")[i].innerText===data.user){
                           
                            list.getElementsByTagName("LI")[i].style.opacity="0.4";
                        }
                        
                    }
                   console.log(data.currentStatus)  }
               
               
                   else { 
                   var list = document.getElementsByTagName("UL")[1];
                   for(i=0; i< list.getElementsByTagName("LI").length; i++){
                       
                       if(list.getElementsByTagName("LI")[i].innerText===data.user){
                           
                           list.getElementsByTagName("LI")[i].style.opacity="1";
                       }
                       
                   }
               
                   console.log(data.currentStatus)  
                       
                   }
  
               }
               })
        
        var getImage = function(event) {
  
          var profilepic = document.getElementById('photoimage');
          profilepic.src = URL.createObjectURL(event.target.files[0]);
          console.log(profilepic.src)
          console.log(user)
           socket.emit('profile',{image: profilepic.src, user:user });
           socket.emit('msg', {message: 'profile', user: user}); 
            
      }  
  

      
        
      
     /* socket.on('fileimage', function(data){
        let li = document.createElement("li");
        let span = document.createElement("span");
        let imageFile=document.createElement("img");
        imageFile.src= data.message + "." + "jpg"
         randValue= data.message;
        li.setAttribute("class","msg")
        var messagesound= document.getElementById("myAudio"); 
              
        messagesound.play();
        var messages = document.getElementById("messages");
        messages.appendChild(li).append(imageFile);
        messages.appendChild(span).append("by " + data.sender + ": " + "just now");
     if(data.sender!==user){
        li.style.marginLeft="50%";
        span.style.marginLeft="50%";}
        $(document).ready(function() { 
               
          $(Messagebox).scrollTop($(messages).height()); 
        }); 
      
          }) */
       
     /* function showPicture() {
        let li = document.createElement("li");
        let span = document.createElement("span");
        let imageFile=document.createElement("img");
        imageFile.src= randValue + "." + "jpg"
      
        li.setAttribute("class","msg")
        var messagesound= document.getElementById("myAudio"); 
               
        messagesound.play();
        var messages = document.getElementById("messages");
        messages.appendChild(li).append(imageFile);
        messages.appendChild(span).append("by " + document.getElementById("username").innerHTML + ": " + "just now");
        console.log(randValue)
        li.style.marginLeft="50%";
        span.style.marginLeft="50%";
        $(document).ready(function() { 
               
          $(Messagebox).scrollTop($(messages).height()); 
        }); 

      }*/
     
  
       


   
        
      
          
  
           function setSmall(){ var n=document.getElementsByClassName("msg"); 
                            for (var i=0; i<document.getElementsByClassName("msg").length; i++) {
                                document.getElementsByClassName("msg")[i].style.fontSize = "14px";
        }
                                }
           function setMedium(){ var n=document.getElementsByClassName("msg"); 
           for (var i=0; i<document.getElementsByClassName("msg").length; i++) {
            document.getElementsByClassName("msg")[i].style.fontSize = "18px";
}
                             }
           function setLarge(){ var n=document.getElementsByClassName("msg"); 
           for (var i=0; i<document.getElementsByClassName("msg").length; i++) {
            document.getElementsByClassName("msg")[i].style.fontSize = "23px";
}}
  
              function nightMode() { 
              var checkBox = document.getElementById("checkBox");
             var online=document.getElementById("onlineFriends");
             var messagebox=document.getElementById("messageExchange");
             var user=document.getElementById("user");
           var listMessages=document.getElementById("messages")
             var record=document.getElementById("record");
             var send=document.getElementById("Send");
             var settings=document.getElementById("SETTINGS");
             var typewrite=document.getElementById("message");
             
             var li=document.getElementById("usersonline");
             
             if( textmessage==true){
             var text=document.getElementsByClassName("messages");}
             
              if (checkBox.checked == true){
                   li.style.color="c2c7cc";
                   if(textmessage==true){
                     
                      for (var i = 0; i < text.length; i++) {
                          text[i].style.backgroundColor="#9e7bb0";
                          text[i].style.borderColor="#9e7bb0";
                          text[i].style.color="white";
                         
                      }
                     }
                     var list = document.getElementsByTagName("UL")[1];
                     for(i=0; i<list.getElementsByTagName("LI").length; i++){
                      
                          if(checkBox.checked==true){
                         list.getElementsByTagName("LI")[i].style.color="white";}
                         
                                     
                              }
                 
                  listMessages.style.color="rgb(194, 199, 204)";
                  settings.style.backgroundColor="#157e7875";
                   record.style.backgroundColor="#157e7875";
                  send.style.backgroundColor="#157e7875";
                  user.style.backgroundColor="#1d2936"
                online.style.backgroundColor="#1d2936"
                messagebox.style.backgroundColor="#141d26";
                user.style.color="#c2c7cc";
                online.style.color="#c2c7cc";
                  
                $(document).ready(function(){
                  $(".Label").hover(function(){
                    $(this).css("background-color", "rgb(86, 181, 133)");
                    }, function(){
                    $(this).css("background-color", "#157e7875");
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
                    var list = document.getElementsByTagName("UL")[1];
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
                  
                 
                  listMessages.style.color="#333";
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

                function showProfile(){
                    console.log("pressed")
                    var gender=document.getElementById('Gender').value;
                    var age=document.getElementById('age').value;
                    var country=document.getElementById('country').value;
                    var study=document.getElementById('study').value;
                    var interests=document.getElementById('interests').value;
              socket.emit('profileInfo', {user:document.getElementsByTagName("h2")[0].innerHTML, gender:gender, age: age, country: country, study: study, interests:interests})}
       
              socket.on('myProfile', function(data){
          
           var y=document.createElement("FIGURE");
           for(i=0; i<document.getElementsByTagName("ul")[1].getElementsByTagName("li").length; i++){
               if(document.getElementsByTagName("ul")[1].getElementsByTagName("li")[i].innerText===data.user){
                if(document.getElementsByTagName("figure")[i]===undefined){
                document.getElementsByTagName("ul")[1].getElementsByTagName("li")[i].appendChild(y);
              
                var imageprof=document.createElement("img")
                imageprof.src=data.user + "." + "jpg"
                imageprof.alt="no image uploaded"
                imageprof.style.width="160px"
                imageprof.style.height="150px"
           
                
              var divprof=document.createElement("div");
              divprof.setAttribute("id", "identity");
              
              divprof.innerHTML="<p>" + "Gender" + ": " + "</p>" +
              "<p>" + "<b>" + data.gender + "</b>" + "</p>" +
             "<p>" + "Age" + ": " + "</p>" +
             "<p>" + "<b>" + data.age + "</b>" + "</p>" + 
             
              "<p>" + "I come from" + ": " + "</p>" +
              "<p>" + "<b>" + data.country + "</b>" + "</p>" + 
              "<p>" + "Study/Work" + ": " + "</p>" +
              "<p>" + "<b>" + data.study + "</b>" + "</p>" + 
              "<p>" + "Interests/Hobbies" + ": " + "</p>" +
              "<p>" + "<b>" + data.interests + "</b>" + "</p>" ;
              y.appendChild(imageprof)

             y.appendChild(divprof);}
                   else{
                     if( document.getElementsByTagName("figure")[i].getElementsByTagName("img")[0]===undefined){
                      var profileIm=document.createElement("img")
                      profileIm.style.width="160px"
                      profileIm.style.height="150px"
                     profileIm.src=data.user + "." + "jpg"
                     profileIm.alt="no image uploaded"
                     }
                     else{
                   document.getElementsByTagName("figure")[i].getElementsByTagName("img")[0].src=data.user + "." + "jpg"
                  }
                   
                    document.getElementsByTagName("figure")[i].getElementsByTagName("div")[0].innerHTML="<p>" + "Gender" + ": " + "</p>" +
                   "<p>" + "<b>" + data.gender + "</b>" + "</p>" +
                  "<p>" + "Age" + ": " + "</p>" +
                  "<p>" + "<b>" + data.age + "</b>" + "</p>" + 
                  
                   "<p>" + "I come from" + ": " + "</p>" +
                   "<p>" + "<b>" + data.country + "</b>" + "</p>" + 
                   "<p>" + "Study/Work" + ": " + "</p>" +
                   "<p>" + "<b>" + data.study + "</b>" + "</p>" + 
                   "<p>" + "Interests/Hobbies" + ": " + "</p>" +
                   "<p>" + "<b>" + data.interests + "</b>" + "</p>" 
                   

                   }
               }
           }

              })

        
             
            
                  


           socket.on('disconnected',function(data){ 
               console.log(data + "disconnection")
               
               var list = document.getElementsByTagName("UL")[1];
                for(i=0; i< list.getElementsByTagName("LI").length; i++){
                       
                       if(list.getElementsByTagName("LI")[i].innerText=== data){
                           console.log(list.getElementsByTagName("LI")[i].innerText)
                           list.removeChild(list.getElementsByTagName("LI")[i]);
                           //document.getElementsByTagName("UL")[0].getElementsByTagName("LI")[i].remove()
                       }
                       
                   } })
               
                  

                   

                  
                   
               
