// canvas

const canvas = document.querySelector('canvas');
canvas.style.border = '4px solid #D2B48C';
const ctx = canvas.getContext('2d');
const startButton = document.querySelector('.play-img');
const startScreen = document.querySelector('.start-game');


const background = new Image();
background.src = './img/start-background.jpg';

const playerImg = new Image ();
playerImg.src = "./img/player icon.png";

let playerSizeX = 70;
let playerSizeY = 100;
let playerPositionX = 20;
let playerPositionY = 270;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const animate = () => {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(playerImg, playerPositionX, playerPositionY, playerSizeX, playerSizeY);
  requestAnimationFrame(animate);
}

// move the player
if ()


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
    } else if (event.code === 'Arrowdown') {
      console.log('Down key is pressed');
      playerMoveDown = true;
    }
  });

  // player keyboard stop movement
  document.addEventListener('keyup', () =>  {
    playerMoveLeft = false;
    playerMoveRight = false;
    playerMoveUp = false;
    playerMoveDown = false;
});

}







window.onload = () => {
  canvas.style.display = "none";
  startButton.addEventListener('click', () => {
    startScreen.style.display = "none";
    canvas.style.display = "block";
  })
}