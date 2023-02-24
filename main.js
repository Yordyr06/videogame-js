const canvas = document.getElementById('game');
const game = canvas.getContext('2d');

let btnUp = document.getElementById('up');
let btnLeft = document.getElementById('left');
let btnRight = document.getElementById('right');
let btnDown = document.getElementById('down');

let canvasSize;
let elementsSize;




window.addEventListener('load', startGame);
window.addEventListener('resize', setCanvasSize);

window.addEventListener('keydown', move);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);



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

  mapCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const x = elementsSize * (colI + 1);
      const y = elementsSize * (rowI + 1);
      game.fillText(emoji, x, y);
    });
  });
};


function move(event) {
  if (event.key == 'ArrowUp') moveUp();
  else if (event.key == 'ArrowLeft') moveLeft();
  else if (event.key == 'ArrowRight') moveRight();
  else if (event.key == 'ArrowDown') moveDown();
}

function moveUp() {
  console.log('Me quiero jondia parriba');
}

function moveLeft() { 
  console.log('Me quiero jondia pa la iquielda');
}

function moveRight() {
  console.log('Me quiero jondia pa la derecha');
}

function moveDown() {
  console.log('Me quiero jondia pabajo');
}