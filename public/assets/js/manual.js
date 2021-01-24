var firstName,lastName, phone, email, message;


const firebaseConfig = {
  apiKey: "AIzaSyBctQNIhg_WjLZYKfdyWVkXdqisgNu1y34",
  authDomain: "bikshan-web.firebaseapp.com",
  databaseURL: "https://bikshan-web.firebaseio.com",
  projectId: "bikshan-web",
  storageBucket: "bikshan-web.appspot.com",
  messagingSenderId: "1042636519347",
  appId: "1:1042636519347:web:51278f909eaff51ebe7dc6",
  measurementId: "G-91J86VSHCV"
};

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


  var db = firebase.firestore();

// console.log(document.getElementById("sendmessage").innerHTML);
// Thank you plug in------------>
const myform = document.getElementById("my-form");
myform.addEventListener("submit" , (e) => {
    e.preventDefault();
    // document.getElementById("sendButton").style.display = "none";
    // document.getElementById("sendingStatus1").style.display = "block";
    firstName = formValue("firstname");
    lastName = formValue("lastname");
    phone = formValue("phonenumber")
    email = formValue("email");
    message = formValue("messages");
    var response = grecaptcha.getResponse();
    if(response.length == 0){
    alert("reCapcha challenge failed! Please try again!")
    grecaptcha.reset();
    } else {
      console.log(firstName, lastName, email, message, phone, response);
      submitOnFirebase(firstName, lastName, email, phone, message);
      document.getElementById("loading").style.display = "block";
    }

    


})


function formValue(id){
    var inputValue = document.getElementById(id);
    return inputValue.value;
}

function submitOnFirebase(firstName, lastName, email, phone, message){
    db.collection("Contact_request").add({
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Phone: phone,
        Message: message
    })
    .then(function(docRef) {
        document.getElementById("loading").style.display = "none";
        document.getElementById("error-message").style.display = "none";
        document.getElementById("sent-message").style.display = "block";
        // document.getElementById("sendButton").style.display = "block";
        myform.reset();
        grecaptcha.reset();

    })
    .catch(function(error) {
        document.getElementById("loading").style.display = "none";
        document.getElementById("error-message").style.display = "block";
        console.error("Error adding document: ", error);
        document.getElementById("sent-message").style.display = "none";
    });
}


// //subscribe form
// const subscribeForm = document.getElementById("subscribe");
// // console.log(subscribeForm);
// subscribe.addEventListener("submit" , (e) => {
//     e.preventDefault();
//     subscriber = formValue("subscriber");
//     addSubscriber(subscriber);
// })
//
// function addSubscriber(subscriber){
//     db.collection("EC_Subscriber").add({
//         Email: subscriber,
//     })
//     .then(function(docRef) {
//         document.getElementById("submitButton2").value = "Subscribed!!";
//         subscribeForm.reset();
//     })
//     .catch(function(error) {
//         document.getElementById("submitButton2").value = "ERROR!!";
//     });
// }
