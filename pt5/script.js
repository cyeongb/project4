const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
// const CANVAS_WIDTH = (canvas.width = 500);
// const CANVAS_HEIGHT = (canvas.height = 700);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const explisions = [];

let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;


let ravens = [];
class Raven{
    constructor(){
        this.width = 100;
        this.height = 50;
        this.x = canvas.width;
        this.y = Math.random()* canvas.height - this.height;
        this.directionX = Math.random()*5+3;
        this.directionY = Math.random()*5-2.5;
        this.markedForDelete = false;
    }

    update(){
        this.x -= this.directionX;
        if(this.x <0 -this.width){
            this.markedForDelete = true;
        }
        
    }

    draw(){
        ctx.fillRect(this.x ,this.y,this.width,this.height);
    }
};

const raven = new Raven();



function animate(timeStamp){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    timeToNextRaven += deltaTime;

    if(timeToNextRaven>ravenInterval){
        ravens.push(new Raven());
        timeToNextRaven = 0;
    };
    [...ravens].forEach(obj => obj.update());
    [...ravens].forEach(obj => obj.draw());
    ravens = ravens.filter(obj => !obj.markedForDelete); //?
    requestAnimationFrame(animate);
    //3:07:58
}

animate(0);







