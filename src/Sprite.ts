import { canvas } from "./index.js";
import { Offset, Position, Sprites } from "./Sprites.types.js";

export class Sprite {
  public image: HTMLImageElement;
  protected numOfFrames: number;
  readonly position: Position;
  private scale: number;
  private slowDownAnimation: number;
  private elapsedFrames: number;
  protected currentFrame: number;
  readonly imageOffset: Offset;

  constructor(data: Sprites) {
    this.position = data.position;
    this.image = new Image();
    this.image.src = data.imgSrc;
    this.numOfFrames = data.numOfFrames;
    this.scale = data.scale ? data.scale : 1;
    this.slowDownAnimation = 5;
    this.currentFrame = 0;
    this.elapsedFrames = 0;
    this.imageOffset = data.offset ? data.offset : { x: 0, y: 0 };
  }

  protected draw() {
    canvas.drawImage(
      this.image,
      this.currentFrame * (this.image.width / this.numOfFrames), // gets the correct width for one frame of the png
      0,
      this.image.width / this.numOfFrames, // gets the first image of the png
      this.image.height,
      this.position.x - this.imageOffset.x,
      this.position.y - this.imageOffset.y,
      (this.image.width / this.numOfFrames) * this.scale, // increases the correct frame
      this.image.height * this.scale
    );
  }

  protected animateFrames() {
    this.elapsedFrames++;
    if (this.elapsedFrames % this.slowDownAnimation === 0) {
      if (this.currentFrame < this.numOfFrames - 1) this.currentFrame++;
      else this.currentFrame = 0;
    }
  }

  update() {
    this.draw();
    this.animateFrames();
  }
}
