// Start the timer
var startTime = new Date().getTime();

//Defining the text in rectangle
var colors = ["red", "blue", "green", "yellow", "black"];

// Define an empty array to store table data
var tableOne = [];

// Function to log table data to console
function logTableData() {
    console.log(tableOne);
}
// Function to change the color and content of text
 function changeColor() {


      // Get a random number between 1 and 5
        var randomNumber = Math.floor(Math.random() * 5) + 1;
        var randomNumbertext = Math.floor(Math.random() * 5);

      // Check if the clicked button number matches the random number
        var match = buttonNumber === randomNumber ? 1 : 0;

      // Get the color of the corresponding button
        var buttonColor = window.getComputedStyle(document.querySelector(".button" + randomNumber)).getPropertyValue("background-color");

      //Set text color and content
        rectangle.textContent = colors[randomNumbertext];
        rectangle.style.textAlign = "center";
        rectangle.style.lineHeight = "120px";
        document.getElementById("rectangle").style.color = buttonColor;

      // Calculate the elapsed time since the timer started
        var currentTime = new Date().getTime();
        var elapsedTime = currentTime - startTime;

      // Push the data to the table
        tableOne.push({ match: match, timeElapsed: elapsedTime });
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

