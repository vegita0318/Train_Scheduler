// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBD_IaIHgsi50-Y01RUlTxPSSnik95Yhd8",
    authDomain: "train-scheduler-7e958.firebaseapp.com",
    databaseURL: "https://train-scheduler-7e958.firebaseio.com",
    projectId: "train-scheduler-7e958",
    storageBucket: "train-scheduler-7e958.appspot.com",
    messagingSenderId: "225419783766"

};


firebase.initializeApp(config);

var database = firebase.database();


database.ref().on("child_added", function (childSnapshot) {

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var freq = childSnapshot.val().freq;
    var currentTime = moment();

    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var time = childSnapshot.val().time;

    console.log(time);

    var firstTimeConverted = moment(time, "HH:mm").subtract(1, "years");

    console.log(firstTimeConverted);

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    console.log("DIFFERENCE IN TIME: " + diffTime);



    var tRemainder = diffTime % freq;

    console.log(tRemainder);



    var tMinutesTillTrain = freq - tRemainder;

    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);



    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));



    var nextArrival = moment(nextTrain).format("hh:mm");





    $('tbody').append('<tr><td>' + trainName + '</td><td>' + destination + '</td><td>' + freq + '</td><td>' + nextArrival + '</td><td>' + tMinutesTillTrain + '</td></tr>');



    $('#date1').text(moment(currentTime).format("MMMM Do YYYY"));

    $('#time1').text(moment(currentTime).format("hh:mm"));



}, function (errorObject) {

    console.log("The read failed: " + errorObject.code);

});



$(".btn").on("click", function (event) {


    event.preventDefault();


    
    name = $("#name").val().trim();

    destination = $("#destination").val().trim();

    time = $("#time").val().trim();

    freq = $("#freq").val().trim();



    if (name === '' || destination === '' || time === '' || freq === '') {

        alert('Please complete all fields!')

    } else {



        database.ref().push({

            name: name,

            destination: destination,

            time: time,

            freq: freq

        });



        $('#name').val("");

        $('#destination').val("");

        $('#time').val("");

        $('#freq').val("");



    }

});