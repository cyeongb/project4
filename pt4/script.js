const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 500);
const CANVAS_HEIGHT = (canvas.height = 700);

//canvas DOMRect  객체의 정보(bottom,height,left,right,top,width,x,y)
let canvasPosition = canvas.getBoundingClientRect();
console.log("canvasPosition=>",canvasPosition);

const explosions = [];

ctx.fillStyle = 'white';
ctx.fillRect(50,50,100,150);

class Explosion{
    constructor(x,y){
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.7;
        this.height = this.spriteHeight * 0.7;
        this.x =x- this.width;
        this.y = y-this.height;
        this.image = new Image();
        this.image.src = '../assets/boom.png';
        this.frame = 0;
        this.timer = 0;
        this.angle = Math.random() * 6.2;
    }

    update(){
        this.timer++;
        if(this.timer %10 === 0){ this.frame++; };

    }

    draw(){ // s: 스프라이트 d: 목적지
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(this.angle)
        ctx.drawImage(this.image,this.spriteWidth * this.frame,0,this.spriteWidth,this.spriteHeight,
            this.x,this.y,this.width,this.height);
        ctx.restore();
    }
}

// e.x-canvasPosition.left -25 , e.y -canvasPosition.top-25 
// => 클릭한 지점에 rect 나타남.

window.addEventListener("click",(e)=>{
    createAnimation(e);
});

// window.addEventListener("mousemove",(e)=>{
//     createAnimation(e);
// });

function createAnimation(e){
    let positionX = e.x-canvasPosition.left;
    let positionY = e.y -canvasPosition.top;

    explosions.push(new Explosion(positionX,positionY));
    console.log("explosions[]=>",explosions);
}


function animate(){
    ctx.clearRect(0,0,canvas.width , canvas.height);

    for(let i=0;i<explosions.length;i++){
        explosions[i].update();
        explosions[i].draw();

        if(explosions[i].frame >5){
            explosions.splice(i,1);
            i--;
        }
    }
    requestAnimationFrame(animate);
};

animate();



//2:45:19








