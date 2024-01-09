// board
var boxSize = 25;
var rows = 20;
var cols = 20;
var context;
var board;

//snake head
var snakeX = boxSize * 5;
var snakeY = boxSize * 5;

//snake speed to move

var velocityX = 0;
var velocityY = 0;

// snake eating the food

var snakeBody = [];

//food
var foodX;
var foodY;

// game over

var gameOver = false;

window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * boxSize;
  board.width = cols * boxSize;
  context = board.getContext("2d"); // for drawing on the board
  placeFood(); // that function should be called first
  document.addEventListener("keyup", snakeMovements);
  // update(); // that function should be called later
  setInterval(update, 1000 / 10); // 100 mil sec it will run the update function not just once
};

// update function to redraw the board on html
function update() {
  //game over
  if (gameOver) {
    return;
  }
  // board drawing
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height); // starts from the corner of canvas

  //food drwaing and it needs to be drwan first so the snake collids with it
  context.fillStyle = "purple";
  context.fillRect(foodX, foodY, boxSize, boxSize);

  // if statment to increase the body of the snake and change the place of the food
  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }

  //to move the body with the head
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  //snake drawing
  context.fillStyle = "blue"; //color of snake
  snakeX += velocityX * boxSize; // so that the snake moves every unit or block not 1 pixel at a time
  snakeY += velocityY * boxSize;
  context.fillRect(snakeX, snakeY, boxSize, boxSize);
  // to draw the increased body of the snake
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], boxSize, boxSize);
  }

  // game over condtions
  if (
    snakeX < 0 ||
    snakeX > cols * boxSize ||
    snakeY < 0 ||
    snakeY > rows * boxSize
  ) {
    gameOver = true;
    alert("Try Again");
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if ((snakeX = snakeBody[i][0] && snakeY[i][1])) {
      alert("try again");
    }
  }
}

//function for snake movements

function snakeMovements(e) {
  if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}

//function to change food place in the board randomly
function placeFood() {
  foodX = Math.floor(Math.random() * cols) * boxSize;
  foodY = Math.floor(Math.random() * rows) * boxSize;
}
