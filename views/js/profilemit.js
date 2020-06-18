var socket = io();



    
    var gender=document.getElementById("gender").innerText
    var age=document.getElementById("age").innerText
    var country=document.getElementById("country").innerText
    var study=document.getElementById("study").innerText
    var interests=document.getElementById("interests").innerText
    var relationship=document.getElementById("relationship").innerText
socket.emit('profileInfo', {user:document.getElementsByTagName("h2")[0].innerHTML, gender:gender, age: age, country: country, study: study, interests:interests, relationship:relationship})


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

divprof.innerHTML="<p>" + "Φύλο" + ": " + "</p>" +
"<p>" + "<b>" + data.gender + "</b>" + "</p>" +
"<p>" + "Ηλικία" + ": " + "</p>" +
"<p>" + "<b>" + data.age + "</b>" + "</p>" + 

"<p>" + "Καταγωγή" + ": " + "</p>" +
"<p>" + "<b>" + data.country + "</b>" + "</p>" + 
"<p>" + "Σπουδές/Εργασία" + ": " + "</p>" +
"<p>" + "<b>" + data.study + "</b>" + "</p>" + 
"<p>" + "Ενδιαφέροντα" + ": " + "</p>"  +
"<p>" + "<b>" + data.interests + "</b>" + "</p>" +
"<p>" + "Προσωπική κατάσταση" + ": " + "</p>" +
"<p>" + "<b>" + data.relationship + "</b>" + "</p>"
y.appendChild(divprof);}
   else{document.getElementsByTagName("figure")[i].getElementsByTagName("div")[0].innerHTML="<p>" + "Φύλο" + ": " + "</p>" +
   "<p>" + "<b>" + data.gender + "</b>" + "</p>" +
  "<p>" + "Ηλικία" + ": " + "</p>" +
  "<p>" + "<b>" + data.age + "</b>" + "</p>" + 
  
   "<p>" + "Καταγωγή" + ": " + "</p>" +
   "<p>" + "<b>" + data.country + "</b>" + "</p>" + 
   "<p>" + "Σπουδές/Εργασία" + ": " + "</p>" +
   "<p>" + "<b>" + data.study + "</b>" + "</p>" + 
   "<p>" + "Ενδιαφέροντα" + ": " + "</p>" +
   "<p>" + "<b>" + data.interests + "</b>" + "</p>" +
   "<p>" + "Προσωπική κατάσταση" + ": " + "</p>" +
   "<p>" + "<b>" + data.relationship + "</b>" + "</p>"
   

   }
}
}

})

socket.emit('profilePhoto',  {user:document.getElementsByTagName("h2")[0].innerHTML, gender:gender, age: age, country: country, study: study, interests:interests, relationship: relationship} )

     socket.on('myPhoto', function(data){
      
         
          for(i=0; i<document.getElementsByTagName("ul")[1].getElementsByTagName("li").length; i++){
              if(document.getElementsByTagName("ul")[1].getElementsByTagName("li")[i].innerText===data.user){
                
              var imageprof=document.createElement("img")
              var figureimage=document.createElement("figure");
              imageprof.src=data.user + "." + "jpg"
              imageprof.alt='no image uploaded'
              imageprof.style.width="160px"
              imageprof.style.height="150px"
              figureimage.appendChild(imageprof);
               document.getElementsByTagName("ul")[1].getElementsByTagName("li")[i].appendChild(figureimage);}
               if(document.getElementsByTagName("figure")[i]!== undefined){
                   if( document.getElementsByTagName("figure")[i].getElementsByTagName("div")[0]===undefined){
                       var divi=document.createElement("div")
                       
                       divi.style.borderColor="black"
                       divi.style.borderRadius="10px"
                     divi.style.backgroundColor="white"
                divi.innerHTML="<p>" + "Gender" + ": " + "</p>" +
   "<p>" + "<b>" + data.gender + "</b>" + "</p>" +
  "<p>" + "Age" + ": " + "</p>" +
  "<p>" + "<b>" + data.age + "</b>" + "</p>" + 
  
   "<p>" + "I come from" + ": " + "</p>" +
   "<p>" + "<b>" + data.country + "</b>" + "</p>" + 
   "<p>" + "Study/Work" + ": " + "</p>" +
   "<p>" + "<b>" + data.study + "</b>" + "</p>" + 
   "<p>" + "Interests/Hobbies" + ": " + "</p>" +
   "<p>" + "<b>" + data.interests + "</b>" + "</p>" +
   "<p>" + "Προσωπική κατάσταση" + ": " + "</p>" +
   "<p>" + "<b>" + data.relationship + "</b>" + "</p>"
   document.getElementsByTagName("figure")[i].appendChild(divi);
                document.getElementsByTagName("figure")[i].marginTop="150px"}
            }
          
          }

        })
