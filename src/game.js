import Paddle from "./paddle.js"
import InputHandler from "./input.js"
import Ball from "./ball.js"
import Brick from "./brick.js"
import { buildLevel, level1, level2} from "./levels.js"

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4
}

export default class Game {

    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gamestate = GAMESTATE.MENU;
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.gameObjects = [];
        this.bricks = [];
        this.lives = 1;

        this.levels = [level1, level2]
        this.currentLevel = 0;

        new InputHandler(this.paddle, this);
    }


    start(){
        if (this.gamestate !== GAMESTATE.MENU &&
            this.gamestate !== GAMESTATE.NEWLEVEL) return;

        this.bricks = buildLevel(this, this.levels[this.currentLevel]);
        this.ball.reset();

        this.gameObjects = [
            this.ball,
            this.paddle,
        ]
    
        this.gamestate = GAMESTATE.RUNNING;
    }

    update(deltaTime){
        if(this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER

        if(this.gamestate === GAMESTATE.PAUSED || 
            this.gamestate === GAMESTATE.MENU ||
            this.gamestate === GAMESTATE.GAMEOVER) 
            return;

        if(this.bricks.length === 0){
            this.currentLevel++;
            this.gamestate = GAMESTATE.NEWLEVEL
            this.start();
        }

        [...this.gameObjects, ...this.bricks].forEach((object) => object.update(deltaTime));

        this.bricks = this.bricks.filter(brick => !brick.markedForDeletion)
    }

    draw(context){
        [...this.gameObjects, ...this.bricks].forEach((object) => object.draw(context))

        if (this.gamestate === GAMESTATE.PAUSED) {
        context.rect(0,0,this.gameWidth,this.gameHeight);
        context.fillStyle = "rgba(0,0,0,0.25)"
        context.fill();

        context.font = "30px Poppins";
        context.fillStyle = "gold";
        context.textAlign = "center";
        context.fillText("P A U S E D", this.gameWidth / 2, this.gameHeight / 2)
        }

        if (this.gamestate === GAMESTATE.MENU) {
            context.rect(0,0,this.gameWidth,this.gameHeight);
            context.fillStyle = "slateblue"
            context.fill();
    
            context.font = "30px Poppins";
            context.fillStyle = "gold";
            context.textAlign = "center";
            context.fillText("Press SPACEBAR to START", this.gameWidth / 2, this.gameHeight / 2)
        }

        if (this.gamestate === GAMESTATE.GAMEOVER) {
            context.rect(0,0,this.gameWidth,this.gameHeight);
            context.fillStyle = "slateblue"
            context.fill();
    
            context.font = "30px Poppins";
            context.fillStyle = "gold";
            context.textAlign = "center";
            context.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2)
        }
    }

    togglePause() {
        if(this.gamestate === GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING;
        } else {
            this.gamestate = GAMESTATE.PAUSED;
        }
    }
   

}