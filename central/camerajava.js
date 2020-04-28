/*
 * Check out the full guide at
 *   http://sipjs.com/guides/make-call/
 *
 * This sample uses
 *   http://sipjs.com/download/sip-0.13.5.min.js
 *
 * Login with your developer account to receive calls at
 *   http://sipjs.com/demo-phone
 */

//here you determine whether the call has video and audio

function myFunction() {
  //import * as SIP from 'sip-0.15.10.js'

var options = {
  
      media: {
        local: {
          video: document.getElementById('localVideo')
        },
        remote: {
          video: document.getElementById('remoteVideo'),
          // This is necessary to do an audio/video call as opposed to just a video call
          audio: document.getElementById('remoteVideo')
        }
      },
      ua: {}
    };
var simple = new SIP.Web.Simple(options);

var endButton = document.getElementById('endCall');
endButton.addEventListener("click", function () {
    simple.hangup();
    alert("Call Ended");
}, false);

//makes the call
simple.call('welcome@onsip.com'); }