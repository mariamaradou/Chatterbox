var socket = io();
var messages = document.getElementById("messages");

(function() {
  $("form").submit(function(e) {
    let li = document.createElement("li");
    e.preventDefault(); // prevents page reloading
    socket.emit("chat message", {message: $("#message").val(), user: user})

    messages.appendChild(li).append($("#message").val());
    let span = document.createElement("span");
    messages.appendChild(span).append("by " + document.getElementById("username").innerHTML + ": " + "just now");

    $("#message").val("");
    $(document).ready(function() { 
           
      $(Messagebox).scrollTop($(messages).height()); });

    return false;
  });

  socket.on("received", data => {
    let li = document.createElement("li");
    let span = document.createElement("span");
    var messages = document.getElementById("messages");
    messages.appendChild(li).append(data.message);
    messages.appendChild(span).append("by " + data.sender + ": " + "just now");
    console.log("Hello bingo!");
    $(document).ready(function() { 
           
      $(Messagebox).scrollTop($(Messagebpx).height()); 
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
        messages.appendChild(li).append(data.message);
        messages.appendChild(span).append("by " + data.sender + ": " + formatTimeAgo(data.createdAt));
        $(document).ready(function() { 
           
          $(Messagebox).scrollTop($(messages).height()); 
        });
      });
      
    });
})();

//is typing...
/*
let messageInput = document.getElementById("message");
let typing = document.getElementById("typing");

//isTyping event
messageInput.addEventListener("keypress", () => {
  socket.emit("typing", { user: "Someone", message: "is typing..." });
});

socket.on("notifyTyping", data => {
  typing.innerText = data.user + " " + data.message;
  console.log(data.user + data.message);
});

//stop typing
messageInput.addEventListener("keyup", () => {
  socket.emit("stopTyping", "");
});

socket.on("notifyStopTyping", () => {
  typing.innerText = "";
}); */

