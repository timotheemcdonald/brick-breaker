import Paddle from './src/paddle.js'

let canvas = document.getElementById("gameScreen")

let context = canvas.getContext('2d');

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

context.clearRect(0, 0, 800, 600);

let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);
paddle.draw(context)

let lastTime = 0

function gameLoop(timeStamp){

    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp

    context.clearRect(0, 0, 800, 600)
    paddle.update()
    paddle.draw(context)

    requestAnimationFrame(gameLoop)
}

gameLoop()