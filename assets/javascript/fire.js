$(document).ready(function () {

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
        var firstTrainTime = $("#firstTrain-input").val().trim();
        var frequency = $("#frequency-input").val().trim();

        //Create local object
    var newTrain = {
        name: name,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP,

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

        //Handle the errors
        // }, function (errorObject) {
        //     console.log("Errors handled: " + errorObject.code);
        
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

    // +++++++++++++++++++++++++Time++++++++++++++
        // Calculate the time before the next train
        // get values from frequency
        timefrequency = frequency;
        
        // // Time is 3:30 AM
        firstTime = moment(firstTrainTime, "hh:mm");
        console.log(firstTime);

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log("first time converted: " + firstTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("Current time: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("Time difference: " + diffTime);

        // Time differenced and frequency
        var tRemainder = diffTime % timefrequency;
        console.log("Time remainder: " + tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = timefrequency - tRemainder;
        console.log("Minutes till train " + tMinutesTillTrain);

        // Next Train - adds minutes until next train and formats it in minutes
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("Next Train: " + moment(nextTrain).format("hh:mm"));

        //format next train in hours minutes
        var nextTrainFormated = moment(nextTrain).format("hh:mm");
        console.log(nextTrainFormated);
    // // +++++++++++++++++++++++++Time++++++++++++++

        //create new row
        var newRow = $("<tr>").attr("data",name).append(
            $("<td>").text(name),
            $("<td>").text(destination),
            $("<td>").text(firstTrainTime),
            $("<td>").text(frequency),
            $("<td>").text(nextTrainFormated),
            $("<td>").text(tMinutesTillTrain),
            $("<td>").append($("<button>Delete</button>").attr("id", "delete")),
        );
        // Append the new row to the table
        $("#train-table > tbody").append(newRow);
    });
    // When a user clicks a deletbutton then delete train
        $("table").on("click", "#delete", function () {
        $(this).closest("tr").remove();
        key = $(this).closest("tr").attr("data");
        console.log(key);
        database.ref().child(key).remove();

        });

        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
   
});