// canvas

const canvas = document.querySelector('canvas');
canvas.style.border = '4px solid #D2B48C';
const ctx = canvas.getContext('2d');
console.log(ctx);

canvas.width = 800;
canvas.height = 500;

const background = new Image();
background.src = './imgs/start-end-game.jpg'

const playerImg = new Image ();
player.src = "./imgs/player icon.png";

let playerX = 200;
let playerY = 500;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const animate = () => {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(playerImg, 0, 0, playerX, playerY);
  requestAnimationFrame(animate);
}
animate();

