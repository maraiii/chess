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

// Desenhando o tabuleiro
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

// Função para gerar a URL da peça com base na cor e nome
const getPieceUrl = (color, name) =>
  `https://images.chesscomfiles.com/chess-themes/pieces/icy_sea/150/${color}${name}.png`;

// Função para carregar e desenhar a peça no canvas
async function loadPieceToCanvas(color, name, i, j) {
  const url = getPieceUrl(color, name);

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erro ao carregar a peça`);

    const blob = await response.blob();
    const img = new Image();
    img.src = URL.createObjectURL(blob);

    img.onload = () => {
      const canvas = document.querySelector("#canvas");
      if (!canvas) {
        console.error("Canvas não encontrado!");
        return;
      }
      const ctx = canvas.getContext("2d");

      // Ajuste a posição para que a peça seja colocada na célula certa
      const xPos = centerX + j * tileSize;
      const yPos = centerY + i * tileSize;
      
      ctx.drawImage(img, xPos, yPos, tileSize, tileSize);
    };

    img.onerror = () => {
      console.error("Erro ao carregar a imagem");
    };
  } catch (error) {
    console.error(error);
  }
}

// Definindo o tabuleiro de xadrez com as peças iniciais
const board = [
  ["r", "n", "b", "q", "k", "b", "n", "r"], // Linha 0: peças pretas
  ["p", "p", "p", "p", "p", "p", "p", "p"], // Linha 1: peões pretos
  [null, null, null, null, null, null, null, null], // Linha 2: vazia
  [null, null, null, null, null, null, null, null], // Linha 3: vazia
  [null, null, null, null, null, null, null, null], // Linha 4: vazia
  [null, null, null, null, null, null, null, null], // Linha 5: vazia
  ["P", "P", "P", "P", "P", "P", "P", "P"], // Linha 6: peões brancos
  ["R", "N", "B", "Q", "K", "B", "N", "R"] // Linha 7: peças brancas
];

// Carregando as peças de acordo com a matriz do tabuleiro
async function drawBoard() {
  for (let i = 0; i < board.length; i++) {  // i = linha
    for (let j = 0; j < board[i].length; j++) {  // j = coluna
      const piece = board[i][j];
      if (piece) {
        const color = piece === piece.toUpperCase() ? "w" : "b";  // Determina a cor da peça
        const name = piece.toLowerCase();  // Obtém o nome da peça (r, n, b, etc.)
        await loadPieceToCanvas(color, name, i, j);  // Carrega e desenha a peça
      }
    }
  }
}

// Chame a função para carregar as peças
drawBoard();
