//게임 실행 시 메인으로 실행되는 js

import { Player } from "./components/player.js";
import {InputHandler} from "./components/input.js";
import { Background } from "./components/background.js";
import {FlyEnemy, GroundEnemy, ClimbEnemy } from "./components/enemies.js";
import { UI } from './view/UI.js';


window.addEventListener('load', function(){
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 900;
    canvas.height = 600;

    const startMenu = this.document.getElementById('startMenu');
    const startButton = this.document.getElementById('startButton');

    class Game{
        constructor(width,height){
            
            // 크기, 높이 설정
            this.width = width;
            this.height = height;
            this.groundMargin = 80;

            //속도 관련
            this.speed = 0;
            this.maxSpeed = 3;
            this.baseSpeed = 3;  // 기본 속도
            this.speedIncrement = 1;  // 1분마다 증가할 속도
            this.speedTimer = 0;  // 속도 증가를 위한 타이머

            // 배경, 플레이어 인스턴스 생성
            this.score = 0;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this,canvas);

            //적 관련, 나타나는 시간
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.time = 0;
            this.maxTime = 60000;  //시간제한 1분
            
            //player 의 파편
            this.particles=[];
            this.maxParticles = 50; // 파편 길이

            //충돌
            this.collisions = [];

            //debug 모드
            this.debug = false;

            //font
            this.fontColor = '#000';

            //player 상태
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
            this.gameOver = false;
            this.lives = 1; //목숨 1개
            this.floatingMessages = [];
            
            //start 하면 시간 카운트 되게끔.
            this.isStart = false;
        }

        update(deltaTime){
            
            // console.log("this.isStart =>> ",this.isStart);
            if(this.isStart === true){
                // console.log("isStart 1 =>",this.isStart);
                this.time += deltaTime;
                // 시간 제한 다되면 game over
                if(this.time > this.maxTime){
                        this.gameOver = true;
                    }
                                        
                    // 20초마다 속도 증가
                    this.speedTimer += deltaTime;
                    if (this.speedTimer >= 10000) {  // 60초 = 60000ms
                        this.baseSpeed += this.speedIncrement;
                        this.maxSpeed = this.baseSpeed;
                        this.speedTimer = 0;  // 타이머 리셋
                        this.enemyInterval = Math.max(300, this.enemyInterval - 100); //최소 300ms 까지만.
                        // console.log("속도증가");
                    }
                }

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
            });

            //적 처치 시 뜨는 floating msg
            this.floatingMessages.forEach(msg => {
                msg.updateFloating();
            });

            //파편 처리
            this.particles.forEach((part,i)=>{
                part.updateParticles();
            });

            //파편이 너무 길어서 max 까지만
            if(this.particles.length > this.maxParticles){
                this.particles.length = this.maxParticles;
            }

            //충돌 처리
            this.collisions.forEach((collision,i)=>{
                collision.updateCollision(deltaTime);
            });

            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            this.particles = this.particles.filter(particle => !particle.markedForDeletion);
            this.collisions = this.collisions.filter(col => !col.markedForDeletion);
            this.floatingMessages = this.floatingMessages.filter(msg => !msg.markedForDeletion);

        }

        draw(context){
            this.background.drawBackground(context);
            this.player.playerDraw(context);

            this.enemies.forEach(enemy => {
                enemy.drawEnemy(context);
            });

            this.particles.forEach(part => {
                part.drawParticle(context);
            });

            this.floatingMessages.forEach(msg => {
                msg.drawFloating(context);
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
        };

        reset() {
            // 게임 초기화
            this.score = 0;
            this.time = 0;
            this.lives = 1;
            this.gameOver = false;
            this.enemies = [];
            this.particles = [];
            this.collisions = [];
            this.floatingMessages = [];
            this.speed = 0;
            this.maxSpeed = 3;
            this.baseSpeed = 3;
            this.speedTimer = 0;
            this.enemyInterval = 1000;
            this.isStart = true;
            
            // 플레이어 초기화
            this.player.x = 0;
            this.player.y = this.height - this.player.height - this.groundMargin;
            this.player.frameX = 0;
            this.player.frameY = 0;
            this.player.vy = 0;
            this.player.setState(0, 0); // Sitting 상태로 초기화
        };
    }

    // const game = new Game(canvas.width, canvas.height);

    let lastTime = 0;
    let game;
    let animationId;

    // 게임 시작 함수
    function startGame() {
        startMenu.style.display = 'none';
        canvas.style.display = 'block';
        canvas.style.cursor = 'default';

        game = new Game(canvas.width, canvas.height);
        game.isStart = true; 
        lastTime = performance.now();
        // lastTime = 0;
        
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        
        animate(0);
    }

    // 게임 종료 시 메뉴 표시
    function showGameOverMenu() {
        startButton.textContent = 'RESTART';
        // startMenu.style.display = 'block';
    }

    //클릭 시 게임 시작
    startButton.addEventListener('click', startGame);

    // 재시작
    window.addEventListener('restartGame', () => {
        if (game && game.gameOver) {
            // 게임 재시작
            game.reset();
            // lastTime = 0;
            lastTime = performance.now(); 
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            animate(0);
        }
    });

    //게임 그려줌
    function animate(timeStamp){  //requestAnimationFrame 에 의해 생성되는 timeStamp
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;   //lasttime: 이 전 프레임이 실행된 시간
        //timestamp : 현재 프레임 시간
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        if(!game.gameOver) {
            animationId = requestAnimationFrame(animate);
        } else {
            showGameOverMenu();
        }
    }
    // 초기 화면 설정
    canvas.style.display = 'none';
    startMenu.style.display = 'block';
    // animate(0);
});