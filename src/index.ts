import "./css/index.css";
import "./css/page-dashboard.css";
import "./css/page-start.css";

import { CarCanvas } from "./ts/coreComponent/car";
import { DrawTree } from "./ts/objects/tree";
// import { ContentainerCanvas } from "./ts/containerObject";
import {
  ArrowUp,
  checkCollision,
  getRndInteger,
  updateAudioRate,
} from "./ts/core";
import { DrawCoin } from "./ts/objects/coin";
// import typescriptLogo from "./assets/typescript.svg";
// import viteLogo from "./assets/vite.svg";
// import heroImg from "./assets/hero.png";
// import { setupCounter } from "./counter.ts";

const pageDashboardT = "/html/page-dashboard.html";
const pageStartT = "/html/page-start.html";
import { navigateTo } from "./ts/core";
import { DrawRoudeAsphalt } from "./components/roude";
import type { DrawObject, DrawObjectClass } from "./types";
import { DrawCarFront } from "./ts/objects/car";

const keys: Record<string, boolean> = {};

window.onkeydown = (e: KeyboardEvent): void => {
  keys[e.key] = true;
};
window.onkeyup = (e: KeyboardEvent): void => {
  keys[e.key] = false;
};

// simpan posisi koordinat di mana object di gambar di map
// let maps = [{ name: "pohon", x: 300, y : 200 }, { name: "" }, {}];
// var global
let VPHNow: number = 0;
let roadOffset: number = 0;

let yKoordinat: number = 0;
let isMovingThisFrame: boolean = false;
let coinNow: number = 0;

// ket , x

interface typeDeclarasi {
  name: string;
  defaultX: number;
  defaultY: number;
  width: number;
  height: number;
  class: DrawObjectClass;
}

// simpan daftar object yang sipa di panggil
let declarasiObject: typeDeclarasi[] = [
  {
    name: "pohon 1",
    defaultX: 200,
    defaultY: -10,
    width: 50,
    height: 50,
    class: DrawTree,
  },
  {
    name: "car 1",
    defaultX: 0,
    defaultY: -10,
    width: 140,
    height: 140,
    class: DrawCarFront,
  },
  {
    name: "coin",
    defaultX: 0,
    defaultY: -10,
    width: 100,
    height: 150,
    class: DrawCoin,
  },
  {
    name: "coin",
    defaultX: 400,
    defaultY: -10,
    width: 100,
    height: 150,
    class: DrawCoin,
  },
];
// simpan object yang suhdah di inisialisais dan sipa di panggil
let instanceObjects: DrawObject[] = [];

