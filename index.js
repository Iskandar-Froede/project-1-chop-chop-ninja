// canvas

const canvas = document.querySelector('canvas');
canvas.style.border = '4px solid #D2B48C';
const ctx = canvas.getContext('2d');
const startButton = document.querySelector('.play-img');
const startScreen = document.querySelector('.start-game');


const background = new Image();
background.src = './img/game-background.png';

const background2 = new Image();
background2.src = "./img/game-background.png"

const playerImg = new Image ();
playerImg.src = "./img/player-img.png";

const obstacle = new Image ();
obstacle.src = "./img/shuriken.png"



let backgroundX = 0;
let background2X = canvas.width;

let playerSizeX = 70;
let playerSizeY = 100;
let playerPositionX = 20;
let playerPositionY = 270;

// / by default player is not moving

let playerMoveRight = false; 
let playerMoveLeft = false;
let playerMoveUp = false;
let playerMoveDown = false;


let score = 0;

let isGameOver = false;
let gameId = 0; 


// obstacles
let obstacles = [ {
  img: obstacle,
  size: 40, // which effect ???
  x: canvas.width + 200,
  y: 300
},
{
  img: obstacle,
  size: 40,
  x: canvas.width + 600,
  y: 280

},
{
  img: obstacle,
  size: 40,
  x: canvas.width + 900,
  y: 320

},
{
  img: obstacle,
  size: 40,
  x: canvas.width + 1200,
  y: 240

}

];




const animate = () => {
  // ctx.clearRect();
  ctx.drawImage(background, backgroundX, 0, canvas.width, canvas.height);
  ctx.drawImage(background2, background2X, 0, canvas.width, canvas.height);
  ctx.drawImage(playerImg, playerPositionX, playerPositionY, playerSizeX, playerSizeY);
  
  
  // move canvas

  backgroundX -= 2;
  background2X -=2;
  if (backgroundX < -canvas.width) {
  backgroundX = canvas.width;
 } 
  if (background2X < -canvas.width) {
  background2X = canvas.width;
 }

// move the player

if (playerMoveRight === true) {
    playerPositionX += 5;
} else if (playerMoveLeft === true && playerPositionX > 0) {
    playerPositionX -= 5;
} else if (playerMoveUp === true) {
    playerPositionY -= 8;
} else if (playerMoveDown === true && playerPositionY + playerSizeY < canvas.height) {
    playerPositionY +=8;
}


// loop & move obstacles

for (let i = 0; i < obstacles.length; i += 1) {
  ctx.drawImage(obstacles[i].img, obstacles[i].x, obstacles[i].y, 40, 40);
  obstacles[i].x -= 5

if (obstacles[i].x < -200 ) {
  obstacles[i].x = canvas.width + 1000;
}


// collision with obstacles
if (
  obstacles[i].x + 40 <= 0 && 
  obstacles[i].x + 40 >= -4
  
) {
  score++
  console.log(score)
}

if (
  playerPositionX +  playerSizeX - 15 > obstacles[i].x &&
  playerPositionY + playerSizeY - 20 > obstacles[i].y &&
  playerPositionY < obstacles[i].y + 20 &&
  playerPositionX < obstacles[i].x + 20
  
) {
isGameOver = true;
}
}
// console.log(gameId);

// game is over

if (isGameOver === true) {
  cancelAnimationFrame(gameId)
} else {
  gameId = requestAnimationFrame (animate);  // start the new frame for the game
}
}

// starting the game
function startGame () {
  startScreen.style.display = 'none'
    animate()

// player keyboard movement

  document.addEventListener ('keydown', event => {
    if (event.code === 'ArrowLeft') {
      console.log('Left key is pressed');
      playerMoveLeft = true;
    } else if (event.code === 'ArrowRight') {
      console.log('Right key is pressed');
      playerMoveRight = true;
    } else if (event.code === 'ArrowUp') {
      console.log('Up key is pressed');
      playerMoveUp = true;
    } else if (event.code === 'ArrowDown') {
      console.log('Down key is pressed');
      playerMoveDown = true;
    }
  })

  // player keyboard stop movement

  document.addEventListener('keyup', () =>  {
    playerMoveLeft = false;
    playerMoveRight = false;
    playerMoveUp = false;
    playerMoveDown = false;
})
}


// hiding and showing the start screen

window.onload = () => {
  canvas.style.display = "none";
  startButton.addEventListener('click', () => {
    startScreen.style.display = "none";
    canvas.style.display = "block";

    startGame();
  })
}