export interface DrawObject {
  // public properti
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;

  speed: number;
  maxSpeed: number;

  draw: () => void;
  update: () => void;
  move: () => void;
}

// Tipe untuk Class-nya itu sendiri (Constructor)
// Kita sesuaikan dengan parameter constructor DrawTree Anda
export type DrawObjectClass = new (
  ctx: CanvasRenderingContext2D,
  name: string,
  x: number,
  y: number,
  width?: number,
  height?: number,
  heightCanvas?: number,
) => DrawObject;
