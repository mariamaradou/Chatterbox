var socket = io();
var messages = document.getElementById("messages");

(function() {
  $("#send_message").submit(function(e) {
    if($("#message").val()=="") {
      alert("You must write something")
      e.preventDefault();
    }
    else{
    let li = document.createElement("li");
    li.setAttribute("class","msg")
    e.preventDefault(); // prevents page reloading
    socket.emit("chat message", {message: $("#message").val(), user: user})

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
    let span = document.createElement("span");
    li.setAttribute("class","msg")
  /*  if(data.message==='profile'){
      li.style.display="none";}
      else if(data.message=='undefined' ){
        li.style.display="none";
       }
      else{*/
    var messages = document.getElementById("messages");
    messages.appendChild(li).append(data.message);
    messages.appendChild(span).append("by " + data.sender + ": " + "just now");
 
    li.style.marginLeft="50%";
    span.style.marginLeft="50%";
    $(document).ready(function() { 
           
      $(Messagebox).scrollTop($(messages).height()); 
    }); //}
  });
})();


// fetching initial chat messages from the database

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
        span.style.marginLeft="50%";}
        messages.appendChild(li).append(data.message);
        messages.appendChild(span).append("by " + data.sender + ": " + formatTimeAgo(data.createdAt));
        
        
        $(document).ready(function() { 
           
          $(Messagebox).scrollTop($(messages).height()); 

          
        });
      });
      
    });
})();

 
