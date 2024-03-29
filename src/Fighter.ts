import { config } from "./config";
import { Movements } from "./Movements";
import { Sprite } from "./Sprite";
import {
  Fighters,
  SpriteImages,
  ImageNames,
  Velocity,
  AttackBox,
} from "./Sprites.types";

export class Fighter extends Sprite {
  readonly velocity: Velocity;
  readonly movements: Movements;
  private sprites: SpriteImages;
  public isAttacking: boolean;
  readonly attackBox: AttackBox;
  public health: number;
  public dead: boolean;

  constructor(data: Fighters) {
    super(data);
    this.velocity = { x: config.runSpeed, y: config.jumpSpeed };
    this.movements = new Movements(this);
    this.sprites = data.sprites;
    this.isAttacking = false;
    this.attackBox = {
      width: data.attackBox.width,
      height: data.attackBox.height,
      offset: data.attackBox.offset,
      position: { x: this.position.x, y: this.position.y },
    };
    this.health = 100;
    this.dead = false;

    for (const sprite in this.sprites) {
      this.sprites[sprite].image = new Image();
      this.sprites[sprite].image!.src = this.sprites[sprite].imgSrc;
    }
  }

  isDead(): boolean {
    return this.health <= 0;
  }

  update(): void {
    this.draw();
    this.movements.update();
    if (!this.dead) this.animateFrames();

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x; // Set attackbox ontop of the rectangle and make attack box face eachother.
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

    // Unable the fighter to move through walls.
    if (this.position.x <= 0) this.position.x = 0;

    if (this.position.x + config.playerWidth >= config.canvasWidth)
      this.position.x = config.canvasWidth - config.playerWidth;

    if (this.position.y + config.playerHeight <= 0) {
      this.position.y = 0 - config.playerHeight;
      this.movements.falling();

    }
  }

  attack(): void {
    this.isAttacking = true;
    this.switchSprite("attack");
  }

  switchSprite(sprite: ImageNames): void {
    // If player is dead, then dont switch to new sprite.
    if (this.image === this.sprites.death.image) {
      if (this.currentFrame === this.sprites.death.numOfFrames - 1)
        this.dead = true;
      return;
    }
    if (
      this.image === this.sprites.takeHit.image &&
      this.currentFrame < this.sprites.takeHit.numOfFrames - 1
    )
      // Override any sprite switches if player is attacking / taking hit.
      return;
    if (
      this.image === this.sprites.attack.image &&
      this.currentFrame < this.sprites.attack.numOfFrames - 1
    )
      return;

    switch (sprite) {
      case "idle":
        this.setImage("idle");
        break;
      case "attack":
        this.setImage("attack");
        break;
      case "run":
        this.setImage("run");
        break;
      case "jump":
        this.setImage("jump");
        break;
      case "fall":
        this.setImage("fall");
        break;
      case "takeHit":
        this.setImage("takeHit");
        break;
      case "death":
        this.setImage("death");
        break;
    }
  }

  private setImage(img: ImageNames): void {
    if (this.sprites?.[img] && this.image != this.sprites[img].image) {
      this.image = this.sprites[img].image as HTMLImageElement;
      this.numOfFrames = this.sprites[img].numOfFrames;
      this.currentFrame = 0;
    }
  }
}
