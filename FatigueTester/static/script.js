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