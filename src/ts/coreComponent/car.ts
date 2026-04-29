// import "../css/component.css";
// import "../css/page-start.css";


// export function carDiv(carName: string): string {
//   return `
//  <div id="car">
//     <div class="collection">
//
//       <div class="satu">1 <p> ${carName}</p></div>
//         <div class="dua">2</div>
//         <div class="tiga">3</div>
//         <div class="empat">4</div>
//         <div class="lima">5</div>
//         <div class="enam">6</div>
//         <div class="tujuh">7</div>
//         <div class="delapan">8</div>
//         <div class="sembilan">9</div>
//         <div class="sepuluh">10</div>
//         <div class="sebelas">11</div>
//         <div class="duabelas">12</div>
//         <div class="tigabelas">x13</div>
//         <div class="empatbelas">14</div>
//         <div class="limabelas">15</div>
//     </div>
//   </div>
//
// `;
// }


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
  public x;
  public y;
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
    this.acceleration = 0.2; // Percepatan atau akselerasi adalah perubahan kecepatan dalam satuan waktu tertentu.
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
    // // Tanpa ini, semua objek akan berkumpul di pojok kiri atas (0,0)
    // this.ctx.translate(this.canvasWidth / 2, this.canvasHeigth / 2);
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
    const maxSteer = 15; // batas belok
    if (keys["ArrowRight"]) {
      this.speed += this.acceleration;
      if (this.speed > this.maxSpeed) this.speed = this.maxSpeed;
    }
    if (keys["ArrowLeft"]) {
      this.speed -= this.acceleration;
      if (this.speed < -this.maxSpeed) this.speed = -this.maxSpeed / 2;
    }

    if (keys["Shift"]) {
      if (keys["ArrowRight"]) {
        targetAngle = maxAngle + shiftBoost;
      }
      if (keys["ArrowLeft"]) {
        targetAngle = -(maxAngle + shiftBoost);
      }
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
    if (this.x + this.width > this.canvasWidth) this.x = this.canvasWidth - this.width ; 
    if (this.x < 0 ) this.x = 0 ;
  }

  lurus() {
    // reset naggel
  }

  /**
   * Menghapus dan membersihkan mobil saat ini
   */
  delete() {}
}

