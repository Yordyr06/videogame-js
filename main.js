const canvas = document.getElementById('game');
const game = canvas.getContext('2d');

let canvasSize;

window.addEventListener('load', startGame);

function startGame() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  } 

  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);
  const elementsSize = canvasSize / 10;
  
  for (let i = 1; i <= 10; i++) {
    game.fillText(emojis['X'], elementsSize * i, elementsSize);
  };
}