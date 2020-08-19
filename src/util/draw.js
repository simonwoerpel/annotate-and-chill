export function drawRect({ ctx, x, y, rectWidth, rectHeight }) {
  ctx.beginPath();
  ctx.rect(x, y, rectWidth, rectHeight);
  ctx.stroke();
}

export function clearCanvas(canvas) {
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

export function getRelativeLocation({
  height,
  width,
  startX,
  startY,
  endX,
  endY,
}) {
  const [x1, y1] = [
    (startX < endX ? startX : endX) / width,
    (startY < endY ? startY : endY) / height,
  ];
  const [x2, y2] = [
    x1 + Math.abs(endX - startX) / width,
    y1 + Math.abs(endY - startY) / height,
  ];
  return [x1, y1, x2, y2].map(i => Math.round(i * 100));
}
