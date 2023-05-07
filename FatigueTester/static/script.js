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
var popupcon = "This test consists of two parts. In the first part you have to click on the button which color corresponds with the color of the text. Click the button bellow when you are ready to start.";

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
     testparts();
     randomnumbers();
     changeColor();
}

function blueone() {
     buttonNumber = 2;
     testparts();
     randomnumbers();
     changeColor();
}

function greenone() {
     buttonNumber = 3;
     testparts();
     randomnumbers();
     changeColor();;
}

function yellowone() {
     buttonNumber = 4;
     testparts();
     randomnumbers();
     changeColor();
}

function blackone() {
     buttonNumber = 5;
     testparts();
     randomnumbers();
     changeColor();
}
function testparts() {
      if (clockrestart === 0){
         testone();
     }
      if (clockrestart === 1){
         testtwo();
     }
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

    if (seconds > 5 && clockrestart < 2) {
    popupcon = "This the end of first part of the test. In the seccond part you have to click button of the color that describes the word. Click the button bellow when you are ready to start."
    document.getElementById("popuptext").textContent = popupcon;
    document.getElementById("popup-overlay").style.display = "flex";
        if (clockrestart === 1) { // Show the popup overlay
            clockTime = null;
            clockInterval = null;
            clock.textContent = "0";
        }
    }

    if (clockrestart === 2) {
            clockTime = new Date().getTime();
            clockInterval = null;
            clockrestart = clockrestart +1;
            seconds = 0;
        }

    if (seconds > 5 && clockrestart > 2){
        popupcon = "This the end of test. When you are ready click the button bellow to see the results."
        document.getElementById("popuptext").textContent = popupcon;
        document.getElementById("popup-overlay").style.display = "flex"; // Show the popup overlay
        clockTime = null;
        clockInterval = null;
        clock.textContent = "0";


    }
}


// Show the popup overlay on page load
window.onload = function() {
  let popuptext = document.getElementById("popuptext");
  popuptext.textContent = popupcon;
  document.getElementById("popup-overlay").style.display = "flex";
}

// Hide the popup overlay and start the test when the button is clicked
function startTest() {
  document.getElementById("popup-overlay").style.display = "none";
  clockrestart = clockrestart + 1;
}