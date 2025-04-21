class Particle{
    constructor(game) {
        this.game = game;
        this.markedForDeletion = false;

    };

    updateParticles(){
        this.x -= this.speedX + this.game.speed;
        this.y -= this.speedY;
        this.size *= 0.95;

        if(this.size < 0.5){
            this.markedForDeletion = true;
        }
    };

    drawParticle(context){

    };
};

//먼지(강쥐 달릴 때 먼지 튀는거..)
export class Dust extends Particle{
    constructor(game, x, y){
        super(game);
        this.size = Math.random() * 10 + 10;
        this.x = x;
        this.y = y;
        this.speedX = Math.random();
        this.speedY = Math.random();
        this.color = 'rgba(0,0,0,0.2)';
    };

    drawParticle(context){
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
    }

};

//물 튀김
export class Splash extends Particle{
    constructor(game, x, y){
        super(game);

    };

    drawParticle(context){

    }

};

//불효과
export class Fire extends Particle{
    constructor(game, x, y){
        super(game);

    };

    drawParticle(context){
        
    }

};
// record 8:48:15