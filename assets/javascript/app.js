// Initialize Firebase
var config = {
    apiKey: "AIzaSyCO2uw3bJReojZ-mJ1tRM3A8z4USYbtPMw",
    authDomain: "unit-7-train-scheduler.firebaseapp.com",
    databaseURL: "https://unit-7-train-scheduler.firebaseio.com",
    projectId: "unit-7-train-scheduler",
    storageBucket: "",
    messagingSenderId: "419160630420"
};
firebase.initializeApp(config);

// Create a var to store Firebase Data
var database = firebase.database();

// Button to add user input

$("#addTrainBtn").on("click", function(e){
    e.preventDefault();

    // Grab User Input
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = $("#firstTrainInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();

    // Use momentJS to convert and calculate time

    var firstTimeMoment = moment(firstTrain, "HH:mm").subtract(1, "years");
    var timeNow = moment();
    var timeDifference = timeNow.diff(moment(firstTimeMoment), "minutes");
    var timeRemaining = timeDifference % frequency;
    var minutesAway = frequency - timeRemaining;
    var nextArrival = timeNow.add(minutesAway, "minutes");
    var nextArrivalMoment = moment(nextArrival).format("HH:mm");


    // Create new object to store data from form
    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        nextArrivalMoment: nextArrivalMoment,
        minutesAway: minutesAway
    };

    // Push new train data to Firebase database
    database.ref().push(newTrain);

    // Console Log Check
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);
    console.log(newTrain.nextArrivalMoment);
    console.log(newTrain.minutesAway);

    // Clear previous input
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

}); // End addTrainBtn function

// Add new train info to Firebase and create a new row from user input

database.ref().on("child_added", function(childSnapshot) {
    // clg childSnapshot
    console.log(childSnapshot.val());

    // Extract info for from snapshot; store in var
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var frequency = childSnapshot.val().frequency;
    var firstTrain = childSnapshot.val().firstTrain;
    var nextTrain = childSnapshot.val().nextArrivalMoment;
    var minutesAway = childSnapshot.val().minutesAway;
    
    // clg Check Point
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);
    console.log(nextTrain);
    console.log(minutesAway);

    
    // Add info to table
    var newTableRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text("Every " + frequency + " minutes"),
        $("<td>").text(nextTrain),
        $("<td>").text(minutesAway + " minutes away")
       
    );

    // Append newTableRow to timeTable
    $("#timeTable > tbody").append(newTableRow);
});

// Tried to add one single button to remove all data from firebase but did not succeed. The button shows up on the page but it obviously doesn't do anything for now. 

/* 
Should be something like: 

$("#removeBtn").on("click", function(){
    database.ref().on("child_added", function(childSnapshot){
        database.ref().remove();
    });
});
*/
