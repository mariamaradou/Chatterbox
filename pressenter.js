

  $(document).ready(function() {
    $('#typewrite').keydown(function() {
      var Value=document.getElementById("typewrite").value;
    if (event.keyCode == 13) {
    if (message == "") {
    alert("Enter Some Text In Textarea");
    } else {
      var p=document.createElement("p");
      var text=document.createTextNode(Value); //apothikeuw to text
      p.appendChild(text);
     document.getElementById("mylist").appendChild(p);
     window.setInterval(function() {
      var elem = document.getElementById("mylist");
      elem.scrollTop = elem.scrollHeight;
    }, 4000);
    }
    $("textarea").val('');
    return false;
    }
    });
    });
  