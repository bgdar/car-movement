// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform
export enum TopDown {
  A = 1.0, // Skala X (1.0 agar memenuhi lebar layar)
  B = 0, // Skew Y
  C = -0.5, // Skew X (Nilai ini yang membuat efek 'rebah' ke kanan)
  D = 0.6, // Skala Y (Makin kecil makin terlihat datar/rebah)
  E = 0, // Move X
  F = 0, // Move Y
}

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
