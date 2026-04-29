/**
 * gambar jalan yang beraspal
*/

 export function DrawRoudeAsphalt(
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeigth: number,
  cameraY: number,
): void {
  ctx.save();
  ctx.translate(canvasWidth / 2, canvasHeigth / 2);
  const roadWidth = canvasWidth * 3;
  const roadHeight = 4000;

  // posisi dunia jalan ikut camera
  const roadY = cameraY;

  // ======================
  // ASPAL
  // ======================
  ctx.fillStyle = "#444";
  ctx.fillRect(-roadWidth / 2, -roadHeight / 2 + roadY, roadWidth, roadHeight);

  // ======================
  // MARKA
  // ======================
  ctx.strokeStyle = "white";
  ctx.lineWidth = 15;

  ctx.setLineDash([40, 30]);

  // 🔥 ini yang bikin jalan bergerak
  ctx.lineDashOffset = -cameraY * 1.5;

  ctx.beginPath();
  ctx.moveTo(0, -2000 + roadY);
  ctx.lineTo(0, 2000 + roadY);
  ctx.stroke();

  ctx.setLineDash([]);

  const laneWidth = 400;

  ctx.beginPath();
  ctx.moveTo(-laneWidth, -2000 + roadY);
  ctx.lineTo(-laneWidth, 2000 + roadY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(laneWidth, -2000 + roadY);
  ctx.lineTo(laneWidth, 2000 + roadY);
  ctx.stroke();

  ctx.restore();
}
