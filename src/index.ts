import "./css/index.css";
import "./css/page-dashboard.css";
import { CarCanvas, DrawRoude } from "./ts/componentCore";
import { ObjectPohonTumbang, DrawTree, carObject } from "./ts/componentObject";
import { ContentainerCanvas } from "./ts/containerObject";
import { getRndInteger } from "./ts/core";
// import typescriptLogo from "./assets/typescript.svg";
// import viteLogo from "./assets/vite.svg";
// import heroImg from "./assets/hero.png";
// import { setupCounter } from "./counter.ts";

const pageDashboardT = "/html/page-dashboard.html";
const pageStartT = "/html/page-start.html";
import { navigateTo } from "./ts/core";

const keys: Record<string, boolean> = {};

window.onkeydown = (e: KeyboardEvent): void => {
  keys[e.key] = true;
};
window.onkeyup = (e: KeyboardEvent): void => {
  keys[e.key] = false;
};

// untuk posisi X
//  selecksi map nya per baris array , kalau udah lewat
// 0 = tidak ada object
const mapRandomX: number[][] = [
  [1200, 450, 0, 150, 800],
  [0, 300, 600, 0, 900],
  [500, 520, 0, 480, 510],
  [45, 1000, 0, 250, 60],
  [150, 0, 700, 900, 0],
  [800, 200, 400, 0, 1100],
  [0, 0, 500, 1000, 1200],
  [300, 600, 0, 600, 300],
];

const mapRandomY: number[][] = [
  [500, 150, 0, 300, 50],
  [0, 400, 800, 0, 200],
  [100, 110, 120, 0, 500],
  [600, 0, 350, 100, 800],
  [25, 200, 0, 450, 60],
  [300, 300, 300, 0, 600],
  [900, 700, 0, 200, 400],
  [150, 0, 450, 800, 100],
];

// var global

const mobileVP = 700;
let VPHNow = 0; //viewport H
let randMap = 0;
// let randPosY = 0; // random posisi untuk menyeleksi data di map
// let randPosX = 0; // random posisi untuk menyeleksi data di map

let roadOffset = 0;
let batasKiri = 0;

document.addEventListener("DOMContentLoaded", async () => {
  const app = document.querySelector<HTMLDivElement>("#app") as HTMLDivElement;

  // halaman dashboard sementara di matiin untuk mode dev
  // muat halaman awal
  await navigateTo(pageDashboardT, app);
  //
  const btn = app.querySelector("button#start") as HTMLButtonElement;
  //
  btn.addEventListener("click", async () => {
    console.info("execustu");

    // data di page Start
    await navigateTo(pageStartT, app);
    const carCanvas = document.querySelector("canvas#car") as HTMLCanvasElement;
    const carContex = carCanvas.getContext("2d");

    if (carContex) {
      function resizeCanvas() {
        carCanvas.width = window.innerWidth;
        carCanvas.height = window.innerHeight;

        VPHNow = window.innerHeight;
      }
      //  saat pertama kali dimuat
      resizeCanvas();

      const car = new CarCanvas(
        "main mobil",
        carContex,
        100,
        100,
        0,
        100,
        carCanvas.width,
        carCanvas.height,
      );
      const ctnObject = new ContentainerCanvas(
        carContex,
        50,
        50,
        carCanvas.height,
      );

      const animate = (): void => {
        carContex.clearRect(0, 0, carCanvas.width, carCanvas.height);

        console.info("rant map saat ini : ", randMap);
        // AMBIL DATA TERBARU berdasarkan randMap saat ini / render
        const currentX = mapRandomX[randMap];
        const currentY = mapRandomY[randMap];
        const minValueY = Math.min(...currentY); // nilai paling kecil atau paling akhir mendekati batas bwh

        //Gambar Lingkungan (Pastikan fungsi ini menerima parameter ctx)
        DrawRoude(carContex, carCanvas.width, carCanvas.height, roadOffset);

        // START OBject Draw component
        ctnObject.draw((ctx) => {
          ObjectPohonTumbang(
            ctx,
            "ffcc00ff",
            80,
            ctnObject.getHeigth(),
            ctnObject.x + currentX[0],
            ctnObject.y - currentY[0],
          );
        });
        ctnObject.draw((ctx) => {
          DrawTree(ctx, ctnObject.x + currentX[1], ctnObject.y - currentY[1]);
        });
        ctnObject.draw((ctx) => {
          DrawTree(ctx, ctnObject.x + currentX[2], ctnObject.y - currentY[2]);
        });
        // END OBject Draw component

        //  handle pergerakan KeyBanding
        car.carMove(keys);
        ctnObject.contentMove(keys);

        // Update dan Gambar
        ctnObject.update();
        car.update();
        car.draw();

        // update property global
        roadOffset = ctnObject.speed * 2;
        // Hitung posisi koordinat Y riil objek tersebut di Canvas
        const lastObjectY = ctnObject.y - minValueY;
        // jika object melewati Y axis dan adalah object yang paling atas
        if (lastObjectY > carCanvas.height) {
          // 200  agar jauh dari pandangn
          // 20 : sbg penanda untuk ini di  exc
          console.info("object keluar di y : ", ctnObject.y);
          // ctnObject.y = -10;

          // ganti posisi data map
          randMap = getRndInteger(0, mapRandomX.length - 1); // pastikan berdasarkan panjang
          // randPosX = getRndInteger(0, 5);
          // randPosY = getRndInteger(0, 5);
        }

        //Loop Animasi Panggil fungsinya sendiri tanpa tanda kurung
        requestAnimationFrame(animate);
      };

      animate();

      // Panggil setiap kali ukuran window berubah
      window.addEventListener("resize", () => {
        resizeCanvas();
      });
    }
  }); // haaman dashboard sementara di matiin untuk dev
});

// setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
