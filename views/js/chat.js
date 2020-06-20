var socket = io();
var messages = document.getElementById("messages");


//jquery gia na mh kanei reload h selida
(function() {
  $("#send_message").submit(function(e) {
    if($("#message").val()=="") {
      alert("You must write something")
      e.preventDefault();
    }
    else{
    let li = document.createElement("li");
    li.style.opacity=0;
    li.setAttribute("class","msg")
    e.preventDefault(); // prevents page reloading
    socket.emit("chat message", {message: $("#message").val(), user: user})
   //animation   
    var pos = 0;
    var id = setInterval(frame,4);
    function frame() {
      if (pos==1) {
        clearInterval(id);
      } else {
        pos=pos+0.005;
       li.style.opacity = pos; 
       
      }
    }
    if (document.getElementById("checkBox").checked == true){
      li.style.color="black";
    }
    messages.appendChild(li).append($("#message").val());
    let span = document.createElement("span");
    messages.appendChild(span).append("by " + document.getElementById("username").innerHTML + ": " + "just now");
    $("#message").val("");
    
    $(document).ready(function() { 
           
      $(Messagebox).scrollTop($(messages).height());  }); 

    return false; }

    
  });



  socket.on("received", data => {
    let li = document.createElement("li");
    li.style.opacity=0;
    let span = document.createElement("span");
   
    li.setAttribute("class","msg")
    var messagesound= document.getElementById("myAudio"); 
    messagesound.play();
    var messages = document.getElementById("messages");
    //animation   
    var pos = 0;
    var id = setInterval(frame,4);
    function frame() {
      if (pos==1) {
        clearInterval(id);
      } else {
        pos=pos+0.005;
       li.style.opacity = pos; 
       
      }
    }
    messages.appendChild(li).append(data.message);
    messages.appendChild(span).append("by " + data.sender + ": " + "just now");
    li.style.backgroundColor="#157e7875";
    if (document.getElementById("checkBox").checked == true){
      li.style.color="black";
    }
    li.style.marginLeft="50%";
    span.style.marginLeft="50%";
    li.style.backgroundColor="#94b8b8"
    $(document).ready(function() { 
           
      $(Messagebox).scrollTop($(messages).height()); 
    }); 
  });
})();



// phgaine sto json arxeio sto route kai emfanise ta arxeia
(function() {
  fetch("/chats").then(data => { return data.json();
    })
    .then(json => {
      json.map(data => {
       
      
        let li = document.createElement("li");
        let span = document.createElement("span");
      li.setAttribute("class","msg")
        if(data.sender!==document.getElementById("username").innerHTML){
        li.style.marginLeft="50%";
        span.style.marginLeft="50%";
        li.style.backgroundColor="#94b8b8"}
        messages.appendChild(li).append(data.message);
        if( formatTimeAgo(data.createdAt)==='a few hours ago'){
         
          var text=data.createdAt.replace("T"," ").replace("Z", " ").slice(0,16)
        
          messages.appendChild(span).append("by " + data.sender + ": " + text);
        }
        else{
        messages.appendChild(span).append("by " + data.sender + ": " + formatTimeAgo(data.createdAt));}
        
        
        $(document).ready(function() { 
           
          $(Messagebox).scrollTop($(messages).height()); 

          
        });
      });
      
    });
})();


 
function ensure(){
 if( confirm("You are about to log out")){
  window.location.href = "/logout";}
  
}

 
