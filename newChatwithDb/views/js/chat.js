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
    e.preventDefault(); // prevents page reloading
    socket.emit("chat message", {message: $("#message").val(), user: user})

    messages.appendChild(li).append($("#message").val());
    let span = document.createElement("span");
    messages.appendChild(span).append("by " + document.getElementById("username").innerHTML + ": " + "just now");
    
    $("#message").val("");
    
    $(document).ready(function() { 
           
      $(Messagebox).scrollTop($(messages).height());  }); 

    return false; }

    $("#submit_profile").submit(function(e) {
  
    
      e.preventDefault(); // prevents page reloading
      socket.emit("profileInfo", {gender: $("#Gender").val(), age: $("#age").val(), country: $("#country").val(), study: $("#study").val(), interests:$("#interests").val() })
      document.getElementById("information").innerHTML= "<p> Gender:   </p>  <p>  Age  :   </p> <p>  I come from  :   </p> <p>  Study/Work :   </p> <p>  Interests/Hobbies  :   </p>" ;
      
      return false;
    });
  
    socket.on("myProfile", data => {
      console.log(data)
    });
  });



  socket.on("received", data => {
    let li = document.createElement("li");
    let span = document.createElement("span");
    var messages = document.getElementById("messages");
    messages.appendChild(li).append(data.message);
    messages.appendChild(span).append("by " + data.sender + ": " + "just now");
 
    li.style.marginLeft="50%";
    span.style.marginLeft="50%";
    $(document).ready(function() { 
           
      $(Messagebox).scrollTop($(messages).height()); 
    });
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
        if(data.message=='profile'){
         li.style.display="none";
        }
        else{
        if(data.sender!==document.getElementById("username").innerHTML){
        li.style.marginLeft="50%";
        span.style.marginLeft="50%";}
        messages.appendChild(li).append(data.message);
        messages.appendChild(span).append("by " + data.sender + ": " + formatTimeAgo(data.createdAt));}
        
        
        $(document).ready(function() { 
           
          $(Messagebox).scrollTop($(messages).height()); 
        });
      });
      
    });
})();

 