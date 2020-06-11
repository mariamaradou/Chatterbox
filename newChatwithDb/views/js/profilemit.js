var socket = io();



    
    var gender=document.getElementById("gender").innerText
    var age=document.getElementById("age").innerText
    var country=document.getElementById("country").innerText
    var study=document.getElementById("study").innerText
    var interests=document.getElementById("interests").innerText
socket.emit('profileInfo', {user:document.getElementsByTagName("h2")[0].innerHTML, gender:gender, age: age, country: country, study: study, interests:interests})

socket.on('myProfile', function(data){
console.log(data)
console.log(user)

var y=document.createElement("FIGURE");
for(i=0; i<document.getElementsByTagName("ul")[1].getElementsByTagName("li").length; i++){
if(document.getElementsByTagName("ul")[1].getElementsByTagName("li")[i].innerText===data.user){
if(document.getElementsByTagName("figure")[i]===undefined){
document.getElementsByTagName("ul")[1].getElementsByTagName("li")[i].appendChild(y);

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
"<p>" + "Interests/Hobbies" + ": " + "</p>"  +
"<p>" + "<b>" + data.interests + "</b>" + "</p>" 
y.appendChild(divprof);}
   else{document.getElementsByTagName("figure")[i].getElementsByTagName("div")[0].innerHTML="<p>" + "Gender" + ": " + "</p>" +
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

