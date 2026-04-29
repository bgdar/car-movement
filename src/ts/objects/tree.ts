import type { DrawObject } from "../../types";

// gambar pohon
export class DrawTree implements DrawObject{
  public x;
  public y;
  public speed;
  public acceleration;
  private friction;
  public maxSpeed;
  private ctx: CanvasRenderingContext2D;

  public height: number;
  public width: number;


  public name : string;

  private heigthCanvas: number;

  constructor(
    ctx: CanvasRenderingContext2D,
              name : string,
    baseX: number,
    baseY: number,
    width: number = 70,
    height: number = 100,

    heigthCanvas = 2000,
  ) {
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

    this.name = name;
  }

  draw(): void {
    this.ctx.save();

    this.ctx.translate(this.x, this.y);

    const width = this.width;
    const height = this.height;

    // ukuran batang
    const trunkWidth = width * 0.25;
    const trunkHeight = height * 0.35;

    // ukuran daun
    const leafRadiusMain = width * 0.35;
    const leafRadiusSide = width * 0.25;

    // posisi batang agar center
    const trunkX = -trunkWidth / 2;
    const trunkY = height - trunkHeight;

    // BATANG
    this.ctx.fillStyle = "#8B4513";
    this.ctx.fillRect(trunkX, trunkY, trunkWidth, trunkHeight);

    // ===============================
    // DAUN
    // ===============================
    this.ctx.fillStyle = "#228B22";
    this.ctx.beginPath();

    // daun utama
    this.ctx.arc(0, trunkY - leafRadiusMain, leafRadiusMain, 0, Math.PI * 2);

    // daun kiri
    this.ctx.arc(
      -leafRadiusMain * 0.7,
      trunkY - leafRadiusMain * 0.6,
      leafRadiusSide,
      0,
      Math.PI * 2,
    );

    // daun kanan
    this.ctx.arc(
      leafRadiusMain * 0.7,
      trunkY - leafRadiusMain * 0.6,
      leafRadiusSide,
      0,
      Math.PI * 2,
    );

    this.ctx.fill();

    // ===============================
    // BAYANGAN
    // ===============================
    this.ctx.globalAlpha = 0.2;
    this.ctx.fillStyle = "black";

    this.ctx.beginPath();
    this.ctx.ellipse(0, height, width * 0.35, height * 0.08, 0, 0, Math.PI * 2);
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

// gunkaan di ContentainerCanvas
export function ObjectPohonTumbang(
  ctx: CanvasRenderingContext2D,
  color: string,
  width: number,
  height: number,
  x: number,
  y: number,
): void {
  // 1. Terapkan Transformasi Global (Sama dengan Mobil & Jalan)
  // Ini yang membuat kotak datar jadi trapesium
  // this.ctx.transform(
  //   TopDown.A,
  //   TopDown.B,
  //   TopDown.C, // Membuat sisi atas miring ke kanan
  //   TopDown.D, // Membuat kotak gepeng (pipih)
  //   TopDown.E,
  //   TopDown.F,
  // );
  ctx.save();

  // Pindah ke koordinat pusat kotak (x, y)
  ctx.translate(x, y);

  // 3. Gambar Kotak Dasar (Volume Utama)
  // Kita gunakan koordinat relatif (-halfWidth, -halfHeight) agar berpusat
  const halfW = width / 2;
  const halfH = height / 2;

  // Sisi Depan (Wajah Utama)
  ctx.fillStyle = color; // Warna Abu-abu (DarkGray)
  ctx.fillRect(-halfW, -halfH, width, height);

  // Tambahkan Garis Tepi (Stroke) agar sama seperti sketsa tangan
  ctx.strokeStyle = "white"; // Gunakan putih agar kontras
  ctx.lineWidth = 4;
  ctx.strokeRect(-halfW, -halfH, width, height);

  // 5. Menambahkan Kedalaman (Opsional - Bagian Atas Kotak)
  // Untuk membuat efek 'tutup kotak' di atas, kita gambar trapesium di atasnya secara manual
  // Ini agar sudut-sudutnya bertemu sempurna
  ctx.fillStyle = "#808080"; // Abu-abu sedikit lebih gelap
  ctx.beginPath();
  ctx.moveTo(-halfW, -halfH); // Pojok Kiri Atas Depan
  ctx.lineTo(halfW, -halfH); // Pojok Kanan Atas Depan

  // Karena D = 0.2 (pipih), kita gunakan nilai Y negatif yang kuat untuk ditarik ke atas
  // Dan C = -0.8 menarik bagian atas ke kanan
  ctx.lineTo(halfW + halfH * 0.8, -halfH - 30); // Kanan Atas Belakang
  ctx.lineTo(-halfW + halfH * 0.8, -halfH - 30); // Kiri Atas Belakang

  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.restore();
}
export function DrawCar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
): void {
  ctx.save();

  ctx.shadowBlur = 20;
  ctx.shadowColor = "rgba(0,0,0,0.5)";
  ctx.shadowOffsetY = 10;

  const topWidth = width * 0.5; // atas kecil
  const bottomWidth = width; // bawah besar

  const centerX = x + width / 2;
  const topY = y;
  const bottomY = y + height;

  // =========================
  // CAR BODY
  // =========================
  ctx.beginPath();
  ctx.fillStyle = "#ffffff";

  ctx.moveTo(centerX - topWidth / 2, topY); // atas kiri
  ctx.lineTo(centerX + topWidth / 2, topY); // atas kanan
  ctx.lineTo(centerX + bottomWidth / 2, bottomY); // bawah kanan
  ctx.lineTo(centerX - bottomWidth / 2, bottomY); // bawah kiri
  ctx.closePath();

  ctx.fill();

  // =========================
  // GLASS / WINDOW
  // =========================
  ctx.beginPath();
  ctx.fillStyle = "#ff00ff";

  const glassTopWidth = topWidth * 0.6;
  const glassBottomWidth = bottomWidth * 0.6;

  ctx.moveTo(centerX - glassTopWidth / 2, topY + height * 0.2);
  ctx.lineTo(centerX + glassTopWidth / 2, topY + height * 0.2);
  ctx.lineTo(centerX + glassBottomWidth / 2, topY + height * 0.6);
  ctx.lineTo(centerX - glassBottomWidth / 2, topY + height * 0.6);
  ctx.closePath();

  ctx.fill();

  // =========================
  // WHEELS (simple illusion)
  // =========================
  ctx.fillStyle = "black";

  const wheelWidth = width * 0.2;
  const wheelHeight = height * 0.15;

  // kiri bawah
  ctx.fillRect(
    centerX - bottomWidth / 2 - wheelWidth,
    bottomY - wheelHeight,
    wheelWidth,
    wheelHeight,
  );

  // kanan bawah
  ctx.fillRect(
    centerX + bottomWidth / 2,
    bottomY - wheelHeight,
    wheelWidth,
    wheelHeight,
  );

  ctx.restore();
}
