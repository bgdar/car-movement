// container untama yang membungkus Object Object lain
export class ContentainerCanvas {
  public x;
  public y;
  public speed;
  public acceleration;
  private friction;
  public maxSpeed;
  private ctx: CanvasRenderingContext2D;

  private height: number;

  public heigthCanvas: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    baseX: number,
    baseY: number,
    heigthCanvas = 2000,
  ) {
    this.acceleration = 0.15; // Percepatan atau akselerasi adalah perubahan kecepatan dalam satuan waktu tertentu.
    this.friction = 0.04; // gaya kontak yang melawan pergerakan atau menahan pergeseran antara dua permukaan yang bersentuhan, baik diam maupun bergerak.
    this.maxSpeed = 6;
    this.speed = 0; // awal 0 kecepatan
    this.x = baseX;
    this.y = baseY;
    this.ctx = ctx;
    this.height = 20; //default
    this.heigthCanvas = heigthCanvas;
  }

  /**
   *  update panjang suatu Content
   * @param heigth nilai yang akan di set
   */
  setHeigth(heigth: number): void {
    this.height = heigth;
  }
  getHeigth(): number {
    return this.height;
  }

  draw(callback: (ctx: CanvasRenderingContext2D) => void): void {
    // anntik gunakna callback aja untuk menggambar object

    callback(this.ctx);
  }

  /**
   * Update pergerakan ContentCanvas ( atas bawah atau Y axis)
   */
  update() {
    // Gerakkan mobil berdasarkan speed
    // gerak kiri kanan
    this.y += this.speed;

    // Gesekan alami (perlahan berhenti jika mobile nantik tidak gas)
    if (this.speed > 0) this.speed -= this.friction;
    if (this.speed < 0) this.speed += this.friction;
    if (Math.abs(this.speed) < this.friction) this.speed = 0;

    // Batas Bawah (Jika mobil tidak boleh keluar dari bawah layar)
    if (this.y > this.heigthCanvas + this.height) {
      this.y = -10; // naik ke atas sedikit
      this.speed = 0; // Berhenti jika menabrak batas bawah
    }

    // Batas Atas (Jika mobil "looping" kembali ke bawah setelah sampai atas)
    // if (this.y < -this.height) {
    //   this.y = this.heigthCanvas;
    // }
  }

  /**
   * handle ketikan di click atas bawah
   * agar yang bergerak Object nya , bukan mobile
   */
  contentMove(keys: Record<string, boolean>) {
    // 1. Handle Maju & Mundur (Akselerasi)
    if (keys["ArrowUp"]) {
      this.speed += this.acceleration;
      // } else if (keys["ArrowDown"]) {
      //   this.speed -= this.acceleration;
    }
  }
}
