// Use destructuring to assign variables
const timer = document.querySelector('#timer');
const mainBox = document.querySelector('#main-box');
const startButton = document.querySelector('#start-button')
const answerButtons = document.querySelector('.custom-button')

// Use const for variables that won't be reassigned
const questions = [
  {
    id: 0,
    question: 'commonly used data types do not include?: ',
    answers: ['strings','booleans','alerts','numbers'],
    correctIndex: 2
  },
  {
    id: 1,
    question: 'The condition in an if/else statement is enclosed within?',
    answers: ['Quotes','curly brackets','parenthases','square brackets'],
    correctIndex: 2
  },
  {
    id: 2,
    question: 'Arrays in javascript can used to store _____',
    answers: ['Numbers and strings','other arrays','booleans','all of the above'],
    correctIndex: 3
  },
  {
    id: 3,
    question: 'string values must be enclosed within ______ when being assigned to variables "?',
    answers: ['commas','curly brackets','qoutes','parentheses'],
    correctIndex: 2
  },
  {
    id: 4,
    question: 'a very useful tool used during development and debugging for printing content to the debugger is',
    answers: ['javascript','terminal/bash','for loops','console log'],
    correctIndex: 3
  }
];

// Use class syntax to define Timer and Quiz
class Timer {
  constructor(time, display) {
    this.time = time;
    this.display = display;
  }

  startTimer() {
    // Start the timer logic
  }
}

class Quiz {
  constructor(questions) {
    this.questions = questions;
  }

  generateQuestion() {
    // Generate a question and update the UI
  }

  buildHighScores() {
    // Build the high scores UI
  }
}

// Use const for objects that won't be reassigned
const timer1 = new Timer(300, timer);
const quiz1 = new Quiz(questions);

// Append the high scores UI to the DOM
mainBox.appendChild(quiz1.buildHighScores());

// Add an event listener to the start button
startButton.addEventListener('click', () => {
  // Clear the main box and remove the start button
  mainBox.innerHTML = '';
  startButton.remove();

  // Start the timer and generate the first question
  timer1.startTimer();
  quiz1.generateQuestion();
});

