const canvas = document.getElementById('game');
const game = canvas.getContext('2d');

let canvasSize;
let elementsSize;

window.addEventListener('load', startGame);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  } 

  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);
  elementsSize = canvasSize / 10;

  startGame();
}

function startGame() {
  game.font = elementsSize + 'px Verdana';
  game.textAlign = 'end';
  
  const map = maps[0];
  const mapRows = map.trim().split('\n');
  const mapCols = mapRows.map(row => row.trim().split(''));

  for (let row = 1; row <= 10; row++) {
    for (let col = 1; col <= 10; col++) {
      game.fillText(emojis[mapCols[row-1][col-1]], elementsSize * col, elementsSize * row);
    };
  };
}

