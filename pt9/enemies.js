class Ememy {
    constructor() {
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
    };

    updateEnemy(deltaTime){
        this.x += this.speedX;
        this.y += this.speedY;

        if(this.frameTimer > this.frameInterval){
            this.frameTimer = 0;

            if(this.frameX < this.maxFrame){
                this.frameX ++;
            }else{
                this.frameX = 0;
            }
        }else{
            this.frameTimer += deltaTime;
        }
    };

    drawEnemy(context){
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height,
            this.x, this.y, this.width, this.height );

    };
};

class FlyEnemy extends Ememy{
    constructor(game){
        super();
        this.game = game;
        this.wdith = 60;
        this.height = 44;
        this.x = 200;
        this.y = 200;
        this.speedX = 2;
        this.maxFrame = 5;
        this.image = document.getElementById('enemy_fly');
    };

    updateFlyEnemy(){

    };

    drawFlyEnemy(){

    };
};

class GroundEnemy extends Ememy{
    constructor(){

    };

    updateGroundEnemy(){

    };

    drawGroundEnemy(){
        
    };
};

class ClimbEnemy extends Ememy{
    constructor(){

    };

    updateClimbEnemy(){

    };

    drawClimbEnemy(){
        
    };
};