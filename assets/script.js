
const timer = document.querySelector('#timer');
const mainBox = document.querySelector('#main-box');
const startButton = document.querySelector('#start-button')
const answerButtons = document.querySelector('.custom-button')


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
  }
  ,
  {
    id: 4,
    question: 'a very useful tool used during development and debugging for printing content to the debugger is',
    answers: ['javascript','terminal/bash','for loops','console log'],
    correctIndex: 3
  }
]


const timer1 = new Timer(300, timer);
const quiz1 = new Quiz(questions);

mainBox.appendChild(quiz1.buildHighScores());


startButton.addEventListener('click', () => {
  mainBox.innerHTML = '';
  startButton.remove();
  timer1.startTimer();
  quiz1.generateQuestion();
})
