const canvas = document.getElementById('game');
const game = canvas.getContext('2d');

let btnUp = document.getElementById('up');
let btnLeft = document.getElementById('left');
let btnRight = document.getElementById('right');
let btnDown = document.getElementById('down');

let canvasSize;
let elementsSize;
let level = 0;

const position = {
  x: undefined,
  y: undefined,
};

const goal = {
  x: undefined,
  y: undefined,
}

let enemies = [];

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
  const map = maps[level];

  game.font = elementsSize + 'px Verdana';
  game.textAlign = 'end';

  if (!map) {
    return win();
  }

  const mapRows = map.trim().split('\n');
  const mapCols = mapRows.map(row => row.trim().split(''));

  enemies = [];
  game.clearRect(0,0,canvasSize,canvasSize);

  mapCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const x = elementsSize * (colI + 1);
      const y = elementsSize * (rowI + 1);
      
      if (col == 'O') {
        if (!position.x && !position.y) {
          position.x = x;
          position.y = y;
        }
      } else if (col == "I") {
        goal.x = x;
        goal.y = y;
      } else if (col == 'X') {
        enemies.push({
          x: x,
          y: y,
        });
      }
      
      game.fillText(emoji, x, y);
    });
  });

  movePlayer();
};



function win() {
  console.log('Felicidades, terminaste el juego!!');
}

function levelWin() {
  console.log('Nivel Superado!');
  level ++;
  startGame();
}

function levelFail() {
  console.log('Chocaste con una bomba!');
}



function movePlayer() {
  const goalCollisionX = position.x.toFixed(3) == goal.x.toFixed(3);
  const goalCollisionY = position.y.toFixed(3) == goal.y.toFixed(3);
  const goalCollision = goalCollisionX && goalCollisionY;

  const enemyCollision = enemies.find(enemy => {
    const enemyCollisionX = position.x.toFixed(5) == enemy.x.toFixed(5);
    const enemyCollisionY = position.y.toFixed(5) == enemy.y.toFixed(5);
    return enemyCollisionX && enemyCollisionY;
  });

  // if (goalCollision) levelWin();
  // if (enemyCollision) levelFail();


  game.fillText(emojis['PLAYER'], position.x, position.y);
}

function move(event) {
  if (event.key == 'ArrowUp') moveUp();
  else if (event.key == 'ArrowLeft') moveLeft();
  else if (event.key == 'ArrowRight') moveRight();
  else if (event.key == 'ArrowDown') moveDown();
}

function moveUp() {
  if ((position.y - elementsSize) < elementsSize) console.log('OUT');
  else position.y -= elementsSize, startGame();
}

function moveLeft() {
  if ((position.x - elementsSize) < elementsSize) console.log('OUT');
  else position.x -= elementsSize, startGame();
}

function moveRight() {
  if ((position.x + elementsSize) > canvasSize) console.log('OUT');
  else  position.x += elementsSize, startGame();
  
}

function moveDown() {
  if ((position.y + elementsSize) > canvasSize) console.log('OUT');
  else position.y += elementsSize, startGame();
}

