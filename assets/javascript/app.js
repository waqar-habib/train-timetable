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
        // Add other input vars here

    // Create new object to store data from form
    var newTrain = {
        name: trainName
        // other key value pairs go here
    };

    // Push new train data to Firebase database
    database.ref().push(newTrain);

    // Console Log Check
    console.log(newTrain.name);
        // add other clg checks here

    // Clear previous input
    $("#trainNameInput").val("");
        //add other empty .vals here

}); // End addTrainBtn function

// Add new train info to Firebase and create a new row from user input

database.ref().on("child_added", function(childSnapshot) {
    // clg childSnapshot
    console.log(childSnapshot.val());

    // Extract info for from snapshot; store in var
    var trainName = childSnapshot.val().name;
        // Add other vars similar to ln22 here

    // clg Check Point
    console.log(trainName);

    // MomentJS code goes below

    // Add info to table
    var newTableRow = $("<tr>").append(
        $("<td>").text(trainName)
        // Add other td.text here
    );

    // Append newTableRow to timeTable
    $("#timeTable > tbody").append(newTableRow);
});
