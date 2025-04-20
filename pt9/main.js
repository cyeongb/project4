//게임 실행 시 메인으로 실행되는 js

import { Player } from "./player.js";
import {InputHandler} from "./input.js";
import { Background } from "./background.js";
import {FlyEnemy, GroundEnemy, ClimbEnemy } from "./enemies.js"

window.addEventListener('load', function(){
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 900;
    canvas.height = 600;


    class Game{
        constructor(width,height){
            this.width = width;
            this.height = height;
            this.groundMargin = 80;

            this.speed = 0;
            this.maxSpeed = 3;

            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler();

            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;

            this.debug = true;
        }

        update(deltaTime){
            this.background.updateBackground();
            this.player.playerUpdate(this.input.keys , deltaTime);

            // 적 나오는 시간 조정
            if(this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer = 0;
            }else{
                this.enemyTimer += deltaTime;
            }

            this.enemies.forEach(enemy => {
                enemy.updateEnemy(deltaTime);
                if(enemy.markedForDeletion){
                    this.enemies.splice(this.enemies.indexOf(enemy),1);
                }
                
            });
        }

        draw(context){
            this.background.drawBackground(context);
            this.player.playerDraw(context);

            this.enemies.forEach(enemy => {
                enemy.drawEnemy(context);
            });
        }


        addEnemy(){
            if(this.speed > 0 && Math.random() < 0.5){
                this.enemies.push(new GroundEnemy(this));
            }else if(this.speed > 0 ){
                this.enemies.push(new ClimbEnemy(this));
            }
            this.enemies.push(new FlyEnemy(this));  //여기서 game 객체 넘겨줌.
        }
    }

    const game = new Game(canvas.width, canvas.height);

    let lastTime = 0;


    function animate(timeStamp){  //requestAnimationFrame 에 의해 생성되는 timeStamp
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;   //??
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
});