class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.scoreID = Math.floor(Math.random() * 100000000);
    this.userInputs = [];
    this.currentQuestion = 0;
    this.lastQuestion = questions.length - 1;
    this.resultsList = [];
    this.totalScore = 0;
    this.userName = 'Anonymous';
  }

  get answersIndex() {
    return this.questions.map((question) => question.correctIndex);
  }

  generateQuestion(questionNum = this.currentQuestion) {
    const { userInputs } = this;
    const { id, question, answers, correctIndex } = this.questions[questionNum];

    const questionNumElement = document.createElement('h3');
    questionNumElement.innerText = `Question ${id + 1}`;
    const questionElement = document.createElement('h4');
    questionElement.innerText = question;

    mainBox.append(questionNumElement, questionElement);

    for (let i = 0; i < answers.length; i++) {
      const answer = answers[i];
      const newButton = document.createElement('button');
      newButton.classList.add('custom-button');
      newButton.setAttribute('id', `button-${i}`);
      newButton.innerText = answer;
      mainBox.appendChild(newButton);

      newButton.addEventListener('click', (event) => {
        const buttonIndex = parseInt(event.target.id.slice(-1));
        userInputs.push(buttonIndex);

        if (!this.isCorrect(id, buttonIndex)) {
          timer1.currentVal -= 30;
        }

        if (this.currentQuestion < this.lastQuestion) {
          this.currentQuestion++;
          mainBox.innerHTML = '';
          this.generateQuestion(this.currentQuestion);
        } else {
          timer1.stopTimer();
          this.resultsGenerator();
          this.resultsPageGenerator();
        }
      });
    }
  }

  isCorrect(questionIndex, inputIndex) {
    return this.answersIndex[questionIndex] === inputIndex;
  }

  resultsGenerator() {
    const userAnswers = this.userInputs;
    const correctAnswers = this.answersIndex;
    for (let i = 0; i < userAnswers.length; i++) {
      if (userAnswers[i] === correctAnswers[i]) {
        this.resultsList.push(true);
        this.totalScore++;
      } else {
        this.resultsList.push(false);
      }
    }
    return this.resultsList;
  }

  resultsPageGenerator() {
    timer.remove();
    mainBox.innerHTML = '';

    const resultsElement = document.createElement('h2');
    resultsElement.innerText = 'Your Results';
    const scoreElement = document.createElement('h3');
    scoreElement.innerText = `You achieved a score of ${this.totalScore} with ${timer1.toString()} remaining.`;
    const scoreInput = document.createElement('input');
    scoreInput.setAttribute('type', 'text');
    scoreInput.setAttribute('id', 'score-input');
    scoreInput.setAttribute('placeholder', 'var name =');
    scoreInput.setAttribute('maxlength', '3');

    scoreInput.addEventListener('change', () => {
      this.userName = scoreInput.value;
    });

    const saveButton = document.createElement('button');
    saveButton.innerText = 'Save Result';
    saveButton.setAttribute('id', 'save-button');

    saveButton.addEventListener('click', () => {
      this.resultsToLocal();
    }, { once: true });

    const resultsHeading = document.createElement('h3');
    resultsHeading.innerText = 'Results Breakdown';

    mainBox.append(resultsElement, scoreElement, scoreInput, saveButton, resultsHeading);

    for (let i = 0; i < this.resultsList.length; i++) {
      const question = `
