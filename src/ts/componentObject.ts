// import { TopDown } from "./core";

// gambar pohon
export function DrawTree(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
): void {
  ctx.save();
  // 2. Pindah ke koordinat x, y (posisi pohon di dunia)
  ctx.translate(x, y);

  // --- Gambar Batang Pohon ---
  ctx.fillStyle = "#8B4513"; // Cokelat (SaddleBrown)
  // Batang dibuat sedikit lebar agar terlihat dari atas
  ctx.fillRect(-10, 0, 20, 40);

  // --- Gambar Daun (Rimbun) ---
  ctx.fillStyle = "#228B22"; // Hijau (ForestGreen)

  // Kita gunakan beberapa lingkaran/elips untuk membuat daun terlihat rimbun
  ctx.beginPath();
  // Lingkaran utama (tengah)
  ctx.arc(0, -20, 30, 0, Math.PI * 2);
  // Lingkaran tambahan (kiri & kanan) agar tidak kaku
  ctx.arc(-20, -10, 20, 0, Math.PI * 2);
  ctx.arc(20, -10, 20, 0, Math.PI * 2);
  ctx.fill();

  // Tambahkan sedikit bayangan di bawah pohon (opsional)
  ctx.globalAlpha = 0.2;
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.ellipse(0, 40, 30, 10, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
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

export function carObject(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
): void {
  ctx.save();
  const sizeBan = width - 20;

  ctx.beginPath();
  ctx.shadowBlur = 15;
  ctx.shadowColor = "black";
  ctx.shadowOffsetY = 20;

  // body
  // ban
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.fillRect(x, y, sizeBan, height - sizeBan);
  // body
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(sizeBan + x, y, width, height);
  // ban
  ctx.fillStyle = "black";
  ctx.fillRect(x, y, sizeBan, height - sizeBan);

  // center bosy
  ctx.beginPath();
  ctx.fillStyle = "#ff00ff";
  ctx.fillRect(x, y + 10, width, height);

  // body belakang
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.fillRect(x, y, sizeBan, height - sizeBan);

  ctx.restore();
}

/*
 * Point seperti coint yang bisa di cek oleh mobil utnuk mendapatkan score
 */
export function point(ctx: CanvasRenderingContext2D, x: number, y: number) {}
