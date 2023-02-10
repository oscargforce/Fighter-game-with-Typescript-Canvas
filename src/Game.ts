import { config } from "./config.js";
import { Fighter } from "./Fighter.js";

export class Game {
  private timerElement: HTMLElement;
  private gameResultElement: HTMLElement;
  private wizard: Fighter;
  private warrior: Fighter;

  constructor(wizard: Fighter, warrior: Fighter) {
    this.timerElement = document.getElementById("timer")!;
    this.gameResultElement = document.getElementById("game-result")!;
    this.timerElement.textContent = `${config.gameTimeInSeconds}`;
    this.wizard = wizard;
    this.warrior = warrior;
  }

  decreaseGameTime(): void {
    if (config.gameTimeInSeconds >= 0) {
      setTimeout(this.decreaseGameTime.bind(this), 1000);
      this.timerElement.textContent = `${config.gameTimeInSeconds--}`;
    } else if (config.gameTimeInSeconds <= 0) this.determineTheWinner();
  }

  private gameOver(): void {
    this.timerElement.textContent = `Game Over`;
  }
  private fantasyWarriorWon(): void {
    this.gameResultElement.textContent = `Fantasy warrior won!`;
    this.gameResultElement.style.display = "flex";
  }

  private wizardWon(): void {
    this.gameResultElement.textContent = `The evil wizard won!`;
    this.gameResultElement.style.display = "flex";
  }

  private tiedGame(): void {
    this.gameResultElement.textContent = `Its a tie!`;
    this.gameResultElement.style.display = "flex";
  }

  determineTheWinner(): void {
    this.gameOver();
    if (this.wizard.health === this.warrior.health) this.tiedGame();
    else if (this.wizard.health < this.warrior.health) this.fantasyWarriorWon();
    else if (this.wizard.health > this.warrior.health) this.wizardWon();
  }
}