document.addEventListener("DOMContentLoaded", async () => {
  const app = document.querySelector<HTMLDivElement>("#app") as HTMLDivElement;

  // halaman dashboard sementara di matiin untuk mode dev
  // muat halaman awal
  await navigateTo(pageDashboardT, app);
  //
  const btn = app.querySelector("button#start") as HTMLButtonElement;

  btn.addEventListener("click", async () => {
    console.info("execustu");

    // data di page Start
    await navigateTo(pageStartT, app);
    const carCanvas = document.querySelector("canvas#car") as HTMLCanvasElement;
    const carContex = carCanvas.getContext("2d");

    // CONTROLLER START
    const ctl = document.querySelector("div.ctl");
    const btnActive = ctl?.querySelector("button.ctl-active");
    const controller = document.querySelector(
      "div.controller",
    ) as HTMLDivElement;

    btnActive?.addEventListener("click", () => {
      controller?.classList.toggle("active");

      const btns = controller.querySelectorAll<HTMLButtonElement>(".btn");
      btns.forEach((btn) => {
        const key = btn.dataset.key;

        // update key untuk langsung menjalnakan
        if (key) {
          const down = () => (keys[key] = true);
          const up = () => (keys[key] = false);

          btn.addEventListener("mousedown", down);
          btn.addEventListener("mouseup", up);
          btn.addEventListener("mouseleave", up);

          btn.addEventListener("touchstart", (e) => {
            e.preventDefault();
            down();
          });

          btn.addEventListener("touchend", up);
        }
      });
    });
    // CONTROLLER END

    // PERPESTIVE  START
    const perpektive = document.querySelector(
      "div.perpektive",
    ) as HTMLDivElement;
    const btnPerpektive = perpektive.querySelector(
      "button",
    ) as HTMLButtonElement;

    btnPerpektive.addEventListener("click", () => {
      carCanvas.classList.toggle("perpektive");
    });

    // PERPESTIVE  END

    // SCORE START

    const score = document.querySelector("div.score") as HTMLDivElement;
    const scoreCoin = score.querySelector("p.coin") as HTMLParagraphElement;
    const spanCoin = scoreCoin.querySelector("span") as HTMLSpanElement;

    // SCORE END

    // Y KORDINAT START
    const yContainer = document.querySelector(
      "div.y-container",
    ) as HTMLDivElement;
    const yInputKoordinat = yContainer.querySelector(
      'input[type="range"]',
    ) as HTMLInputElement;

    yInputKoordinat?.addEventListener("input", () => {
      yKoordinat = Number(yInputKoordinat.value);

      console.info("y kordinat :", yKoordinat);
    });
    // Y KORDINAT END
    // UADIO ||  jangan dulu
    // const carAudio = new Audio("/car-move.mp3");
    // carAudio.loop = true;

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
        carCanvas.width / 2,
        carCanvas.height - 150,
        carCanvas.width,
        carCanvas.height,
      );
      // const ctnObject = new ContentainerCanvas(
      //   carContex,
      //   50,
      //   50,
      //   carCanvas.height,
      // );
      //
      // const pohon1 = new DrawTree(carContex,  -10, 200, 350, carCanvas.height);
      // const coin1 = new Coin(carContex,500,-10,50,50,10,carCanvas.height)
      // const pohon2 = new DrawTree(carContex, 58, 50, carCanvas.height);
      declarasiObject.forEach((item) => {
        const newObject = new item.class(
          carContex,
          item.name,
          item.defaultX,
          item.defaultY,
          item.width,
          item.height,
          carCanvas.width,
          carCanvas.height,
          true,
        );
        instanceObjects.push(newObject);
      });

      const animate = (): void => {
        carContex.clearRect(0, 0, carCanvas.width, carCanvas.height);

        // ambil salah 1 dari pohon1 misalnya untuk y
        DrawRoudeAsphalt(
          carContex,
          carCanvas.width,
          carCanvas.height,
          instanceObjects[0].y,
        );

        instanceObjects.forEach((obj) => {
          //  handle pergerakan KeyBanding
          car.carMove(keys);
          ArrowUp(keys, () => {
            obj.move();

            // Tandai bahwa mobil sedang bergerak di frame ini
            isMovingThisFrame = true;
          });

          isMovingThisFrame = false;
          // // Jika di frame ini TIDAK ada input ArrowUp, maka matikan suara
          // if (!isMovingThisFrame) {
          //     if (!carAudio.paused) {
          //         carAudio.pause();
          //         carAudio.currentTime = 0;
          //     }
          // }

          // poblem : gak bisa andalakan kecepatan Y dari obj aja , harus bersamaan dengan x dari car dan
          // poble : obj akan mereset ulang nantik jadi audio ikutan kereset , karena mengguakan kecepatan
          // saran : menggunakan fake object yang membuat speed terus bergerak sampai mobile berhenti maka audio ikutan berhenti
          // updateAudioRate(isMovingThisFrame, carAudio, obj.speed, obj.maxSpeed);
          //
          // Update dan Gambar
          // pohon1.update();
          // coin1.update()
          obj.update();
          car.update();

          car.draw();
          // pohon1.draw();
          // coin1.draw();
          obj.draw();

          // cek collection
          // cek pohon1
          if (
            checkCollision(
              car.x,
              car.y,
              car.width,
              car.height,
              obj.x,
              obj.y,
              obj.width,
              obj.height,
            )
          ) {
            switch (obj.name) {
              case "coin":
                coinNow += 5;

                if (scoreCoin && spanCoin) {
                  spanCoin.innerHTML = String(coinNow);
                }
                if (obj.eliminasi) {
                  obj.eliminasi();
                }
                break;
            }
            console.info(obj.name, " tertabrak");
          }

          // PROPERTY UPDATE START

          if (yKoordinat && yKoordinat <= carCanvas.height) {
            car.y = yKoordinat;
          }
          // PROPERTY UPDATE END
        });
        // semua object yang keluar dari canvas
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
