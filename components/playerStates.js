import { Dust, Fire, Splash } from './particles.js'


// 상태값 위한 ENUM 정의

const states = {
    SITTING : 0,  //앉기
    RUNNING : 1,  //달리기
    JUMPING : 2,  //점프
    FALLING : 3,  //점프 후 떨어짐
    ROLLING : 4,  //구르기
    DIVING : 5,  //치기(장애물 부수기)
    HIT : 6,   // 부딪힘
};

//super
class State{
    constructor(state , game){
        this.state = state;
        this.game = game;
    };
};

//동적 state 구현 위한 상속
export class Sitting extends State {
    constructor(game) {
        super('SITTING',game);
    };

    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 4;
        this.game.player.frameY = 5;
    };

    handleInput(input){  //앉아 있을 때, 방향키 누르면 달림
       if(input.includes('ArrowLeft') || input.includes('ArrowRight')){
        this.game.player.setState(states.RUNNING,1.5);
       }else if(input.includes('Control')){
        this.game.player.setState(states.ROLLING,2);
       }
    };
};

export class Running extends State {
    constructor(game) {
        super('RUNNING',game);
    };

    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 8;
        this.game.player.frameY = 3;
    };

    handleInput(input){ 
        this.game.particles.unshift(new Dust(
            this.game, this.game.player.x + this.game.player.width * 0.6,
            this.game.player.y + this.game.player.height));

       if(input.includes('ArrowDown')){ //달릴 때 ARROW DOWN 누르면 앉음
        this.game.player.setState(states.SITTING,0);
       }else if(input.includes('ArrowUp')){ //달릴 때 ARROW UP 누르면 jump
        this.game.player.setState(states.JUMPING,1);
       }else if(input.includes('Control')){
        this.game.player.setState(states.ROLLING,2);
       }
    };
};

export class Jumping extends State {
    constructor(game) {
        super('JUMPING',game);
    };

    enter(){
        this.game.player.maxFrame = 6;
        if(this.game.player.onGround()){
            this.game.player.vy -= 22;
        }
        this.game.player.frameX = 0;
        this.game.player.frameY = 1;
    };

    handleInput(input){ // 뛴 후 내려올 때
       if(this.game.player.vy > this.game.player.weight){
        this.game.player.setState(states.FALLING, 1);
       }else if(input.includes('Control')){
        this.game.player.setState(states.ROLLING, 2);
       }else if(input.includes('ArrowDown')){
        this.game.player.setState(states.DIVING , 0);
       }
    };
};

export class Falling extends State {
    constructor(game) {
        super('FALLING',game);
    }

    enter(){
        this.game.player.maxFrame = 6;
        this.game.player.frameX = 0;
        this.game.player.frameY = 2;
        this.game.player.vy = 15;
    };

    handleInput(input){  //내려온 후 달림 상태로 전환
       if(this.game.player.onGround()){
        this.game.player.setState(states.RUNNING,1.5);
       }else if(input.includes('ArrowDown')){
        this.game.player.setState(states.DIVING , 0);
       }
    };
};

export class Rolling extends State {
    constructor(game) {
        super('ROLLING',game);
    }

    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 6;
    };

    handleInput(input){  //내려온 후 달림 상태로 전환
        this.game.particles.unshift(new Fire(
            this.game, this.game.player.x + this.game.player.width * 0.5,
            this.game.player.y + this.game.player.height * 0.6));

       if(!input.includes('Control') && this.game.player.onGround()){
        this.game.player.setState(states.RUNNING,1.5);
       }else if(!input.includes('Control') && !this.game.player.onGround()){
        this.game.player.setState(states.FALLING,1);
       }else if(input.includes('Control') && input.includes('ArrowUp') && this.game.player.onGround()){
        this.game.player.vy -= 24;
       }else if(input.includes('ArrowDown') && !this.game.player.onGround()){
        this.game.player.setState(states.DIVING , 0);
       }
    };
};

export class Diving extends State {
    constructor(game) {
        super('DIVING',game);
    }

    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 6;
        this.game.player.vy = 15;
    };

    handleInput(input){  //내려온 후 달림 상태로 전환
        this.game.particles.unshift(new Fire(
            this.game, this.game.player.x + this.game.player.width * 0.5,
            this.game.player.y + this.game.player.height * 0.6));

       if(this.game.player.onGround()){
        this.game.player.setState(states.RUNNING,1.5);
        for(let i= 0; i< 30; i++){
            this.game.particles.unshift(new Splash(this.game, this.game.player.x + this.game.player.width * 0.5,
                 this.game.player.y + this.game.player.height));
        }
       }else if(input.includes('Control') && !this.game.player.onGround()){
        this.game.player.setState(states.ROLLING,2);
       }
    };
};

export class Hit extends State {
    constructor(game) {
        super('HIT',game);
    }

    enter(){
        this.game.player.maxFrame = 10;
        this.game.player.frameX = 0;
        this.game.player.frameY = 4;
    };

    handleInput(input){  //내려온 후 달림 상태로 전환
       if(this.game.player.frameX >= 10 && this.game.player.onGround() ){
        this.game.player.setState(states.RUNNING,1.5);
       }else if(this.game.player.frameX >= 10 && !this.game.player.onGround()){
        this.game.player.setState(states.FALLING,1);
       }
    };
};