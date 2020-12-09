import Game from './src/game.js'

let canvas = document.getElementById("gameScreen")
let context = canvas.getContext('2d');

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let game = new Game(GAME_WIDTH, GAME_HEIGHT)

let lastTime = 0

function gameLoop(timeStamp) {
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp

    context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

    game.update(deltaTime);
    game.draw(context)
    

    requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)