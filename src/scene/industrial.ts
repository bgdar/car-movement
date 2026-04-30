// export function industrialAnimation(): void {
//   // ambil salah 1 dari pohon1 misalnya untuk y
//   DrawRoudeAsphalt(
//     carContex,
//     carCanvas.width,
//     carCanvas.height,
//     instanceObjects[0].y,
//   );

//   instanceObjects.forEach((obj) => {
//     //  handle pergerakan KeyBanding
//     car.carMove(keys);
//     ArrowUp(keys, () => {
//       obj.move();
//       // Tandai bahwa mobil sedang bergerak di frame ini
//       isMovingThisFrame = true;
//     });

//     isMovingThisFrame = false;
//     // // Jika di frame ini TIDAK ada input ArrowUp, maka matikan suara
//     // if (!isMovingThisFrame) {
//     //     if (!carAudio.paused) {
//     //         carAudio.pause();
//     //         carAudio.currentTime = 0;
//     //     }
//     // }

//     // poblem : gak bisa andalakan kecepatan Y dari obj aja , harus bersamaan dengan x dari car dan
//     // poble : obj akan mereset ulang nantik jadi audio ikutan kereset , karena mengguakan kecepatan
//     // saran : menggunakan fake object yang membuat speed terus bergerak sampai mobile berhenti maka audio ikutan berhenti
//     // updateAudioRate(isMovingThisFrame, carAudio, obj.speed, obj.maxSpeed);
//     //
//     // Update dan Gambar
//     // pohon1.update();
//     // coin1.update()
//     obj.update();
//     car.update();

//     car.draw();
//     // pohon1.draw();
//     // coin1.draw();
//     obj.draw();

//     // cek collection
//     // cek pohon1
//     if (
//       checkCollision(
//         car.x,
//         car.y,
//         car.width,
//         car.height,
//         obj.x,
//         obj.y,
//         obj.width,
//         obj.height,
//       )
//     ) {
//       console.info("mobile : x dan y : ", car.x, car.y);
//       // console.info("pohon: x dan y : ", pohon1.x, pohon1.y);
//       console.info(obj.name, " tertabrak");
//     }
//     //
//   });
// }
