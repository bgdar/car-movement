import "../css/component.css";
import "../css/page-start.css";

// import { TopDown } from "./core";

export function carDiv(carName: string): string {
  return `
 <div id="car">
    <div class="collection">
      
      <div class="satu">1 <p> ${carName}</p></div>
        <div class="dua">2</div>
        <div class="tiga">3</div>
        <div class="empat">4</div>
        <div class="lima">5</div>
        <div class="enam">6</div>
        <div class="tujuh">7</div>
        <div class="delapan">8</div>
        <div class="sembilan">9</div>
        <div class="sepuluh">10</div>
        <div class="sebelas">11</div>
        <div class="duabelas">12</div>
        <div class="tigabelas">x13</div>
        <div class="empatbelas">14</div>
        <div class="limabelas">15</div>
    </div>
  </div>

`;
}

/**
 * popup informasi di mana terjadi  trabrakan
 */
export function PopupEffectCrash(x: number, y: number, time: number): string {
  const popup = document.querySelector("div.popupCrash") as HTMLDialogElement;

  popup.style.left = x + "px";
  popup.style.top = y + "px";

  popup.style.display = "block";

  setTimeout((popup.style.display = "none"), time);
}

export function popupOverlay(text: string): string {
  return `
<div id="popup-container" class="overlay">
      <div class="popup-box">
        <div class="popup-content">
          <p>${text}</p>
        </div>
        <button class="close-btn" onclick="document.getElementById('popup-container').remove()">
          Tutup
        </button>
      </div>
    </div>
`;
}

/**
 * gambar car pada CTX 2D canvas
 */
export class CarCanvas {
  private carName;
  public width;
  public height;
  public speed;
  public acceleration;
  private friction;
  public angle: number;
  public maxSpeed;
  private x;
  private y;
  private ctx;

  private canvasWidth: number;
  private canvasHeigth: number;

  constructor(
    carName: string,
    ctx: CanvasRenderingContext2D, // dapat dari canvas.getContext("2d")
    width: number,
    heigth: number,
    x: number,
    y: number,
    canvasWidth: number,
    canvasHeigth: number,
  ) {
    this.carName = carName;
    this.width = width;
    this.height = heigth;
    this.x = x;
    this.y = y;
    this.speed = 0;
    this.acceleration = 0.15; // Percepatan atau akselerasi adalah perubahan kecepatan dalam satuan waktu tertentu.
    this.friction = 0.04; // gaya kontak yang melawan pergerakan atau menahan pergeseran antara dua permukaan yang bersentuhan, baik diam maupun bergerak.
    this.angle = 0; // sudut
    this.maxSpeed = 6;

    console.info("canvas width yg di dapat car : ", canvasWidth);
    this.ctx = ctx;
    this.canvasWidth = canvasWidth;
    this.canvasHeigth = canvasHeigth;
  }
  /**
   * Gambar Mobil
   */
  draw() {
    this.ctx.save();
    // Tanpa ini, semua objek akan berkumpul di pojok kiri atas (0,0)
    this.ctx.translate(this.canvasWidth / 2, this.canvasHeigth / 2);
    // ctx.transform(
    //   TopDown.A,
    //   TopDown.B,
    //   TopDown.C,
    //   TopDown.D,
    //   TopDown.E,
    //   TopDown.F,
    // );

    this.ctx.rotate(this.angle);

    // Efek Bayangan Mobil (Shadow)
    this.ctx.beginPath();
    this.ctx.shadowBlur = 15;
    this.ctx.shadowColor = "black";
    this.ctx.shadowOffsetY = 20;

    // Roda Belakang
    this.ctx.fillStyle = "#111";
    this.ctx.fillRect(this.x + 10, this.y - 8, 20, 10);
    this.ctx.fillRect(this.x + 10, this.y + this.height - 2, 20, 10);

    // Bodi Utama (Layer Bawah)
    this.ctx.fillStyle = "#ffcdff";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.fillText(this.carName, this.x, this.y, this.width);

    // Atap Mobil (Layer Atas agar terlihat volume)
    this.ctx.fillStyle = "#cc0000";
    this.ctx.fillRect(
      this.x + 15,
      this.y + 5,
      this.width - 40,
      this.height - 10,
    );

    // Kaca Depan
    this.ctx.fillStyle = "#87CEEB";
    this.ctx.fillRect(
      this.x + this.width - 25,
      this.y + 5,
      15,
      this.height - 10,
    );

    // Roda Depan
    this.ctx.fillStyle = "#111";
    this.ctx.fillRect(this.x + this.width - 30, this.y - 8, 20, 10);
    this.ctx.fillRect(
      this.x + this.width - 30,
      this.y + this.height - 2,
      20,
      10,
    );

    //Lampu Depan
    this.ctx.fillStyle = "yellow";
    this.ctx.fillRect(this.x + this.width - 5, this.y + 2, 5, 10);
    this.ctx.fillRect(
      this.x + this.width - 5,
      this.y + this.height - 12,
      5,
      10,
    );

    this.ctx.restore();
  }

