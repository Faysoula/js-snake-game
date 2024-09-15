const blockSize = 25;
const rows = 20;
const cols = 20;
const context = document.getElementById("game");
const ctx = context.getContext("2d");

var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var snakeBody = [];

var velX = 0;
var velY = 0;

var nomX;
var nomY;

var gameOver = false;

window.onload = function () {
  context.width = cols * blockSize;
  context.height = rows * blockSize;

  placeNom();
  document.addEventListener("keyup", chnageDirection);
  setInterval(update, 1000 / 10);
};

function update() {
  if (gameOver) {
    return;
  }

  ctx.fillStyle = "grey";
  ctx.fillRect(0, 0, context.width, context.height);

  ctx.fillStyle = "red";
  ctx.fillRect(nomX, nomY, blockSize, blockSize);

  if (snakeX == nomX && snakeY == nomY) {
    snakeBody.push([snakeX, snakeY]);
    placeNom();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  ctx.fillStyle = "lime";
  snakeX += velX * blockSize;
  snakeY += velY * blockSize;
  ctx.fillRect(snakeX, snakeY, blockSize, blockSize);

  for (let i = 0; i < snakeBody.length; i++) {
    ctx.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  if (
    snakeX < 0 ||
    snakeX >= cols * blockSize ||
    snakeY < 0 ||
    snakeY >= rows * blockSize
  ) {
    gameOver = true;
    alert("Game Over Loser");
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      alert("Game Over Loser");
    }
  }
}

function chnageDirection(event) {
  if (event.code == "ArrowUp" && velY != 1) {
    velX = 0;
    velY = -1;
  } else if (event.code == "ArrowDown" && velY != -1) {
    velX = 0;
    velY = 1;
  } else if (event.code == "ArrowLeft" && velX != 1) {
    velX = -1;
    velY = 0;
  } else if (event.code == "ArrowRight" && velX != -1) {
    velX = 1;
    velY = 0;
  }
  if (event.code == "Space" && gameOver) {
    resetGame();
  }
}

function placeNom() {
  nomX = Math.floor(Math.random() * cols) * blockSize;
  nomY = Math.floor(Math.random() * rows) * blockSize;
}

function resetGame() {
  snakeX = blockSize * 5;
  snakeY = blockSize * 5;

  snakeBody = [];

  velX = 0;
  velY = 0;

  placeNom();
  gameOver = false;
}
