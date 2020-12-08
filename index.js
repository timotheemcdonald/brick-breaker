import Paddle from './src/paddle.js'
import InputHandler from './src/input.js'
import Ball from './src/ball.js'

let canvas = document.getElementById("gameScreen")

let context = canvas.getContext('2d');

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

context.clearRect(0, 0, 800, 600);

let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);
let ball = new Ball(GAME_WIDTH, GAME_HEIGHT);
paddle.draw(context)

new InputHandler(paddle);

let lastTime = 0


function gameLoop(timeStamp){

    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp

    context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
    paddle.update()
    paddle.draw(context)

    ball.update(deltaTime)
    ball.draw(context)

    requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)