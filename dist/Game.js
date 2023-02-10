import { config } from "./config.js";
export class Game {
  timerElement;
  gameResultElement;
  wizard;
  warrior;
  constructor(wizard, warrior) {
    this.timerElement = document.getElementById("timer");
    this.gameResultElement = document.getElementById("game-result");
    this.timerElement.textContent = `${config.gameTimeInSeconds}`;
    this.wizard = wizard;
    this.warrior = warrior;
  }
  decreaseGameTime() {
    if (config.gameTimeInSeconds >= 0) {
      setTimeout(this.decreaseGameTime.bind(this), 1000);
      this.timerElement.textContent = `${config.gameTimeInSeconds--}`;
    } else if (config.gameTimeInSeconds <= 0) this.determineTheWinner();
  }
  gameOver() {
    this.timerElement.textContent = `Game Over`;
  }
  fantasyWarriorWon() {
    this.gameResultElement.textContent = `Fantasy warrior won!`;
    this.gameResultElement.style.display = "flex";
  }
  wizardWon() {
    this.gameResultElement.textContent = `The evil wizard won!`;
    this.gameResultElement.style.display = "flex";
  }
  tiedGame() {
    this.gameResultElement.textContent = `Its a tie!`;
    this.gameResultElement.style.display = "flex";
  }
  determineTheWinner() {
    this.gameOver();
    if (this.wizard.health === this.warrior.health) this.tiedGame();
    else if (this.wizard.health < this.warrior.health) this.fantasyWarriorWon();
    else if (this.wizard.health > this.warrior.health) this.wizardWon();
  }
}
