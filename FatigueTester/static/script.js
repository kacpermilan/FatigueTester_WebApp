// Start the timer
let startTime = new Date().getTime();

//Defining the text in rectangle
const colors = ["red", "blue", "green", "yellow", "black"];

// Define an empty array to store table data
let tableData = [];
let tableDataTwo = [];

let rowsone = -1;
let rowstwo = -1;
let buttonNumber = 10;
let randomNumber = 10;
let randomNumbertext = 10;
let clockrestart =0;
let popupcon = "This test consists of two parts. In the first part you have to click on the button which color corresponds with the color of the text. Click the button bellow when you are ready to start.";

// Function to log table data to console
function logTableData() {
    console.log(tableData);
    rowsone=rowsone + 1
    console.log("rowsone =", rowsone);
}
function logTableDataTwo() {
    console.log(tableDataTwo);
    rowstwo=rowstwo + 1
    console.log("rowstwo =", rowstwo);
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
     changeColor();
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
      if (clockrestart === 1){
         testone();
     }
      if (clockrestart === 3){
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

    if (seconds > 1 && clockrestart < 2) {
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

    if (seconds > 1 && clockrestart ===3 ){
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

  if (clockrestart === 4) {
      result();
      document.getElementById("popup-overlay").style.display = "none";
  }
}

function result() {
    var countone = 0;
    var counttwo = 0;
    var time;
    var counttimeone = 0;
    var counttimetwo = 0;
    var row;
    var i;


    for ( i = 1; i <= rowsone; i++) { // We ignore the first row in the table
    row = tableData[i].match;
    time = tableData[i].timeElapsed;
    counttimeone = counttimeone + time;
        if (row === 1) {
            countone = countone + 1;
        }
    }

    for ( i = 1; i <= rowstwo; i++) { // We ignore the first row in the table
    row = tableDataTwo[i].match;
    time = tableDataTwo[i].timeElapsed;
    counttimetwo = counttimetwo + time;
    if (row === 1) {
            counttwo = counttwo + 1;
        }

    }

var testnum = rowsone + rowstwo;
var meantime = (counttimeone+counttimetwo) / testnum;
var rightanw = countone+counttwo;
var stos = rightanw/testnum;
console.log("poprawne odp:", rightanw, "/", testnum, " średni czas:", meantime);

var category;

    if (stos <= 0.30){
        category = "exhausted";
    }
    if (stos <= 0.60 && stos > 0.30){
        if (meantime > 1100){
            category = "exhausted";
        } else{
            category = "tired";
        }
    }
     if (stos <= 0.85 && stos > 0.60 || meantime > 600 && meantime < 800){
        if (meantime >= 1100){
            category = "exhausted";
        }
        if (meantime < 1100 && meantime >= 800){
            category = "tired";
        }
        if (meantime < 800 && meantime >= 600) {
            category = "slightly tired";
        }
    }
     if (stos <= 1 && stos > 0.85 ){
         if (meantime >= 1100){
            category = "exhausted";
        }
        if (meantime < 1100 && meantime >= 800){
            category = "tired";
        }
        if (meantime < 800 && meantime >= 650) {
            category = "slightly tired";
        }
        if (meantime < 650 ) {
            category = "well rested";
        }
    }
console.log(category);
var testArea = document.querySelector('.test_area');
  var h1Element = document.querySelector('.mt-5.mb-3');

// set their display property to none
testArea.style.display = 'none';
h1Element.style.display = 'none';

results.textContent ="You are " + category;


let rowNumbersone = [];
let timetabone = [];
for ( i = 1; i < rowsone; i++) {
  rowNumbersone.push(i);
  timetabone.push(tableData[i].timeElapsed);
}

let rowNumberstwo = [];
let timetabtwo = [];
for ( i = 1; i < rowstwo; i++) {
  rowNumberstwo.push(i);
  timetabtwo.push(tableDataTwo[i].timeElapsed);
}

//line
var ctxL = document.getElementById("lineChart").getContext('2d');
var myLineChart = new Chart(ctxL, {
  type: 'line',
  data: {
    labels: rowNumbersone,
    datasets: [{
      label: "Test part one",
      data: [timetabone],
      backgroundColor: [
        'rgba(105, 0, 132, .2)',
      ],
      borderColor: [
        'rgba(200, 99, 132, .7)',
      ],
      borderWidth: 2
    },

    ]
  },
  options: {
    responsive: true
  }
});
}

