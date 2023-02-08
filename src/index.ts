import { config } from "./config.js";
import { Fighter } from "./Fighter.js";
import { Game } from "./Game.js";
import { isInsideHitBox } from "./hitbox-utils.js";
import { Sprite } from "./Sprite.js";

const canvasElement = document.getElementById("gameWindow") as HTMLCanvasElement;

export const canvas = canvasElement.getContext("2d") as CanvasRenderingContext2D;

canvasElement.width = config.canvasWidth;
canvasElement.height = config.canvasHeight;

canvas.fillRect(0, 0, canvasElement.width, canvasElement.height);

const background = new Sprite({
  imgSrc: "images/Battleground3.png",
  numOfFrames: 1,
  position: { x: 0, y: 0 },
});

const wizard = new Fighter({
  imgSrc: "images/Evil-Wizard/idle.png",
  numOfFrames: 8,
  offset: { x: 200, y: 0 },
  position: { x: 0, y: 0 },
  scale: 3,
  sprites: {
    idle: { numOfFrames: 8, imgSrc: "images/Evil-Wizard/Idle.png" },
    attack: { numOfFrames: 8, imgSrc: "images/Evil-Wizard/Attack.png" },
    run: { numOfFrames: 8, imgSrc: "images/Evil-Wizard/Move.png" },
    takeHit: { numOfFrames: 4, imgSrc: "images/Evil-Wizard/Take-Hit.png" },
    death: { numOfFrames: 5, imgSrc: "Images/Evil-Wizard/Death.png" },
  },
  attackBox: { height: 50, width: 175, offset: { x: 20, y: 200 } },
});

const warrior = new Fighter({
  imgSrc: "images/fantasy-warrior/Idle.png",
  numOfFrames: 10,
  position: { x: 600, y: 0 },
  offset: { x: 200, y: 0 },
  scale: 3,
  sprites: {
    idle: {
      numOfFrames: 10,
      imgSrc: "images/fantasy-warrior/Idle.png",
    },
    attack: {
      numOfFrames: 7,
      imgSrc: "images/fantasy-warrior/Attack1.png",
    },
    run: { numOfFrames: 8, imgSrc: "images/fantasy-warrior/Run.png" },
    jump: { numOfFrames: 3, imgSrc: "images/fantasy-warrior/Jump.png" },
    fall: { numOfFrames: 3, imgSrc: "images/fantasy-warrior/Fall.png" },
    takeHit: { numOfFrames: 3, imgSrc: "images/fantasy-warrior/Take-Hit.png" },
    death: { numOfFrames: 7, imgSrc: "images/fantasy-warrior/Death.png" },
  },
  attackBox: { height: 40, width: 130, offset: { x: -95, y: 200 } },
});

const game = new Game(wizard, warrior);

function animate() {
  window.requestAnimationFrame(animate);
  background.update();
  wizard.update();
  warrior.update();

  if (isInsideHitBox(wizard, warrior) && wizard.isAttacking) {
    wizard.isAttacking = false;
    if (warrior.isDead()) warrior.switchSprite("death");
    else warrior.switchSprite("takeHit");

    document.getElementById(
      "enemy-health-left"
    )!.style.width = `${(warrior.health -= config.wizardDmg)}%`;
  }

  if (isInsideHitBox(warrior, wizard) && warrior.isAttacking) {
    warrior.isAttacking = false;
    if (wizard.isDead()) wizard.switchSprite("death");
    else wizard.switchSprite("takeHit");

    document.getElementById(
      "player-health-left"
    )!.style.width = `${(wizard.health -= config.warriorDmg)}%`;
  }

  if (warrior.isDead() || wizard.isDead()) {
    game.determineTheWinner();
  }
}

animate();
game.decreaseGameTime();

window.addEventListener("keydown", (e) => {
  if (!wizard.dead) {
    wizard.movements.movePlayer(e);
    if (e.key === "s") {
      wizard.attack();
    }
  }

  if (!warrior.dead) {
    warrior.movements.moveEnemy(e);
    if (e.key === "ArrowDown") {
      warrior.attack();
    }
  }
});

window.addEventListener("keyup", (e) => {
  wizard.movements.stopMovingPlayer(e);
  warrior.movements.stopMovingEnemy(e);
});
