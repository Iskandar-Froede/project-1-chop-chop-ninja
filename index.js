const canvas = document.querySelector('canvas');
canvas.style.border = '4px solid #D2B48C';
const ctx = canvas.getContext('2d');

const startButton = document.querySelector('.play-img');

const startScreen = document.querySelector('.start-game');
startScreen.style.border = '4px solid #D2B48C';

const gameOver = document.querySelector('.game-over');
gameOver.style.border = '4px solid #D2B48C';

const restart = document.querySelector('.restart');

const showScore = document.querySelector('.ninja-score');

const song = new Audio();
song.src = "./pixelated-adventure.mp3";
song.volume = 0.1;

const background = new Image();
background.src = './img/game-background.png';

const background2 = new Image();
background2.src = "./img/game-background.png"

const playerImg = new Image ();
playerImg.src = "./img/player-img.png";

const obstacle = new Image ();
obstacle.src = "./img/shuriken.png"

// background
let backgroundX = 0;
let background2X = canvas.width;

// player position and size
let playerSizeX = 70;
let playerSizeY = 100;
let playerPositionX = 20;
let playerPositionY = 270;

// / by default player is not moving
let playerMoveRight = false; 
let playerMoveLeft = false;
let playerMoveUp = false;
let playerMoveDown = false;

// score
let score = 0;

// gameover
let isGameOver = false;
let gameId = 0; 

function endGame() {
  canvas.style.display = "none";
  gameOver.style.display = "flex";
  showScore.innerHTML = score;
  song.pause();
}

// obstacles
let obstacles = [ {
  img: obstacle,
  size: 40, 
  x: canvas.width + 2,
  y: 300
},
{
  img: obstacle,
  size: 40,
  x: canvas.width + 200,
  y: 250
},
{
  img: obstacle,
  size: 40,
  x: canvas.width + 450,
  y: 310
},
{
  img: obstacle,
  size: 40,
  x: canvas.width + 600,
  y: 230
},
{
  img: obstacle,
  size: 40,
  x: canvas.width + 800,
  y: 290
},
{
  img: obstacle,
  size: 40,
  x: canvas.width + 1000,
  y: 250
},
{
  img: obstacle,
  size: 40,
  x: canvas.width + 1200,
  y: 280
},
{
  img: obstacle,
  size: 40,
  x: canvas.width + 1500,
  y: 230
}
];

// showing images on the canvas
const animate = () => {
  // ctx.clearRect();
  ctx.drawImage(background, backgroundX, 0, canvas.width, canvas.height);
  ctx.drawImage(background2, background2X, 0, canvas.width, canvas.height);
  ctx.drawImage(playerImg, playerPositionX, playerPositionY, playerSizeX, playerSizeY);
  
// showing score on canvas 
    ctx.font = "20px Cooper Black";
    ctx.fillText("Score: " + score, 20, 40)

// move canvas
  backgroundX -= 2;
  background2X -= 2;
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
} else if (playerMoveUp === true && playerPositionY + playerSizeX > canvas.height - 127) {
    playerPositionY -= 7;
} else if (playerMoveDown === true && playerPositionY + playerSizeY < canvas.height) {
    playerPositionY += 7;
}

// loop & move obstacles
for (let i = 0; i < obstacles.length; i += 1) {
  ctx.drawImage(obstacles[i].img, obstacles[i].x, obstacles[i].y, 40, 40);
  obstacles[i].x -= 7;

if (obstacles[i].x < -200 ) {
  obstacles[i].x = canvas.width + 1000;
}

// collision with obstacles
if (
  obstacles[i].x + 40 <= 0 && 
  obstacles[i].x + 40 >= -4
  
// score
) {
  score++
//  console.log(score)
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

// game is over
if (isGameOver) {
cancelAnimationFrame(gameId)
endGame ();
song.pause();

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
  gameOver.style.display = "none";

  startButton.addEventListener('click', () => {
  startScreen.style.display = "none";
  canvas.style.display = "block";

  song.play()
  
  startGame();
  })

  restart.addEventListener('click', () => {
  gameOver.style.display = "none";
  canvas.style.display = "block";

  isGameOver = false;
  score = 0;
  obstacles = [ {
    img: obstacle,
    size: 40, 
    x: canvas.width + 2,
    y: 300
  },
  {
    img: obstacle,
    size: 40,
    x: canvas.width + 200,
    y: 250
  },
  {
    img: obstacle,
    size: 40,
    x: canvas.width + 450,
    y: 310
  },
  {
    img: obstacle,
    size: 40,
    x: canvas.width + 600,
    y: 230
  },
  {
    img: obstacle,
    size: 40,
    x: canvas.width + 800,
    y: 290
  },
  {
    img: obstacle,
    size: 40,
    x: canvas.width + 1000,
    y: 250
  },
  {
    img: obstacle,
    size: 40,
    x: canvas.width + 1200,
    y: 280
  },
  {
    img: obstacle,
    size: 40,
    x: canvas.width + 1500,
    y: 230
  }
  ];

  playerPositionX = 20;
  playerPositionY = 270;
  startGame();
  song.play()
  })
};




