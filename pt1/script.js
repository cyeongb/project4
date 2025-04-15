let playerState = 'idle'; // 첫 화면 플레이어 상태 
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change',function(e){
    playerState = e.target.value;
});

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d'); // 캔버스 가져옴
const CANVAS_WIDTH= canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = '../assets/shadow_dog.png';

// 전체 스프라이트 너비를 가져와서 계산하여 이미지 도출.
//width: 6876px / 12 = 573 , height: 5230/10 = 523
const spriteWidth = 575;
const spriteHeight= 523;
// 스프라이트 이미지 위치

let gameFrame = 0;


const staggerFrames = 5; // 움직임 frame 수
const spriteAnimations=[];
// sprite 이미지를 name, frames로 제어하기 위함.
const animationStates=[
    {
        name:'idle',
        frames:7,
    },
    {
        name:'jump',
        frames:7,
    },
    {
        name:'fall',
        frames:7,
    },
    {
        name:'run',
        frames:9,
    },
    {
        name:'dizzy',
        frames:11,
    },
    {
        name:'sit',
        frames:5,
    },
    {
        name:'roll',
        frames:7,
    },
    {
        name:'bite',
        frames:7,
    },
    {
        name:'ko',
        frames:12,
    },
    {
        name:'gethit',
        frames:4,
    }
];

animationStates.forEach((state,i)=>{
    let frames = {
        loc:[],
    }
    for(let j=0;j<state.frames;j++){
        let positionX = j * spriteWidth;
        let positionY = i * spriteHeight;
        frames.loc.push({x:positionX, y:positionY});
    }
    spriteAnimations[state.name] = frames;
});
console.log("animationStates=>",animationStates);


function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length; //0..1..2..3..4..0..
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;
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

//스프라이트 이미지를 나타냄 for loop으로 구현.
// spriteAnimations = [
//     "idle"={
//         loc:[
//             {x:0,y:0},
//             {x:575,y:0},
//             {x:1150,y:0},
//             {x:1725,y:0},
//             {x:2300,y:0},
//             {x:2875,y:0},
//             {x:3450,y:0}
//         ]
//     },
//     "jump"={
//         width:120,
//         height:120,
//         loc:[]
//     },
//     "run"={
//         width:1200,
//         height:1250,
//         loc:[]

//     }
// ];







