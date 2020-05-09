'use strict';



let nodeData; // object we will push to firebase
let fbData; // data we pull from firebase
let fbDataArray; // firebase data values converted to an array
let database; // reference to our firebase database
let folderName = 'messages'; // name of folder you create in db
let messageInput;
let sendMessageBtn;
let receiveMessageBtn;
let sendAgainBtn;
let receivedMessageBtn;
let receiveDiv, sendDiv;


function setup() {

  noCanvas();

  //messageInput = select("#messageInput");
  messageInput = document.querySelector("#messageInput");
  sendMessageBtn = document.querySelector("#sendMessageBtn");
  receiveMessageBtn = document.querySelector("#receiveMessageBtn");
  receivedMessageBtn = document.querySelector("#receivedMessageBtn");
  sendAgainBtn = document.querySelector("#sendAgainBtn");
  receiveDiv = document.querySelector("#receiveDiv");
  sendDiv = document.querySelector("#sendDiv");

  sendMessageBtn.addEventListener('click', sendMessage);
  receiveMessageBtn.addEventListener('click', receiveMessage);
  sendAgainBtn.addEventListener('click', sendAgain);


  let config = {
      apiKey: "AIzaSyCAdI1AB0j68UFP3vQUibwi3_nuoHQAPPo",
      authDomain: "messageenabotto.firebaseapp.com",
      databaseURL: "https://messageenabotto.firebaseio.com",
      projectId: "messageenabotto",
      storageBucket: "messageenabotto.appspot.com",
      messagingSenderId: "1031392204995",
      appId: "1:1031392204995:web:94f2af507c7955240d2a76",
  };

  firebase.initializeApp(config);

  database = firebase.database();

  // this references the folder you want your data to appear in
let ref = database.ref(folderName);
// **** folderName must be consistant across all calls to this folder

ref.on('value', gotData, errData);


// ---> To find your config object:
// They will provide it during Firebase setup
// or (if your project already created)
// 1. Go to main console page
// 2. Click on project
// 3. On project home page click on name of app under project name (in large font)
// 4. Click the gear icon --> it's in there!


}

function draw() {

}

function sendMessage() {

if (messageInput.value) {
  let timestamp = Date.now();

  nodeData = {
    messageText: messageInput.value,
    timestamp: timestamp,
    received: false,
  }

  createNode(folderName, timestamp, nodeData);

  console.log("sent message:");
  console.log(nodeData);

//createP(`sent mesage: ${nodeData.messageText}`);

messageInput.value = ''

sendDiv.style.display = 'none';
receiveDiv.style.display = 'block';

} else {
  alert("YOU ABSOLUTE BARBARIAN, YOU NEED TO TYPE A MESSAGE FIRST")
}

}

function receiveMessage() {

  for (let i = 0; i < fbDataArray.length; i++) {
    if(fbDataArray[i].received === false) {
//  console.log("received message");
//  console.log(fbDataArray[i].messageText);

  receivedMessage.innerHTML = fbDataArray[i].messageText;

  updateNode(folderName, fbDataArray[i].timestamp, {
    received: true
  });

  receiveMessageBtn.style.display = 'none';
  sendAgain.style.display = 'block';


  break;

} else {

receivedMessage.innerHTML = "no more messages";
}
}
}

function sendAgain() {

  receivedMessage.innerHTML = "";
  receiveMessageBtn.style.display = 'block';
  sendAgain.style.display = 'none';

  receiveDiv.style.display = 'none';
  sendDiv.style.display = 'block';

}
