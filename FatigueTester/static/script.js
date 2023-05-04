 //Defining the text in rectangle
var colors = ["red", "green", "blue", "yellow", "black"];

// Function to change the color of the rectangle and it's text
 function changeColor() {

      // Do I even use this function?
        console.log("changeColor() called");

      // Get a random number between 1 and 5
        var randomNumber = Math.floor(Math.random() * 5) + 1;
        var randomNumbertext = Math.floor(Math.random() * 5);

      // Get the color of the corresponding button
        var buttonColor = window.getComputedStyle(document.querySelector(".button" + randomNumber)).getPropertyValue("background-color");

      // Set the color of the rectangle to the button color
        document.getElementById("rectangle").style.backgroundColor = buttonColor;


      //Set text in rectangle to color
        rectangle.textContent = colors[randomNumbertext];
        rectangle.style.textAlign = "center";
        rectangle.style.lineHeight = "120px";
        rectangle.style.textShadow = "0 0 2px gray, 0 0 2px gray, 0 0 2px gray, 0 0 2px gray";
        document.getElementById("rectangle").style.color = "white";
    }

// Start the timer
var startTime = new Date().getTime();

var timerId = setInterval(function() {

        // Calculate the elapsed time
        var currentTime = new Date().getTime();
        var elapsedTime = currentTime - startTime;

        // Convert the elapsed time to seconds
        var seconds = Math.floor(elapsedTime / 1000);

        // Display the elapsed time
        var timeElapsedContainer = document.querySelector('#time_elapsed_container');
        timeElapsedContainer.textContent = 'Time elapsed: ' + seconds + ' seconds';
    }, 1000);


// Function to start the timer
function startTimer() {
    // Reset the start time
    startTime = new Date().getTime();
}

// Clock
 var clockTime = null; // Define a variable to store the start time

// Function to start the timer
function startClock() {
    if (clockTime === null) { // Check if this is the first click
        clockTime = new Date().getTime(); // Store the start time
        setInterval(updateClock, 0); // Start the clock
    }
}

// Function to update the clock
function updateClock() {
    var currentTime = new Date().getTime();
    var elapsedTime = currentTime - clockTime;
    var seconds = Math.floor(elapsedTime / 1000);
    var clock = document.querySelector('#clock');
    clock.textContent = seconds
}