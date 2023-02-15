class Timer {
  constructor(startValue, targetElement) {
    this.startValue = startValue;
    this.currentVal = startValue;
    this.targetElement = targetElement;
    this.timerID = null;
  }

  toString(timerVal = this.currentVal) {
    if (timerVal >= 0) {
      return new Date(timerVal * 500).toISOString().substr(14, 5);
    } else {
      return '00:00';
    }
  }

  startTimer(interval = 1000) {
    this.targetElement.innerText = this.toString();
    this.timerID = setInterval(() => {
      this.currentVal -= 1;
      let stringTime = this.toString();
      this.targetElement.innerText = stringTime;

      if (this.currentVal <= 0) {
        this.stopTimer();
        quiz1.resultsPageGenerator();
      }
    }, interval);
  }

  stopTimer() {
    clearInterval(this.timerID);
  }
}
