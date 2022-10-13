
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
      let aIndex = [];
      this.questions.forEach(question => {
      aIndex.push(question.correctIndex)
      });
      return aIndex;
    }
    generateQuestion(questionNum = this.currentQuestion) {
      const { userInputs } = this;
      const { id, question, answers, correctIndex } = this.questions[questionNum];
      
      let questionNumElement = document.createElement('h3')
      let questionElement = document.createElement('h4');
      questionNumElement.innerText = `Question ${id + 1}`;
      questionElement.innerText = question;
      mainBox.appendChild(questionNumElement);
      mainBox.appendChild(questionElement);

      for (let i = 0; i < answers.length; i++) {
        const answer = answers[i];
        let newButton = document.createElement('button');
        newButton.classList.add("custom-button");
        newButton.setAttribute('id', `button-${i}`);
        newButton.innerText = answer;
        mainBox.appendChild(newButton);
      }

      for (let i = 0; i < answers.length; i++) {
        const button = document.querySelector(`#button-${i}`);
        button.addEventListener('click', (event) => {
          let buttonIndex = parseInt(event.target.id.slice(-1));
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
      if (this.answersIndex[questionIndex] === inputIndex) {
        return true;
      } else {
        return false;
      }
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

        let resultsElement = document.createElement('h2');
      resultsElement.innerText = 'Your Results';
      mainBox.appendChild(resultsElement);

      let scoreElement = document.createElement('h3');
      scoreElement.innerText = `You acheived a score of ${this.totalScore} with ${timer1.toString()} remaining.`;
      mainBox.appendChild(scoreElement);

      let scoreInput = document.createElement('input');
      scoreInput.setAttribute('type', 'text');
      scoreInput.setAttribute('id', 'score-input');
      scoreInput.setAttribute('placeholder', 'var name =');
      scoreInput.setAttribute('maxlength', '3');
      mainBox.appendChild(scoreInput);

      scoreInput.addEventListener('change', () => {
        this.userName = scoreInput.value;
      })

      let saveButton = document.createElement('button');
      saveButton.innerText = 'Save Result';
      saveButton.setAttribute('id', 'save-button');
      mainBox.appendChild(saveButton);
      saveButton.addEventListener('click', () => {
        this.resultsToLocal();
      }, { once: true });

      let resultsHeading = document.createElement('h3');
      resultsHeading.innerText = 'Results Breakdown';

      for (let i = 0; i < this.resultsList.length; i++) {
        const question = `Q${this.questions[i].id + 1}: ${this.questions[i].question}`;
        const answer = this.questions[i].answers[this.userInputs[i]];
        const resultHeading = document.createElement('h5')
          resultHeading.innerText = question;
          mainBox.appendChild(resultHeading);
        const result = this.resultsList[i];
        let resultElement = document.createElement('p')
        resultElement.innerText = answer;
        resultElement.setAttribute('class', result ? 'result-true' : 'result-false')
        mainBox.appendChild(resultElement);
      }

      let tryAgainButton = document.createElement('button');
      tryAgainButton.innerText = 'Try Again';
      tryAgainButton.setAttribute('id', 'try-again-button');
      mainBox.appendChild(tryAgainButton);

      tryAgainButton.addEventListener('click', () => location.reload());
  
    }

    resultsToLocal() {

        if (!localStorage.getItem('scores-ids')) {
        localStorage.setItem('scores-ids', (JSON.stringify([])))
      }

      const scoreObject = {
        id: this.scoreID,
        name: this.userName,
        score: this.totalScore,
      }
      

      let tempCopy = JSON.parse(localStorage.getItem('scores-ids'));

      tempCopy.push(scoreObject);

      localStorage.setItem('scores-ids', (JSON.stringify(tempCopy)));
    }

    resultsFromLocal() {

        if (!localStorage.getItem('scores-ids')) {
        localStorage.setItem('scores-ids', (JSON.stringify([])))
      }
      function sortByScore(a, b) {
        const scoreA = a.score;
        const scoreB = b.score;
        let comparison = 0;
        if (scoreA < scoreB) {
          comparison = 1;
        } else if (scoreA > scoreB) {
          comparison = -1;
        }
        return comparison;
      }
      const unsortedCopy = JSON.parse(localStorage.getItem('scores-ids'));
      return unsortedCopy.sort(sortByScore);
    }
  
  

    buildHighScores() {
      const scores = this.resultsFromLocal();
      let highScoreElement = document.createElement('div');
      highScoreElement.setAttribute('id', 'high-scores-container');
      scores.forEach(score => {;
        let scoreElement = document.createElement('h5');
        scoreElement.setAttribute('class', 'high-score')
        scoreElement.innerText = `${score.name} || ${score.score}pts`
        highScoreElement.appendChild(scoreElement)
      });
      return highScoreElement;
    }
  
  }