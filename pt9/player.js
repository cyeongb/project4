import { Sitting , Running , Jumping , Falling , Rolling , Diving , Hit } from './playerStates.js'

// 플레이어 정의
export class Player{
    constructor(game){
        console.log("game =>> ",game);
        this.game = game;
        this.width = 100;
        this.height = 91.3;

        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.vy = 0;
        this.weight = 0.6; // y축으로 뛸 때 무게감을 주기위함

        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame;  //이미지 스프라이트의 max 프레임
        this.fps = 60;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;

        this.speed = 0;
        this.maxSpeed = 3;

        this.states = [new Sitting(this.game), new Running(this.game) , new Jumping(this.game), 
            new Falling(this.game), new Rolling(this.game), new Diving(this.game), new Hit(this.game)];
        // this.currentState = this.states[0];
        // this.currentState.enter();

        this.score = 0;
    }

    playerUpdate(input, deltaTime){

        this.checkCollision();  //충돌검사

        //현재 상태값
        this.currentState.handleInput(input);

        //x 좌표 움직임 구현
        this.x += this.speed;
        if(input.includes('ArrowRight')){ 
            this.speed = this.maxSpeed+1;  //앞으로 갈 때
        }else if(input.includes('ArrowLeft')){ 
            this.speed = -this.maxSpeed;  //뒤로 갈 때때
        }else{
            this.speed = 0;}

        if(this.x <0){ 
            this.x = 0; }

        if(this.x > this.game.width - this.width){
            this.x = this.game.width - this.width;
        }

        //y좌표 움직임 구현
        this.y += this.vy;
        if(!this.onGround()){
            this.vy += this.weight; // 땅으로 내려옴
        }else{
            this.vy = 0;
        }

        if(this.y > this.game.height - this.height - this.game.groundMargin){
            this.y = this.game.height - this.height - this.game.groundMargin;
        }

        //스프라이트 이미지
        if(this.frameTimer > this.frameInterval){
            this.frameTimer = 0;

            if(this.frameX < this.maxFrame){
                this.frameX++;
            }else{
                this.frameX = 0;
            }
        }else{
            this.frameTimer += deltaTime;
        }
    }

    playerDraw(context){
        if(this.game.debug){ //debug 모드일 때 테스트용 히트박스 그림
            context.strokeRect(this.x , this.y, this.width , this.height);
        }
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, 
            this.x, this.y, this.width, this.height);
    }

    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }

    setState(state, speed){
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }

    //player와 적이 충돌 하는 상태 체크
    checkCollision(){
        this.game.enemies.forEach(enemy => {
            if(enemy.x < this.x + this.width && 
               enemy.x + enemy.width > this.x &&
               enemy.y < this.y + this.height &&
               enemy.y + enemy.height > this.y
            ){
               //닿으면 없어진다.
               enemy.markedForDeletion = true;
               this.game.score ++;
            }else{
                // 충돌 x
            }
        })
    }
}
