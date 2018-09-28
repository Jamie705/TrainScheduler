$(document).ready(function () {

//variables
var name = "";
var destination = "";
var firstTrainTime = 0;
var frequency = 0;


// Initialize Firebase
var config = {
    apiKey: "AIzaSyB5CJq1Y8RFHTzN3yIpI2HSyCAvO-z0vCk",
    authDomain: "trainschedule-8b3fa.firebaseapp.com",
    databaseURL: "https://trainschedule-8b3fa.firebaseio.com",
    projectId: "trainschedule-8b3fa",
    storageBucket: "trainschedule-8b3fa.appspot.com",
    messagingSenderId: "346094434969"
};

firebase.initializeApp(config);
// Create a variable to reference the database.
var database = firebase.database();

    // Capture Button Click
    $("#addTrain").on("click", function (event) {
        event.preventDefault();

        // Grabbed values from text boxes
        var name = $("#name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var firstTrainTime = moment($("#firstTrain-input").val().trim());
        var frequency = $("#frequency-input").val().trim();

    //Create local object
    var newTrain = {
        name: name,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
    };
        // Code for handling the push
        database.ref().push(newTrain);

        // Logs everything to console
        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.firstTrainTime);
        console.log(newTrain.frequency);

        // Clears the text-boxes
        $("#name-input").val("");
        $("#destination-input").val("");
        $("#firstTrain-input").val("");
        $("#frequency-input").val("");

    });

    // Firebase watcher .on("child_added"
    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());
        
        // storing the snapshot.val() in a variable for convenience
        var cSnap = childSnapshot.val();
        // Console.loging the last user's data
        var name = cSnap.name;
        var destination = cSnap.destination;
        var firstTrainTime = cSnap.firstTrainTime;
        var frequency = cSnap.frequency;
        // Console.loging the last user's data
        console.log(name);
        console.log(destination);
        console.log(firstTrainTime);
        console.log(frequency);

        // Calculate the time before the next train
        //create a loop that adds frequency minutes to current and create nexttrain time
        var nextTrain = moment().diff(moment(firstTrainTime, "hours"), "minutes");
        console.log(nextTrain);
        
        //create new row
        var newRow = $("<tr>").append(
            $("<td>").text(name),
            $("<td>").text(destination),
            $("<td>").text(firstTrainTime),
            $("<td>").text(frequency)
        );
        // Append the new row to the table
        $("#train-table > tbody").append(newRow);
    });

    //     // Handle the errors
    // }, function (errorObject) {
    //     console.log("Errors handled: " + errorObject.code);
    // });
});