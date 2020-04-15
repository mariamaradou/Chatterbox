//ΑΠΟΣΤΟΛΗ ΜΗΝΥΜΑΤΟΣ ΜΕ ΤΟ ΠΟΥ ΠΑΤΑΩ SEND ΣΤΟ ΠΑΝΩ ΚΟΥΤΙ



function moveMessage () {
  console.log("Το κουμπί πατήθηκε");
  
  
  var Value=document.getElementById("typewrite").value;
  document.getElementById("typewrite").value = "";
  
  if (Value==='') {
  alert("You didn't type anything!");} 
  else {   
      var p=document.createElement("p");
 var text=document.createTextNode(Value); //apothikeuw to text
 p.appendChild(text);
document.getElementById("mylist").appendChild(p); }

window.setInterval(function() {
  var elem = document.getElementById("mylist");
  elem.scrollTop = elem.scrollHeight;
}, 4000);


 } 
  
 var getImage = function(event) {

  
  var image = document.getElementById('photoimage');
image.src = URL.createObjectURL(event.target.files[0]);

 }

 var getImage1 = function(event) {

  
  var imageOne = document.getElementById('photoimage1');
imageOne.src = URL.createObjectURL(event.target.files[0]);

 }

 function sendMessage() {
  var key = window.event.keyCode;

  // If the user has pressed enter
  if (key === 13) {
    var Value=document.getElementById("typewrite").value;
    document.getElementById("typewrite").value = "";
    
    if (Value==='') {
    alert("You didn't type anything!");} 
    else {   
        var p=document.createElement("p");
   var text=document.createTextNode(Value); //apothikeuw to text
   p.appendChild(text);
  document.getElementById("mylist").appendChild(p); }

  window.setInterval(function() {
    var elem = document.getElementById("mylist");
    elem.scrollTop = elem.scrollHeight;
  }, 4000);
      return false;
  }
  else {
      return true;
  }
}

  
