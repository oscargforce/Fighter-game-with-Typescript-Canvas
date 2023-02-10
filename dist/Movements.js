import { config } from "./config.js";
export class Movements {
  position;
  velocity;
  lastKey;
  playerImageHeight;
  gravity;
  fighter;
  constructor(fighter) {
    this.position = fighter.position;
    this.velocity = fighter.velocity;
    this.lastKey = "";
    this.playerImageHeight = 150;
    this.gravity = config.gravity;
    this.fighter = fighter;
  }
  keys = {
    a: { pressed: false },
    d: { pressed: false },
    arrowLeft: { pressed: false },
    arrowRight: { pressed: false },
    w: { pressed: false },
    arrowUp: { pressed: false },
  };
  /**
   * y axis
   * -3 |
   * -2 |
   * -1 |
   *  --|-----
   * 1  |
   * 2  |
   * 3  |
   *                ->
   * this.position.y [] gives the top position of the rectangle.
   * this.position.y + this.image.height gives the bottom location of the rectangle []
   *                                                                              ->
   * if rectangle bottom >= canvasHeight then you hit the bottom of the canvas image.
   * If you want to the fighters to land in the middle of the canvas then you have to subtract x amount, example: config.canvasHeight - 200
   *
   */
  falling() {
    this.position.y += this.velocity.y;
    if (
      this.position.y + this.playerImageHeight + this.velocity.y >=
      config.canvasHeight - 300
    ) {
      this.velocity.y = 0;
    } else this.velocity.y += this.gravity;
  }
  runToTheRight() {
    this.position.x += this.velocity.x;
  }
  runToTheLeft() {
    this.position.x -= this.velocity.x;
  }
  jump() {
    this.velocity.y = -config.jumpSpeed;
  }
  update() {
    this.falling();
    if (this.keys.d.pressed && this.lastKey === "d") {
      this.runToTheRight();
      this.fighter.switchSprite("run");
    } else if (this.keys.a.pressed && this.lastKey === "a") {
      this.runToTheLeft();
      this.fighter.switchSprite("run");
    } else if (this.keys.arrowLeft.pressed && this.lastKey === "ArrowLeft") {
      this.runToTheLeft();
      this.fighter.switchSprite("run");
    } else if (this.keys.arrowRight && this.lastKey === "ArrowRight") {
      this.runToTheRight();
      this.fighter.switchSprite("run");
    } else this.fighter.switchSprite("idle");
    if (this.velocity.y < 0) this.fighter.switchSprite("jump");
    else if (this.velocity.y > 0) this.fighter.switchSprite("fall");
  }
  movePlayer(event) {
    switch (event.key) {
      case "d":
        this.keys.d.pressed = true;
        this.lastKey = "d";
        break;
      case "a":
        this.keys.a.pressed = true;
        this.lastKey = "a";
        break;
      case "w":
        this.jump();
        break;
    }
  }
  stopMovingPlayer(event) {
    switch (event.key) {
      case "d":
        this.keys.d.pressed = false;
        this.lastKey = "";
        break;
      case "a":
        this.keys.d.pressed = false;
        this.lastKey = "";
        break;
    }
  }
  moveEnemy(event) {
    switch (event.key) {
      case "ArrowRight":
        this.keys.arrowRight.pressed = true;
        this.lastKey = "ArrowRight";
        break;
      case "ArrowLeft":
        this.keys.arrowLeft.pressed = true;
        this.lastKey = "ArrowLeft";
        break;
      case "ArrowUp":
        this.jump();
        break;
    }
  }
  stopMovingEnemy(event) {
    switch (event.key) {
      case "ArrowRight":
        this.keys.arrowRight.pressed = false;
        this.lastKey = "";
        break;
      case "ArrowLeft":
        this.keys.arrowLeft.pressed = false;
        this.lastKey = "";
        break;
    }
  }
}
