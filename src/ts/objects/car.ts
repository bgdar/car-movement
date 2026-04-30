import type { DrawObject } from "../../types";
import { getRndInteger } from "../core";

export class DrawCarFront implements DrawObject {
  public x;
  public y;
  public speed;
  public acceleration;
  private friction;
  public maxSpeed;
  public radius: number = 10;
  private ctx: CanvasRenderingContext2D;

  public name: string;

  public height: number;
  public width: number;

  private heigthCanvas: number;
  private widthCanvas: number;

  public isRandomX: boolean;

  constructor(
    ctx: CanvasRenderingContext2D,
    name: string,
    baseX: number,
    baseY: number,
    width: number = 70,
    height: number = 100,

    heigthCanvas: number = 2000,
    widthCanvas: number = 2000,

    isRandomX: boolean = false,
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

    this.heigthCanvas = heigthCanvas;
    this.widthCanvas = widthCanvas;

    this.isRandomX = isRandomX;
  }

  draw() {
    const ctx = this.ctx;

    const carWidth = 40;
    const carHeight = 70;
    const radius = 10;

    ctx.save();
    ctx.translate(this.x, this.y);

    // BAYANGAN MOBIL
    ctx.beginPath();
    ctx.shadowBlur = 12;
    ctx.shadowColor = "rgba(0,0,0,0.4)";
    ctx.shadowOffsetY = 6;

    ctx.roundRect(-carWidth / 2, -carHeight / 2, carWidth, carHeight, radius);
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fill();

    // Reset shadow biar tidak mengganggu detail
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // BODY MOBIL (BAGIAN DEPAN TERLIHAT)
    ctx.beginPath();
    ctx.roundRect(-carWidth / 2, -carHeight / 2, carWidth, carHeight, radius);

    const bodyGradient = ctx.createLinearGradient(
      0,
      -carHeight / 2,
      0,
      carHeight / 2,
    );
    bodyGradient.addColorStop(0, "#ff3b3b"); // depan terang
    bodyGradient.addColorStop(0.5, "#c80000");
    bodyGradient.addColorStop(1, "#700000"); // belakang lebih gelap

    ctx.fillStyle = bodyGradient;
    ctx.fill();

    // Outline body
    ctx.strokeStyle = "#300000";
    ctx.lineWidth = 3;
    ctx.stroke();

    // KACA DEPAN (WINDSHIELD)
    ctx.beginPath();
    ctx.roundRect(-carWidth / 2 + 6, -carHeight / 2 + 8, carWidth - 12, 18, 6);

    const glassGradient = ctx.createLinearGradient(
      0,
      -carHeight / 2,
      0,
      -carHeight / 2 + 30,
    );
    glassGradient.addColorStop(0, "rgba(180, 240, 255, 0.9)");
    glassGradient.addColorStop(1, "rgba(0, 100, 140, 0.7)");

    ctx.fillStyle = glassGradient;
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Kilauan kaca
    ctx.beginPath();
    ctx.roundRect(-carWidth / 2 + 10, -carHeight / 2 + 10, 10, 10, 4);
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.fill();

    // KAP MOBIL (HOOD DEPAN)
    ctx.beginPath();
    ctx.roundRect(-carWidth / 2 + 5, -carHeight / 2 + 30, carWidth - 10, 18, 6);

    ctx.fillStyle = "rgba(255,255,255,0.12)";
    ctx.fill();

    // LAMPU DEPAN
    // Lampu kiri
    ctx.beginPath();
    ctx.roundRect(-carWidth / 2 + 4, -carHeight / 2 + 52, 10, 10, 3);
    ctx.fillStyle = "#fff8cc";
    ctx.fill();
    ctx.strokeStyle = "#bba800";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Lampu kanan
    ctx.beginPath();
    ctx.roundRect(carWidth / 2 - 14, -carHeight / 2 + 52, 10, 10, 3);
    ctx.fillStyle = "#fff8cc";
    ctx.fill();
    ctx.strokeStyle = "#bba800";
    ctx.stroke();

    // GRILL DEPAN
    ctx.beginPath();
    ctx.roundRect(-10, -carHeight / 2 + 54, 20, 12, 4);

    const grillGradient = ctx.createLinearGradient(-10, 0, 10, 0);
    grillGradient.addColorStop(0, "#222");
    grillGradient.addColorStop(0.5, "#555");
    grillGradient.addColorStop(1, "#222");

    ctx.fillStyle = grillGradient;
    ctx.fill();

    // RODA (TOPDOWN)
    const wheelWidth = 8;
    const wheelHeight = 18;

    // roda kiri depan
    ctx.beginPath();
    ctx.roundRect(
      -carWidth / 2 - 3,
      -carHeight / 2 + 18,
      wheelWidth,
      wheelHeight,
      3,
    );
    ctx.fillStyle = "#111";
    ctx.fill();

    // roda kanan depan
    ctx.beginPath();
    ctx.roundRect(
      carWidth / 2 - 5,
      -carHeight / 2 + 18,
      wheelWidth,
      wheelHeight,
      3,
    );
    ctx.fillStyle = "#111";
    ctx.fill();

    // roda kiri belakang
    ctx.beginPath();
    ctx.roundRect(
      -carWidth / 2 - 3,
      carHeight / 2 - 35,
      wheelWidth,
      wheelHeight,
      3,
    );
    ctx.fillStyle = "#111";
    ctx.fill();

    // roda kanan belakang
    ctx.beginPath();
    ctx.roundRect(
      carWidth / 2 - 5,
      carHeight / 2 - 35,
      wheelWidth,
      wheelHeight,
      3,
    );
    ctx.fillStyle = "#111";
    ctx.fill();

    // GARIS TENGAH MOBIL (DETAIL)
    ctx.beginPath();
    ctx.moveTo(0, -carHeight / 2 + 10);
    ctx.lineTo(0, carHeight / 2 - 10);
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
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
      this.y = -10; // naik ke atas sedikit
      if (this.isRandomX) {
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
}

export class DrawCarTrukFront implements DrawObject {
  public x;
  public y;
  public speed;
  public acceleration;
  private friction;
  public maxSpeed;
  public radius: number = 10;
  private ctx: CanvasRenderingContext2D;

  public name: string;

  public height: number;
  public width: number;

  private heigthCanvas: number;
  private widthCanvas: number;

  public isRandomX: boolean;

  constructor(
    ctx: CanvasRenderingContext2D,
    name: string,
    baseX: number,
    baseY: number,
    width: number = 70,
    height: number = 100,

    heigthCanvas: number = 2000,
    widthCanvas: number = 2000,

    isRandomX: boolean = false,
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

    this.heigthCanvas = heigthCanvas;
    this.widthCanvas = widthCanvas;

    this.isRandomX = isRandomX;
  }

  draw() {
    const ctx = this.ctx;

    const truckWidth = 55;
    const truckHeight = 110;
    const radius = 10;

    ctx.save();
    ctx.translate(this.x, this.y);

    // BAYANGAN TRUK
    ctx.beginPath();
    ctx.shadowBlur = 14;
    ctx.shadowColor = "rgba(0,0,0,0.45)";
    ctx.shadowOffsetY = 7;

    ctx.roundRect(
      -truckWidth / 2,
      -truckHeight / 2,
      truckWidth,
      truckHeight,
      radius,
    );
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fill();

    // reset shadow
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // BAGIAN DEPAN (CABIN TRUK)
    const cabinHeight = 45;

    ctx.beginPath();
    ctx.roundRect(
      -truckWidth / 2,
      -truckHeight / 2,
      truckWidth,
      cabinHeight,
      radius,
    );

    const cabinGradient = ctx.createLinearGradient(
      0,
      -truckHeight / 2,
      0,
      -truckHeight / 2 + cabinHeight,
    );
    cabinGradient.addColorStop(0, "#4dd6ff");
    cabinGradient.addColorStop(1, "#005c99");

    ctx.fillStyle = cabinGradient;
    ctx.fill();

    ctx.strokeStyle = "#00334d";
    ctx.lineWidth = 3;
    ctx.stroke();

    // KACA DEPAN TRUK
    ctx.beginPath();
    ctx.roundRect(
      -truckWidth / 2 + 8,
      -truckHeight / 2 + 8,
      truckWidth - 16,
      18,
      6,
    );

    const glassGradient = ctx.createLinearGradient(
      0,
      -truckHeight / 2,
      0,
      -truckHeight / 2 + 25,
    );
    glassGradient.addColorStop(0, "rgba(200, 255, 255, 0.95)");
    glassGradient.addColorStop(1, "rgba(0, 120, 160, 0.75)");

    ctx.fillStyle = glassGradient;
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // kilauan kaca
    ctx.beginPath();
    ctx.roundRect(-truckWidth / 2 + 12, -truckHeight / 2 + 10, 12, 10, 4);
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.fill();

    // LAMPU DEPAN TRUK
    ctx.beginPath();
    ctx.roundRect(-truckWidth / 2 + 6, -truckHeight / 2 + 30, 12, 10, 3);
    ctx.fillStyle = "#fff8cc";
    ctx.fill();
    ctx.strokeStyle = "#bba800";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.roundRect(truckWidth / 2 - 18, -truckHeight / 2 + 30, 12, 10, 3);
    ctx.fillStyle = "#fff8cc";
    ctx.fill();
    ctx.strokeStyle = "#bba800";
    ctx.stroke();

    // GRILL DEPAN
    ctx.beginPath();
    ctx.roundRect(-14, -truckHeight / 2 + 32, 28, 14, 4);

    const grillGradient = ctx.createLinearGradient(-14, 0, 14, 0);
    grillGradient.addColorStop(0, "#222");
    grillGradient.addColorStop(0.5, "#666");
    grillGradient.addColorStop(1, "#222");

    ctx.fillStyle = grillGradient;
    ctx.fill();

    // BAGIAN BELAKANG (KONTAINER TRUK)
    const containerY = -truckHeight / 2 + cabinHeight;
    const containerHeight = truckHeight - cabinHeight;

    ctx.beginPath();
    ctx.roundRect(-truckWidth / 2, containerY, truckWidth, containerHeight, 6);

    const containerGradient = ctx.createLinearGradient(
      0,
      containerY,
      0,
      containerY + containerHeight,
    );
    containerGradient.addColorStop(0, "#dcdcdc");
    containerGradient.addColorStop(1, "#888888");

    ctx.fillStyle = containerGradient;
    ctx.fill();

    ctx.strokeStyle = "#444";
    ctx.lineWidth = 3;
    ctx.stroke();

    // garis-garis kontainer (detail)
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(0,0,0,0.15)";
    for (let i = 1; i <= 4; i++) {
      ctx.beginPath();
      ctx.moveTo(-truckWidth / 2 + 5, containerY + (containerHeight / 5) * i);
      ctx.lineTo(truckWidth / 2 - 5, containerY + (containerHeight / 5) * i);
      ctx.stroke();
    }

    // RODA TRUK (6 roda)
    const wheelWidth = 10;
    const wheelHeight = 20;

    // roda depan kiri
    ctx.beginPath();
    ctx.roundRect(
      -truckWidth / 2 - 4,
      -truckHeight / 2 + 10,
      wheelWidth,
      wheelHeight,
      4,
    );
    ctx.fillStyle = "#111";
    ctx.fill();

    // roda depan kanan
    ctx.beginPath();
    ctx.roundRect(
      truckWidth / 2 - 6,
      -truckHeight / 2 + 10,
      wheelWidth,
      wheelHeight,
      4,
    );
    ctx.fillStyle = "#111";
    ctx.fill();

    // roda tengah kiri
    ctx.beginPath();
    ctx.roundRect(
      -truckWidth / 2 - 4,
      containerY + 15,
      wheelWidth,
      wheelHeight,
      4,
    );
    ctx.fillStyle = "#111";
    ctx.fill();

    // roda tengah kanan
    ctx.beginPath();
    ctx.roundRect(
      truckWidth / 2 - 6,
      containerY + 15,
      wheelWidth,
      wheelHeight,
      4,
    );
    ctx.fillStyle = "#111";
    ctx.fill();

    // roda belakang kiri
    ctx.beginPath();
    ctx.roundRect(
      -truckWidth / 2 - 4,
      containerY + containerHeight - 30,
      wheelWidth,
      wheelHeight,
      4,
    );
    ctx.fillStyle = "#111";
    ctx.fill();

    // roda belakang kanan
    ctx.beginPath();
    ctx.roundRect(
      truckWidth / 2 - 6,
      containerY + containerHeight - 30,
      wheelWidth,
      wheelHeight,
      4,
    );
    ctx.fillStyle = "#111";
    ctx.fill();

    // GARIS TENGAH TRUK (DETAIL)
    ctx.beginPath();
    ctx.moveTo(0, -truckHeight / 2 + 8);
    ctx.lineTo(0, truckHeight / 2 - 8);
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
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
      this.y = -10; // naik ke atas sedikit
      if (this.isRandomX) {
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
}
