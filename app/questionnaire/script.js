// Initializing variables for question tracking
let currentQuestion = 0; // Tracks the index of the current question
let questions = []; // Array to store the questions fetched from the JSON file
let totalQuestions = 0; // Stores the total number of questions 

// Function to fetch questions from the JSON file
function getQuestions() {
    fetch('questions.json') // Fetching the JSON file
    .then(response => response.json()) // Parsing the response to JSON
    .then(fetchedData => { // Working with the parsed JSON
        questions = fetchedData; // Storing the fetched data into our questions array
        totalQuestions = questions.length; // Storing the total number of questions
        displayQuestion(); // Calling the function to display the first question
    });
}

// Function to display the current question and initialize the sliders and text box
function displayQuestion() {
    let questionBox = document.getElementById("questionBox");
    let textbox = document.getElementById('textbox');  // get the textbox element
    let addEventBtn = document.getElementById('addEventBtn');  // get the Add Event button element
    let removeEventBtn = document.getElementById('removeEventBtn');  // get the Remove Event button element

    questionBox.style.animation = 'none'; // reset the animation

    setTimeout(function() {
        // Setting the current question text
        questionBox.textContent = questions[currentQuestion].question;

        // Resetting the sliders and their value displays to 5
        document.getElementById("slider1").value = 5;
        document.getElementById("slider2").value = 5;
        document.getElementById("slider1Value").textContent = '5';
        document.getElementById("slider2Value").textContent = '5';

        // Resetting the response textarea
        document.getElementById("response").value = '';

        // Reset the textbox display to 'none'
        textbox.style.display = 'none';
        addEventBtn.style.display = 'inherit';  // show the Add Event button
        removeEventBtn.style.display = 'none';  // hide the Remove Event button

        // If it's the first question, disable the "Previous" button and clear its text
        document.getElementById("prevBtn").disabled = currentQuestion === 0;
        document.getElementById("prevBtn").textContent = currentQuestion === 0 ? '' : 'Previous';

        // If it's the last question, change the "Next" button to "Finish". Otherwise, it should read "Next"
        document.getElementById("nextBtn").textContent = currentQuestion === totalQuestions - 1 ? 'Finish' : 'Next';

        // Updating the progress bar
        updateProgressBar();

        // Now trigger a new animation
        questionBox.style.animation = '';
    }, 100);
}



// Function to update the progress bar and its label
function updateProgressBar() {
    // Calculating the progress percentage
    let progress = ((currentQuestion) / (totalQuestions - 1) * 100).toFixed(0);
    
    // Updating the width of the progress bar and the label text
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressLabel').textContent = progress + '%'; 

    // Changing the color of the label based on the progress
    if (progress > 50) {
        document.getElementById('progressLabel').style.color = '#FFFFFF'; // white color if progress is more than 50%
    } else {
        document.getElementById('progressLabel').style.color = '#333'; // dark gray color if progress is less than 50%
    }
}

// Event listener for "Next" button click
document.getElementById("nextBtn").addEventListener("click", function() {
    // If it's not the last question, increment the current question index, display the new question and update the progress bar
    if(currentQuestion < totalQuestions - 1) {
        currentQuestion++;
        displayQuestion();
        updateProgressBar();
    }
});

// Event listener for "Previous" button click
document.getElementById("prevBtn").addEventListener("click", function() {
    // If it's not the first question, decrement the current question index, display the new question and update the progress bar
    if(currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
        updateProgressBar();
    }
});

// Setting up sliders and their value displays
let slider1 = document.getElementById("slider1");
let slider2 = document.getElementById("slider2");
let output1 = document.getElementById("slider1Value");
let output2 = document.getElementById("slider2Value");

// Event listener for slider1 input change
slider1.oninput = function() {
    output1.innerHTML = Math.round(this.value); // Updating the display of slider1 value
}

// Event listener for slider2 input change
slider2.oninput = function() {
    output2.innerHTML = Math.round(this.value); // Updating the display of slider2 value
}

// Setting up the "Add Event" and "Remove Event" buttons and the text box for them
let addEventBtn = document.getElementById('addEventBtn');
let removeEventBtn = document.getElementById('removeEventBtn');
let textbox = document.getElementById('textbox');

// Event listener for "Add Event" button click
addEventBtn.addEventListener('click', function() {
    // Hiding the "Add Event" button, showing the "Remove Event" button and the text box
    addEventBtn.style.display = 'none';
    removeEventBtn.style.display = 'inherit';
    textbox.style.display = 'inherit';
});

// Event listener for "Remove Event" button click
removeEventBtn.addEventListener('click', function() {
    // Showing the "Add Event" button, hiding the "Remove Event" button and the text box
    addEventBtn.style.display = 'inherit';
    removeEventBtn.style.display = 'none';
    textbox.style.display = 'none';
});

// Calling the function to fetch the questions once the window has loaded
window.onload = getQuestions;
