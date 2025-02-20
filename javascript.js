const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const squareSize = 700;

const centerX = (canvas.width - squareSize) / 2;
const centerY = (canvas.height - squareSize) / 2;

ctx.fillStyle = "#eae6e0";
ctx.fillRect(centerX, centerY, squareSize, squareSize);

const i = 8; // linhas
const j = 8; // colunas
const tileSize = squareSize / j;

for (let j0 = 0; j0 < j; j0++) {
  for (let i0 = 0; i0 < i; i0++) {
    const isDark = (i0 + j0) % 2 === 0;
    ctx.fillStyle = isDark ? "#3e3e3e" : "#ffffff"; // Cor escura ou clara
    ctx.fillRect(
      centerX + j0 * tileSize,
      centerY + i0 * tileSize,
      tileSize,
      tileSize
    );
  }
}

const blackRook = new Image();
blackRook.src = "img/black/blackRook.png";
blackRook.onload = function() {
ctx.drawImage(blackRook, centerX + tileSize * 0, centerY + tileSize * 7, tileSize, tileSize);}
