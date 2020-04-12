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
    

    