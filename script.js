const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d'); // 캔버스 가져옴
const CANVAS_WIDTH= canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = './assets/shadow_dog.png';

// 전체 스프라이트 너비를 가져와서 계산하여 이미지 도출.
//width: 6876px / 12 = 573 , height: 5230/10 = 523
const spriteWidth = 575;
const spriteHeight= 523;
// 스프라이트 이미지 위치
let frameX = 0;
let frameY = 0;
let gameFrame = 0;
const staggerFrames = 5; // 움직임 frame 수


function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    let position = Math.floor(gameFrame / staggerFrames)%6; //0..1..2..3..4..0..
    frameX = spriteWidth * position;
    // frameY = spriteHeight * position;
    ctx.drawImage(playerImage,frameX,frameY,spriteWidth,spriteHeight,
        0,0,spriteWidth,spriteHeight);

    // if(gameFrame %staggerFrames ==0){
    //     if(frameX <6){ frameX++;}else{frameX=0;}
    // }
        //,,27:35
    gameFrame++;
    requestAnimationFrame(animate); //재귀호출
};

animate();










