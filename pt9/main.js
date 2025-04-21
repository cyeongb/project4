//게임 실행 시 메인으로 실행되는 js

import { Player } from "./player.js";
import {InputHandler} from "./input.js";
import { Background } from "./background.js";
import {FlyEnemy, GroundEnemy, ClimbEnemy } from "./enemies.js";
import { UI } from './UI.js';

window.addEventListener('load', function(){
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 900;
    canvas.height = 600;


    class Game{
        constructor(width,height){
            
            // 크기, 높이 설정
            this.width = width;
            this.height = height;
            this.groundMargin = 80;

            //속도 관련
            this.speed = 0;
            this.maxSpeed = 3;

            // 배경, 플레이어 인스턴스 생성
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);

            //적 관련, 나타나는 시간
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;

            //debug 모드
            this.debug = false;

            //font
            this.fontColor = '#000';
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

            this.UI.drawUI(context);

        }

        //적을 랜덤으로 생성
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