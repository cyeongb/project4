// 상태값 위한 ENUM 정의

const states = {
    SITTING : 0,
    RUNNING : 1,
    JUMPING : 2,
    FALLING : 3,
};

//super
class State{
    constructor(state){
        this.state = state;
    };
};

//동적 state 구현 위한 상속
export class Sitting extends State {
    constructor(player) {
        super('SITTING');
        this.player = player;
    };

    enter(){
        this.player.frameX = 0;
        this.player.maxFrame = 4;
        this.player.frameY = 5;
    };

    handleInput(input){  //앉아 있을 때, 방향키 누르면 달림
       if(input.includes('ArrowLeft') || input.includes('ArrowRight')){
        this.player.setState(states.RUNNING,2);
       }
    };
};

export class Running extends State {
    constructor(player) {
        super('RUNNING');
        this.player = player;
    };

    enter(){
        this.player.frameX = 0;
        this.player.maxFrame = 8;
        this.player.frameY = 3;
    };

    handleInput(input){ 
       if(input.includes('ArrowDown')){ //달릴 때 ARROW DOWN 누르면 앉음
        this.player.setState(states.SITTING,0);
       }else if(input.includes('ArrowUp')){ //달릴 때 ARROW UP 누르면 뒴
        this.player.setState(states.JUMPING,1);
       }
    };
};

export class Jumping extends State {
    constructor(player) {
        super('JUMPING');
        this.player = player;
    };

    enter(){
        this.player.maxFrame = 6;
        if(this.player.onGround()){
            this.player.vy -= 22;
        }
        this.player.frameX = 0;
        this.player.frameY = 1;
    };

    handleInput(input){ // 뛴 후 내려올 때
       if(this.player.vy > this.player.weight){
        this.player.setState(states.FALLING,1);
       }
    };
};

export class Falling extends State {
    constructor(player) {
        super('FALLING');
        this.player = player;
    }

    enter(){
        this.player.frameX = 0;
        this.player.maxFrame = 6;
        this.player.frameY = 2;
    };

    handleInput(input){  //내려온 후 달림 상태로 전환
       if(this.player.onGround()){
        this.player.setState(states.RUNNING,2);
       }
    };
};