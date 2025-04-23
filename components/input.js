export class InputHandler{
    constructor(game){
        this.game = game;
        this.keys = [];
        window.addEventListener('keydown', e => {
             console.log("e.key??=> ",e.key);
            if((e.key === 'ArrowDown' || 
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === 'Control' ||
                e.key === 'z'
            ) 
                && this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);
            }else if(e.key === 'd'){  //d 누르면 디버그모드 실행..테스트용
                this.game.debug = !this.game.debug;
            }
        });

        window.addEventListener('keyup', e =>{
            if(e.key === 'ArrowDown' || 
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === 'Control' ||
                e.key === 'z'
            ){
                this.keys.splice(this.keys.indexOf(e.key) , 1);
            }
        });
    }
}