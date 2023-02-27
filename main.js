const canvas = document.getElementById('game');
const game = canvas.getContext('2d');
const btnUp = document.getElementById('up');
const btnLeft = document.getElementById('left');
const btnRight = document.getElementById('right');
const btnDown = document.getElementById('down');
const spanHearts = document.getElementById('hearts');
const spanTime = document.getElementById('time');

let canvasSize;
let elementsSize;
let level = 0;
let hearts = 3;

let timeStart;
let timePlayer;
let timeInterval;

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

  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 1000);
  }

  const mapRows = map.trim().split('\n');
  const mapCols = mapRows.map(row => row.trim().split(''));

  showHearts();

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



function movePlayer() {
  const goalCollisionX = position.x.toFixed(3) == goal.x.toFixed(3);
  const goalCollisionY = position.y.toFixed(3) == goal.y.toFixed(3);
  const goalCollision = goalCollisionX && goalCollisionY;

  const enemyCollision = enemies.find(enemy => {
    const enemyCollisionX = position.x.toFixed(3) == enemy.x.toFixed(3);
    const enemyCollisionY = position.y.toFixed(3) == enemy.y.toFixed(3);
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



function win() {
  console.log('Felicidades, terminaste el juego!!');
  clearInterval(timeInterval);
}

function levelWin() {
  console.log('Nivel Superado!');
  level ++;
  startGame();
}

function levelFail() {
  console.log('Chocaste con una bomba!');
  hearts --;
  
  position.x = undefined;
  position.y = undefined;
  
  if (hearts <= 0) {
    level = 0;
    hearts = 3;
    timeStart = undefined;
  }
  
  startGame();
}



function showHearts() {
  const heartsArr = Array(hearts).fill(emojis['HEART']);
  spanHearts.innerHTML = '';
  
  heartsArr.forEach(heart => spanHearts.append(heart));
}

function showTime() {
  spanTime.innerHTML = Date.now() - timeStart;
}