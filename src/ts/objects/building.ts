// import type { DrawObject } from "../../types";
// import { getRndInteger } from "../core";

// // gambar gedung gedung
// // sesuaikan warna dan tinggi gedug
// export class DrawBuilding implements DrawObject {
//   public x;
//   public y;
//   public speed;
//   public acceleration;
//   private friction;
//   public maxSpeed;
//   public radius: number = 10;
//   private ctx: CanvasRenderingContext2D;

//   public name: string;
//   //   private buildingHeight: number;

//   public height: number;
//   public width: number;

//   private heigthCanvas: number;
//   private widthCanvas: number;

//   public isRandomX: boolean;

//   constructor(
//     ctx: CanvasRenderingContext2D,
//     name: string,
//     baseX: number,
//     baseY: number,
//     width: number = 70,
//     height: number = 100,

//     heigthCanvas: number = 2000,
//     widthCanvas: number = 2000,

//     isRandomX: boolean = false,
//   ) {
//     this.name = name;

//     this.acceleration = 0.2; // Percepatan atau akselerasi adalah perubahan kecepatan dalam satuan waktu tertentu.
//     this.friction = 0.06; //Gesekan
//     this.maxSpeed = 5;
//     this.speed = 0; // awal 0 kecepatan
//     this.x = baseX;
//     this.y = baseY;
//     this.ctx = ctx;

//     this.height = height; //default
//     this.width = width;

//     this.heigthCanvas = heigthCanvas;
//     this.widthCanvas = widthCanvas;

//     this.isRandomX = isRandomX;
//   }

//   draw() {
//     const ctx = this.ctx;

//     const w = this.width;
//     const h = this.height;

//     // const buildingHeight = this.buildingHeight; // tinggi gedung (kesan tinggi)

//     ctx.save();
//     ctx.translate(this.x, this.y);

//     // BAYANGAN GEDUNG
//     ctx.beginPath();
//     ctx.shadowBlur = 12;
//     ctx.shadowColor = "rgba(0,0,0,0.4)";
//     ctx.shadowOffsetY = 6;

//     ctx.roundRect(-w / 2, -h / 2, w, h, 8);
//     ctx.fillStyle = "rgba(0,0,0,0.25)";
//     ctx.fill();

//     ctx.shadowBlur = 0;
//     ctx.shadowOffsetY = 0;

//     // BODY GEDUNG
//     ctx.beginPath();
//     ctx.roundRect(-w / 2, -h / 2, w, h, 8);

//     const bodyGradient = ctx.createLinearGradient(0, -h / 2, 0, h / 2);
//     bodyGradient.addColorStop(0, this.color);
//     bodyGradient.addColorStop(1, "rgba(0,0,0,0.5)");

//     ctx.fillStyle = bodyGradient;
//     ctx.fill();

//     ctx.strokeStyle = "rgba(0,0,0,0.6)";
//     ctx.lineWidth = 3;
//     ctx.stroke();

//     // GARIS DEPAN (KESAN GEDUNG TINGGI)
//     ctx.beginPath();
//     ctx.moveTo(-w / 4, -h / 2);
//     ctx.lineTo(-w / 4, h / 2);
//     ctx.strokeStyle = "rgba(255,255,255,0.12)";
//     ctx.lineWidth = buildingHeight / 40;
//     ctx.stroke();

//     // JENDELA (WINDOWS)
//     const rows = Math.floor(buildingHeight / 30) + 3;
//     const cols = Math.floor(w / 15);

//     const paddingX = 8;
//     const paddingY = 8;

//     const winW = (w - paddingX * 2) / cols - 4;
//     const winH = (h - paddingY * 2) / rows - 4;

//     for (let r = 0; r < rows; r++) {
//       for (let c = 0; c < cols; c++) {
//         const wx = -w / 2 + paddingX + c * (winW + 4);
//         const wy = -h / 2 + paddingY + r * (winH + 4);

//         ctx.beginPath();
//         ctx.roundRect(wx, wy, winW, winH, 2);

//         // warna jendela random nyala/mati
//         const lightOn = Math.random() > 0.5;
//         ctx.fillStyle = lightOn
//           ? "rgba(255, 220, 120, 0.9)"
//           : "rgba(30, 40, 60, 0.7)";

//         ctx.fill();
//       }
//     }

//     // HIGHLIGHT (KILAU)
//     ctx.beginPath();
//     ctx.roundRect(-w / 2 + 6, -h / 2 + 6, w / 5, h - 12, 6);
//     ctx.fillStyle = "rgba(255,255,255,0.08)";
//     ctx.fill();

//     ctx.restore();
//   }
//   /**
//    * Update pergerakan ContentCanvas ( atas bawah atau Y axis)
//    */
//   update() {
//     // geser ke bawah
//     this.y += this.speed;

//     // Gesekan alami (perlahan berhenti jika mobile nantik tidak gas)
//     if (this.speed > 0) this.speed -= this.friction;
//     if (this.speed < 0) this.speed += this.friction;
//     if (Math.abs(this.speed) < this.friction) this.speed = 0;

//     // Batas Bawah (Jika mobil tidak boleh keluar dari bawah layar)
//     if (this.y > this.heigthCanvas + this.height) {
//       this.y = -10; // naik ke atas sedikit
//       if (this.isRandomX) {
//         this.x = getRndInteger(0, this.widthCanvas);
//       }
//       this.speed = 0; // Berhenti jika menabrak batas bawah
//     }
//   }
//   move() {
//     this.speed += this.acceleration;
//     if (this.speed > this.maxSpeed) {
//       this.speed = this.maxSpeed;
//     }
//   }
// }
