// import { TopDown } from "./core";

import type { DrawObject } from "../../types";
import { getRndInteger } from "../core";

export class DrawCoin implements DrawObject {
  public x;
  public y;
  public speed;
  public acceleration;
  private friction;
  public maxSpeed;
  public radius = 10;
  private ctx: CanvasRenderingContext2D;

  public name: string;

  public height: number;
  public width: number;

  private widthCanvas: number;
  private heigthCanvas: number;

  private isXRandom: boolean;

  constructor(
    ctx: CanvasRenderingContext2D,
    name: string,
    baseX: number,
    baseY: number,
    width: number = 70,
    height: number = 100,

    widthCanvas: number = 200,
    heigthCanvas = 2000,

    isXrandom?: boolean,
  ) {
    this.name = name;

    this.acceleration = 0.2; // Percepatan atau akselerasi adalah perubahan kecepatan dalam satuan waktu tertentu.
    this.friction = 0.06; //Gesekan
    this.maxSpeed = 5;
    this.speed = 0; // awal 0 kecepatan
    this.x = baseX;
    this.y = baseY;
    this.ctx = ctx;

    this.height = height; //default
    this.width = width;

    this.widthCanvas = widthCanvas;
    this.heigthCanvas = heigthCanvas;

    this.isXRandom = isXrandom ?? false;
  }

  draw() {
    const radius = 10;
    const startAngle = 0;
    const endAngle = Math.PI * 2;

    this.ctx.save();
    this.ctx.beginPath();

    //Bayangan halus di bawah koin
    this.ctx.shadowBlur = 5;
    this.ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    this.ctx.shadowOffsetY = 2;

    // 2. Lingkaran Utama (Badan Koin)
    this.ctx.arc(this.x, this.y, radius, startAngle, endAngle);

    // Membuat gradasi warna emas
    const gradient = this.ctx.createRadialGradient(
      this.x - 3,
      this.y - 3,
      2,
      this.x,
      this.y,
      this.radius,
    );
    gradient.addColorStop(0, "#FFDF00"); // Kuning terang
    gradient.addColorStop(1, "#D4AF37"); // Emas gelap

    this.ctx.fillStyle = gradient;
    this.ctx.fill();

    //Garis Tepi (Outline)
    this.ctx.strokeStyle = "#B8860B";
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    // Detail "Emboss" di tengah koin
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, radius * 0.6, startAngle, endAngle);
    this.ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    this.ctx.lineWidth = 1;
    this.ctx.stroke();

    // Kilauan cahaya (Specular highlight)
    this.ctx.beginPath();
    this.ctx.arc(this.x - 3, this.y - 3, 2, startAngle, endAngle);
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    this.ctx.fill();

    this.ctx.restore();
  }
  /**
   * Update pergerakan ContentCanvas ( atas bawah atau Y axis)
   */
  update() {
    // geser ke bawah
    this.y += this.speed;

    // Gesekan alami (perlahan berhenti jika mobile nantik tidak gas)
    if (this.speed > 0) this.speed -= this.friction;
    if (this.speed < 0) this.speed += this.friction;
    if (Math.abs(this.speed) < this.friction) this.speed = 0;

    // Batas Bawah (Jika mobil tidak boleh keluar dari bawah layar)
    if (this.y > this.heigthCanvas + this.height) {
      this.y = 0; // naik ke atas sedikit

      if (this.isXRandom) {
        this.x = getRndInteger(0, this.widthCanvas);
      }

      this.speed = 0; // Berhenti jika menabrak batas bawah
    }
  }
  move() {
    this.speed += this.acceleration;
    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }
  }

  eliminasi() {
    this.y = getRndInteger(-10, -this.heigthCanvas);
  }
}

/*
 * Point seperti coint yang bisa di cek oleh mobil utnuk mendapatkan score
 */
export function point(ctx: CanvasRenderingContext2D, x: number, y: number) {
  const radius = 10;
  const startAngle = 0;
  const endAngle = Math.PI * 2;

  ctx.save();
  ctx.beginPath();

  // Bayangan halus di bawah koin
  ctx.shadowBlur = 5;
  ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
  ctx.shadowOffsetY = 2;

  //  Lingkaran Utama (Badan Koin)
  ctx.arc(x, y, radius, startAngle, endAngle);

  // Membuat gradasi warna emas
  const gradient = ctx.createRadialGradient(x - 3, y - 3, 2, x, y, radius);
  gradient.addColorStop(0, "#FFDF00"); // Kuning terang
  gradient.addColorStop(1, "#D4AF37"); // Emas gelap

  ctx.fillStyle = gradient;
  ctx.fill();

  //  Garis Tepi (Outline)
  ctx.strokeStyle = "#B8860B";
  ctx.lineWidth = 2;
  ctx.stroke();

  //  Detail "Emboss" di tengah koin
  ctx.beginPath();
  ctx.arc(x, y, radius * 0.6, startAngle, endAngle);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
  ctx.lineWidth = 1;
  ctx.stroke();

  //  Kilauan cahaya (Specular highlight)
  ctx.beginPath();
  ctx.arc(x - 3, y - 3, 2, startAngle, endAngle);
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  ctx.fill();

  ctx.restore();
}
