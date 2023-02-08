type TwoDimensionalAxis = { x: number; y: number };
export type Sprites = {
  imgSrc: string;
  position: Position;
  numOfFrames: number;
  scale?: number;
  offset?: Offset;
};

export type Fighters = Sprites & {
  sprites: SpriteImages;
  attackBox: Pick<AttackBox, "height" | "offset" | "width">;
  offset: Offset;
};

export type Position = TwoDimensionalAxis;
export type Velocity = TwoDimensionalAxis;
export type Offset = TwoDimensionalAxis;
export type AttackBox = {
  width: number;
  height: number;
  offset: Offset;
  position: TwoDimensionalAxis;
};
type SpriteContent = {
  numOfFrames: number;
  imgSrc: string;
  image?: HTMLImageElement;
};
export type ImageNames =
  | "idle"
  | "attack"
  | "run"
  | "takeHit"
  | "death"
  | (string & {}); 
export type SpriteImages = Record<ImageNames, SpriteContent>;
