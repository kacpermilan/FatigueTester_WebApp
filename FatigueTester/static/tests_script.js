// Start the timer
let startTime = new Date().getTime();

//Defining the text in rectangle
const colors = [gettext("red"), gettext("blue"), gettext("green"), gettext("yellow"), gettext("black")];

// Define an empty array to store table data
let tableData = [];
let tableDataTwo = [];

const h1Element = document.querySelector('.mt-5.mb-3');

let rowsone = -1;
let rowstwo = -1;
let buttonNumber = 10;
let randomNumber = 10;
let randomNumbertext = 10;
let clockrestart = 0;
let popupcon = gettext("This test consists of two parts. In the first part you have to click on the button which color corresponds with the color of the text. Click the button bellow when you are ready to start.");
document.getElementById("popup-overlay").style.display = "none";
// Function to log table data to console
function logTableData() {
    console.log(tableData);
    rowsone = rowsone + 1
    console.log("rowsone =", rowsone);
}

function logTableDataTwo() {
    console.log(tableDataTwo);
    rowstwo = rowstwo + 1
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
    if (clockrestart === 1) {
        testone();
    }
    if (clockrestart === 3) {
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
    tableData.push({match: match, timeElapsed: elapsedTime});
    logTableData();
    startTime = new Date().getTime();
}

function testtwo() {
    // Calculate the elapsed time since the timer started
    let currentTime = new Date().getTime();
    let elapsedTime = currentTime - startTime;
    // Check if the clicked button number matches the random number
    let match = buttonNumber === (randomNumbertext + 1) ? 1 : 0;
    // Push the data to the table
    tableDataTwo.push({match: match, timeElapsed: elapsedTime});
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

    h1Element.style.display = 'none';
}

// Function to update the clock
function updateClock() {
    const tests_duration = 30
    let currentTime = new Date().getTime();
    let elapsedTime = currentTime - clockTime;
    let seconds = Math.floor(elapsedTime / 1000);
    let clock = document.querySelector('#clock');
    clock.textContent = seconds.toString()

    if (seconds > tests_duration && clockrestart < 2) {
        popupcon = gettext("This the end of first part of the test. In the seccond part you have to click button of the color that describes the word. Click the button bellow when you are ready to start.")
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
        clockrestart = clockrestart + 1;
        seconds = 0;
    }

    if (seconds > tests_duration && clockrestart === 3) {
        popupcon = gettext("This the end of test. When you are ready click the button bellow to see the results.")
        document.getElementById("popuptext").textContent = popupcon;
        document.getElementById("popup-overlay").style.display = "flex"; // Show the popup overlay
        clockTime = null;
        clockInterval = null;
        clock.textContent = "0";
    }
}



// Show the popup overlay on page load
 function teststart() {
    let popuptext = document.getElementById("popuptext");
    popuptext.textContent = popupcon;
    document.getElementById("popup-overlay").style.display = "flex";
    document.getElementById("start-test").style.display = "none";
    h1Element.style.display = 'flex';
    h1Element.style.textAlign = "center";
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
    let countone = 0;
    let counttwo = 0;
    let time;
    let counttimeone = 0;
    let counttimetwo = 0;
    let row;
    let i;


    for (i = 1; i <= rowsone; i++) { // We ignore the first row in the table
        row = tableData[i].match;
        time = tableData[i].timeElapsed;
        counttimeone = counttimeone + time;
        if (row === 1) {
            countone = countone + 1;
        }
    }

    for (i = 1; i <= rowstwo; i++) { // We ignore the first row in the table
        row = tableDataTwo[i].match;
        time = tableDataTwo[i].timeElapsed;
        counttimetwo = counttimetwo + time;
        if (row === 1) {
            counttwo = counttwo + 1;
        }

    }

    const testnum = rowsone + rowstwo;
    const meantime = (counttimeone + counttimetwo) / testnum;
    const rightanw = countone + counttwo;
    const stos = rightanw / testnum;
    console.log("correct answers:", rightanw, "/", testnum, " average time:", meantime);

    let category;

    if (stos <= 0.30) {
        category = "exhausted";
    }
    if (stos <= 0.60 && stos > 0.30) {
        if (meantime > 1200) {
            category = "exhausted";
        } else {
            category = "tired";
        }
    }
    if (stos <= 0.85 && stos > 0.60) {
        if (meantime >= 1200) {
            category = "exhausted";
        }
        if (meantime < 1200 && meantime >= 800) {
            category = "tired";
        }
        if (meantime < 800) {
            category = "slightly tired";
        }
    }
    if (stos <= 1 && stos > 0.85) {
        if (meantime >= 1200) {
            category = "exhausted";
        }
        if (meantime < 1200 && meantime >= 800) {
            category = "tired";
        }
        if (meantime < 800 && meantime >= 650) {
            category = "slightly tired";
        }
        if (meantime < 650) {
            category = "well rested";
        }
    }
    console.log(category);
    const testArea = document.querySelector('.test_area');

    // set their display property to none
    testArea.style.display = 'none';

    results_text.textContent = gettext("You are ") + gettext(category);
    correct_ans_text.textContent = gettext("Correct answers") + ": " + rightanw + "/" + testnum;
    avg_result_text.textContent = gettext("Average response time") + ": " + meantime.toFixed(2) + " ms";

    let rowNumbersone = [];
    let timetabone = [];
    let matchtabone = [];
    for (i = 1; i < rowsone; i++) {
        rowNumbersone.push(i);
        timetabone.push(tableData[i].timeElapsed);
        matchtabone.push(tableData[i].match);
    }

    let rowNumberstwo = [];
    let timetabtwo = [];
    let matchtabtwo = [];
    for (i = 1; i < rowstwo; i++) {
        rowNumberstwo.push(i);
        timetabtwo.push(tableDataTwo[i].timeElapsed);
        matchtabtwo.push(tableDataTwo[i].match);
    }

    const dataone = {
        labels: rowNumbersone,
        datasets: [{
            label: gettext('Test part one'),
            data: timetabone,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            pointRadius: 5,
            pointBackgroundColor: function (context) {
                const index = context.dataIndex;
                if (matchtabone[index] === 1) {
                    return 'green';
                } else {
                    return 'red';
                }
            }
        }]
    }

    const configone = {
        type: 'line',
        data: dataone,
    };

    const ctx = document.getElementById('lineChart').getContext('2d');
    const lineChart = new Chart(ctx, configone);

    const datatwo = {
        labels: rowNumberstwo,
        datasets: [{
            label: gettext('Test part two'),
            data: timetabtwo,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            pointRadius: 5,
            pointBackgroundColor: function (context) {
                const indextwo = context.dataIndex;
                if (matchtabtwo[indextwo] === 1) {
                    return 'green';
                } else {
                    return 'red';
                }
            }
        }]
    };

    const configtwo = {
        type: 'line',
        data: datatwo,
    };

    const ctxtwo = document.getElementById('lineCharttwo').getContext('2d');
    const lineCharttwo = new Chart(ctxtwo, configtwo);

    document.getElementById("results").style.display = "block";
    sendTestData(stos, meantime, category, tableData, tableDataTwo)
}

function sendTestData(test_score, average_response_time, assessment, type_one_data, type_two_data)
{
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    fetch('/store_test_data/',
{
        method: 'POST',
        headers:
        {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': csrftoken,
        },
        body: new URLSearchParams(
    {
            'test_score': test_score,
            'average_response_time': average_response_time,
            'assessment': assessment,
            'type_one_data': JSON.stringify(type_one_data.slice(1)),
            'type_two_data': JSON.stringify(type_two_data.slice(1)),
        }),
    })
    .then(response => response.json())
    .then(data =>
    {
        if (data.status === "success")
        {
            console.log("Data saved successfully");
        } else
        {
            console.log("Error saving data");
        }
    })
    .catch(error =>
    {
        console.error('Error:', error);
    });
}
