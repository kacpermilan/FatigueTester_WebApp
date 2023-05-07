// Start the timer
let startTime = new Date().getTime();

//Defining the text in rectangle
const colors = ["red", "blue", "green", "yellow", "black"];

// Define an empty array to store table data
let tableData = [];
let tableDataTwo = [];


let buttonNumber = 10;
let randomNumber = 10;
let randomNumbertext = 10;
let clockrestart =0;


// Function to log table data to console
function logTableData() {
    console.log(tableData);
}
function logTableDataTwo() {
    console.log(tableDataTwo);
}
// Functions for the buttons
function redone() {
     buttonNumber = 1;
     if (clockrestart === 0){
         testone();
     } else {
         testtwo();
     }
     randomnumbers();
     changeColor();
}

function blueone() {
     buttonNumber = 2;
      if (clockrestart == 0){
         testone();
     } else {
         testtwo();
     }
     randomnumbers();
     changeColor();
}

function greenone() {
     buttonNumber = 3;
      if (clockrestart == 0){
         testone();
     } else {
         testtwo();
     }
     randomnumbers();
     changeColor();;
}

function yellowone() {
     buttonNumber = 4;
      if (clockrestart == 0){
         testone();
     } else {
         testtwo();
     }
     randomnumbers();
     changeColor();
}

function blackone() {
     buttonNumber = 5;
      if (clockrestart == 0){
         testone();
     } else {
         testtwo();
     }
     randomnumbers();
     changeColor();
}

function randomnumbers() {
     // Get a random numbers for color and content of text
     randomNumber = Math.floor(Math.random() * 5) + 1;
     randomNumbertext = Math.floor(Math.random() * 5);
}

function testone() {
    // Calculate the elapsed time since the timer started
    let currentTime = new Date().getTime();
    let elapsedTime = currentTime - startTime;
     // Check if the clicked button number matches the random number
    let match = buttonNumber === randomNumber ? 1 : 0;
     // Push the data to the table
    tableData.push({ match: match, timeElapsed: elapsedTime});
    logTableData();
    startTime = new Date().getTime();
}

function testtwo() {
    // Calculate the elapsed time since the timer started
    let currentTime = new Date().getTime();
    let elapsedTime = currentTime - startTime;
     // Check if the clicked button number matches the random number
    let match = buttonNumber === (randomNumbertext+1) ? 1 : 0;
     // Push the data to the table
    tableDataTwo.push({ match: match, timeElapsed: elapsedTime});
    logTableDataTwo();
    startTime = new Date().getTime();
}

 function changeColor() {

    // Get the color of the corresponding button
    let buttonColor = window.getComputedStyle(document.querySelector(".button" + randomNumber)).getPropertyValue("background-color");

    //Set text color and content
    rectangle.textContent = colors[randomNumbertext];
    rectangle.style.textAlign = "center";
    rectangle.style.lineHeight = "120px";
    document.getElementById("rectangle").style.color = buttonColor;

    }

// Clock
 let clockTime = null; // Define a variable to store the start time
 let clockInterval = null;
// Function to start the timer
function startClock() {
    if (clockTime === null) { // Check if this is the first click
        clockTime = new Date().getTime(); // Store the start time
        setInterval(updateClock, 0); // Start the clock
    }
}

// Function to update the clock
function updateClock() {
    let currentTime = new Date().getTime();
    let elapsedTime = currentTime - clockTime;
    let seconds = Math.floor(elapsedTime / 1000);
    let clock = document.querySelector('#clock');
    clock.textContent = seconds.toString()
    if (seconds == 6) {
    clearInterval(clockInterval); // Stop the clock
    alert('Time is up!'); // Show a popup
    // Reset clock variables
    clockTime = new Date().getTime();
    clockInterval = null;
    clock.textContent = "0";
    clockrestart = clockrestart + 1;
    }
    if (clockrestart >1){
        clockTime = null;
        clockInterval = null;
        clock.textContent = "0";

    }
}

