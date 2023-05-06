// Start the timer
let startTime = new Date().getTime();

//Defining the text in rectangle
const colors = ["red", "blue", "green", "yellow", "black"];

// Define an empty array to store table data
let tableData = [];

// Function to log table data to console
function logTableData() {
    console.log(tableData);
}

// Function to change the color and content of text
 function changeColor() {
    // Get a random number between 1 and 5
    let randomNumber = Math.floor(Math.random() * 5) + 1;
    let randomNumbertext = Math.floor(Math.random() * 5);

    // Check if the clicked button number matches the random number
    let match = buttonNumber === randomNumber ? 1 : 0;

    // Get the color of the corresponding button
    let buttonColor = window.getComputedStyle(document.querySelector(".button" + randomNumber)).getPropertyValue("background-color");

    //Set text color and content
    rectangle.textContent = colors[randomNumbertext];
    rectangle.style.textAlign = "center";
    rectangle.style.lineHeight = "120px";
    document.getElementById("rectangle").style.color = buttonColor;

    // Calculate the elapsed time since the timer started
    let currentTime = new Date().getTime();
    let elapsedTime = currentTime - startTime;

    // Push the data to the table
    tableData.push({ match: match, timeElapsed: elapsedTime });
    }

// Clock
 let clockTime = null; // Define a variable to store the start time

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
}