  /**
   * hanlde pergerakan key
   * mobile hanya bergerak kiri dan kanan
   */
  carMove(keys: Record<string, boolean>) {
    if (keys["ArrowRight"]) {
      this.speed += this.acceleration;
      if (this.speed > this.maxSpeed) this.speed = this.maxSpeed;

      if (keys["shift"]) {
        this.angle += this.acceleration;
      }
    }
    if (keys["ArrowLeft"]) {
      this.speed -= this.acceleration;
      if (this.speed < -this.maxSpeed / 2) this.speed = -this.maxSpeed / 2;
    }

    if (keys["shift"]) {
      this.angle -= this.acceleration;
    }
  }

  /**
   * Update pergerakan mobil (kiri kana / X axis)
   */
  update() {
    // Gerakkan mobil berdasarkan speed
    // gerak kiri kanan
    this.x += this.speed;

    // Gesekan alami (perlahan berhenti jika tidak gas)
    if (this.speed > 0) this.speed -= this.friction;
    if (this.speed < 0) this.speed += this.friction;
    if (Math.abs(this.speed) < this.friction) this.speed = 0;

    // Batasi agar tidak keluar canvas (kiri/kanan)
    if (this.x + this.width > this.canvasWidth)
      this.x = this.canvasWidth - this.x; // Loop ke kiri jika lewat kanan
    // x+lebar_elemen>lebar_canvas
    if (this.x < 0) this.canvasWidth;
  }

  /**
   * Menghapus dan membersihkan mobil saat ini
   */
  delete() {}
}

// gambar jalan
export function DrawRoude(
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeigth: number,
  roadOffset: number,
): void {
  ctx.save();

  // Pindahkan titik pusat ke tengah layar
  ctx.translate(canvasWidth / 2, canvasHeigth / 2);

  // ctx.transform(
  //   TopDown.A,
  //   TopDown.B,
  //   TopDown.C,
  //   TopDown.D,
  //   TopDown.E,
  //   TopDown.F,
  // );

  // --- ASPAL ---
  // Agar center, X harus dimulai dari -(lebar / 2)
  // Kita buat aspal sangat lebar (misal 3x lebar canvas) agar saat miring tidak terlihat ujungnya
  const roadWidth = canvasWidth * 3;
  const roadHeight = 4000; // Buat panjang ke atas dan bawah

  ctx.fillStyle = "#444";
  ctx.fillRect(-roadWidth / 2, -roadHeight / 2, roadWidth, roadHeight);

  // --- MARKA JALAN ---
  ctx.strokeStyle = "white";
  ctx.lineWidth = 15;

  // Marka Tengah (Putus-putus)
  ctx.setLineDash([40, 30]);
  // Menggeser pola garis berdasarkan roadOffset
  ctx.lineDashOffset = roadOffset;
  ctx.beginPath();
  ctx.moveTo(0, -2000);
  ctx.lineTo(0, 2000);
  ctx.stroke();

  // Garis Pembatas Samping (Solid)
  ctx.setLineDash([]);
  const laneWidth = 400; // Jarak garis samping dari tengah

  // Garis Kiri
  ctx.beginPath();
  ctx.moveTo(-laneWidth, -2000);
  ctx.lineTo(-laneWidth, 2000);
  ctx.stroke();

  // Garis Kanan
  ctx.beginPath();
  ctx.moveTo(laneWidth, -2000);
  ctx.lineTo(laneWidth, 2000);
  ctx.stroke();

  ctx.restore();
}
