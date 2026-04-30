// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform
// export enum TopDown {
//   A = 1.0, // Skala X (1.0 agar memenuhi lebar layar)
//   B = 0, // Skew Y
//   C = -0.5, // Skew X (Nilai ini yang membuat efek 'rebah' ke kanan)
//   D = 0.6, // Skala Y (Makin kecil makin terlihat datar/rebah)
//   E = 0, // Move X
//   F = 0, // Move Y
// }

// fn untuk mengatur Halaman utma yang tampila
// Fungsi sekarang mengembalikan Promise<string> karena prosesnya asinkronus
export async function mainPage(pageHTML: string): Promise<string> {
  try {
    const response = await fetch(pageHTML);
    if (!response.ok) throw new Error("Halaman tidak ditemukan");

    const page = await response.text();

    return page;
  } catch (error) {
    console.error("Gagal memuat halaman:", error);
    return "";
  }
}
// Fungsi untuk me-render ke DOM
export async function navigateTo(pageName: string, appDiv: HTMLDivElement) {
  if (appDiv) {
    appDiv.innerHTML = "Loading..."; // Feedback visual
    const html = await mainPage(pageName);
    console.info("page", html);
    appDiv.innerHTML = html;
  }
}

export function getRndInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Contoh: Acak antara 50 hingga 100
console.log(getRndInteger(50, 100));
// funcsi utnuk mengebalikan key yang di click
// export function getKey(window)

export function ArrowUp(keys: Record<string, boolean>, callback: () => void) {
  if (keys["ArrowUp"]) {
    callback();
  }
}
/**
 * Mengecek tabrakan 2 object kotak
 *
 * x,y = posisi kiri atas object
 * width,height = ukuran object
 */
export function checkCollision(
  object1X: number,
  object1Y: number,
  object1Width: number,
  object1Height: number,

  object2X: number,
  object2Y: number,
  object2Width: number,
  object2Height: number,
): boolean {
  return (
    object1X < object2X + object2Width &&
    object1X + object1Width > object2X &&
    object1Y < object2Y + object2Height &&
    object1Y + object1Height > object2Y
  );
}

/**
 * Fungsi untuk mengontrol audio berdasarkan kecepatan
 * @param isMoving - Status apakah tombol input sedang aktif
 * @param audio - Objek HTMLAudioElement yang akan diputar
 * @param currentSpeed - Kecepatan objek saat ini
 * @param maxSpeed - Batas kecepatan maksimal objek
 */
export function updateAudioRate(
  isMoving: boolean,
  audio: HTMLAudioElement,
  currentSpeed: number,
  maxSpeed: number,
) {
  // Hitung rasio kecepatan (0 sampai 1). Gunakan Math.abs jika speed bisa bernilai negatif (mundur)
  const speedRatio = Math.min(Math.abs(currentSpeed) / maxSpeed, 1);

  if (isMoving || speedRatio > 0.01) {
    // Jalankan audio jika belum putar
    if (audio.paused) {
      audio.play().catch(() => {
        // Abaikan error autoplay jika user belum interaksi
      });
    }

    // 1. Atur Volume (Min 0.1, Max 1.0)
    // Menggunakan Math.min untuk memastikan tidak lebih dari 1.0 yang bisa bikin error
    audio.volume = Math.min(Math.max(0.1, speedRatio), 1.0);

    // 2. Atur Pitch/PlaybackRate
    // Mesin akan terdengar lebih melengking seiring bertambahnya speed
    audio.playbackRate = 1 + speedRatio;
  } else {
    // FADE OUT: Mengecilkan suara perlahan saat berhenti agar tidak terdengar patah
    if (audio.volume > 0.05) {
      audio.volume -= 0.05;
    } else {
      audio.pause();
      audio.currentTime = 0; // Opsional: reset ke awal suara
    }
  }
}
