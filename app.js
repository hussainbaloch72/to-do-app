

var firebaseConfig = {
  apiKey: "AIzaSyAtbSY5CBqMMqSAnA-42FE92QPOSZmpkfE",
  authDomain: "to-do-database-43d18.firebaseapp.com",
  projectId: "to-do-database-43d18",
  storageBucket: "to-do-database-43d18.appspot.com",
  messagingSenderId: "320541837032",
  appId: "1:320541837032:web:b2f1efea4864ac08e42b5d"
};

var app = firebase.initializeApp(firebaseConfig);

function addtodo() {
  var input = document.getElementById("inputField");
  if(input.value){

    
    var key = Date.now().toString(26)
    
    var userInput = {
      input:input.value,
      key
    }
    
    firebase.database().ref("userInput/" + key).set(userInput)
    
    input.value = "";
  }else{
    alert("Enter your Task")
  }
  }
  firebase.database().ref("userInput").on("child_added", function(data){
     // **********Create list************
     
     var liElement = document.createElement("li");
     
     
     var liText = document.createTextNode(data.val().input);
     
     
     liElement.appendChild(liText);
     
     // ********Delete button***********
     
     var delbtn = document.createElement("button");
     
     var delbtnText = document.createTextNode("Delete");
     
     delbtn.appendChild(delbtnText);
     
     delbtn.setAttribute("onclick", "deleteItem(this)");
     
     delbtn.setAttribute("id", data.val().key)
     
     
     liElement.appendChild(delbtn);
     
     // ********Edit button***********
     
     var editbtn = document.createElement("button");
     
     var editbtnText = document.createTextNode("Edit");
     
     editbtn.appendChild(editbtnText);
     
     liElement.appendChild(editbtn);
     
     editbtn.setAttribute("onclick", "editItem(this)");
     
     editbtn.setAttribute("id", data.val().key)
     
     var list = document.getElementById("list");
     
     list.appendChild(liElement);
     
     

     liElement.appendChild(liElement2)

    }
)


function deleteAll() {
firebase.database().ref("userInput").remove()
var list = document.getElementById("list");
list.innerHTML = "";
}

function deleteItem(z) {
firebase.database().ref("userInput").child(z.id).remove()
z.parentNode.remove();
}

function editItem(e) {
var valueName = e.parentNode.firstChild.nodeValue;
var input1 = prompt("Enter updated value...",valueName);
var editText = {
  input :input1,
  key:e.id,
}
firebase.database().ref("userInput").child(e.id).set(editText)
e.parentNode.firstChild.nodeValue = input1;

}

