

var config = {
    apiKey: "AIzaSyALcja-uQShyVRbYwX5TswG_bEfetcZjt8",
    authDomain: "train-schedules-9ec56.firebaseapp.com",
    databaseURL: "https://train-schedules-9ec56.firebaseio.com",
    projectId: "train-schedules-9ec56",
    storageBucket: "train-schedules-9ec56.appspot.com",
    messagingSenderId: "978214863893"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

 
  $("#add-trainSchedule-btn").on("click", function(event) {
  
  event.preventDefault();

  //  User input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainFisrtTrain = moment($("#firstTrain-input").val().trim(), "HH:mm").format("HH:mm");
  var trainFrequency = moment($("#frequnecy-input").val().trim(), "mm").format("mm");

  // Holds train information 
  var newTrain = {
    train: trainName,
    destination: trainDestination,
    frequency: trainFrequency,
    firstTrain: trainFisrtTrain
    
  };

  // Uploads train information to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.train);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);
  
 

  // // Clears all of the text-boxes so new imput can be generated 
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#firstTrain-input").val("");
  $("#frequnecy-input").val("");
  
 
});


  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().train;
  var trainDestination = childSnapshot.val().destination;
  var trainFisrtTrain = childSnapshot.val().firstTrain
  var trainFrequency = childSnapshot.val().frequency;
 
  // this will take the current time from momentjs
  var localTime = moment();
  // This takes the string and turn it into an interger 
  var trainFrequencyInterval = parseInt(trainFrequency);

  var trainTimeCorversion = moment(trainFisrtTrain, "HH:mm").subtract(1, "year");

  var trainTimeDifference = moment().diff(moment(trainTimeCorversion), "minutes");

  var trainTimeRemainder = trainTimeDifference % trainFrequencyInterval;

  var trainMinutesAway = trainFrequencyInterval - trainTimeRemainder;

  var nextTrainTime = moment().add(trainMinutesAway, "minutes");

  // Add each train's data into the table in order its displayed
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + moment(nextTrainTime).format("HH:mm") + "</td><td>" + trainMinutesAway +  "</td></tr>");



});







