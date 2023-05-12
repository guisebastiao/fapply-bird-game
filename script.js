const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
const canvasW = canvas.width;
const canvasH = canvas.height;
let frameTime = 10;
let timePipes = 0;
let gravidade = 10;
let frames = 0;
let framesInicio = 0;
let jump = false;
let pipesPosX_1 = 0 - 30;
let pipesPosX_2 = 0 - 30;
let random_1 = 7;
let random_2 = 23;
let larguraDosTubos = 40;
let ponto = new Audio('audio/efeitos_ponto.wav');
let pulo = new Audio('audio/efeitos_pulo.wav');
let hit = new Audio('audio/efeitos_hit.wav');
const sprite = new Image();
sprite.src = 'img/sprites.png';
let gameLoop = false;
let game, gameLobby;
let pontos = 0;
let textVisible = true;
let font = new FontFace('VT323', 'url(font/VT323.ttf)')

function background(){
    let imageX = 390;
    let imageY = 0;
    let imageW = 276;
    let imageH = 204;
    let tamX = 143;
    let tamY = 102;
    let posX = 0;
    let posY = canvasH - tamY;

    ctx.drawImage(sprite, imageX, imageY, imageW, imageH, posX, posY, tamX, tamY);
    ctx.drawImage(sprite, imageX, imageY, imageW, imageH, posX + tamX, posY, tamX, tamY);
    ctx.drawImage(sprite, imageX, imageY, imageW, imageH, posX + tamX * 2, posY, tamX, tamY);
    ctx.drawImage(sprite, imageX, imageY, imageW, imageH, posX + tamX * 3, posY, tamX, tamY);
}

function floor(){
    let imageX = 0;
    let imageY = 610;
    let imageW = 224;
    let imageH = 112;
    let tamX = 112;
    let tamY = 56;
    let posX = 0;
    let posY = canvasH - tamY;

    ctx.drawImage(sprite, imageX, imageY, imageW, imageH, posX, posY, tamX, tamY);
    ctx.drawImage(sprite, imageX, imageY, imageW, imageH, posX + tamX, posY, tamX, tamY);
    ctx.drawImage(sprite, imageX, imageY, imageW, imageH, posX + tamX * 2, posY, tamX, tamY);
    ctx.drawImage(sprite, imageX, imageY, imageW, imageH, posX + tamX * 3, posY, tamX, tamY);
    ctx.drawImage(sprite, imageX, imageY, imageW, imageH, posX + tamX * 4, posY, tamX, tamY);
}

function bird(){
    let imageX = 0;
    let imageY = 0;
    let imageW = 34;
    let imageH = 25;
    let tamX = 34;
    let tamY = 25;
    let posX = 20;
    let posY = 50;
        
    
    frames++

    gravidade += 2;
        
    if(jump === true){
        gravidade -= 7;
        
        setTimeout(() => { jump = false; }, 80)
    }
        
    frames > 2 ? frames = 0 : 'err';

    ctx.drawImage(sprite, imageX, imageY + imageH * frames, imageW, imageH, posX, posY + gravidade, tamX, tamY);
}

function pipes1(){
    let pipeBottomImageX = 0;
    let pipeBottomImageY = 169;
    let pipeBottomImageW = 52;
    let pipeBottomImageH = 400;
    let pipeBottomTamX = 40;
    let pipeBottomTamY = 160 - random_1;
    let pipeBottomPosX = canvasW - pipeBottomTamX - pipesPosX_1;
    let pipeBottomPosY = canvasH - pipeBottomTamY + larguraDosTubos;

    let pipeTopImageX = 52;
    let pipeTopImageY = 169;
    let pipeTopImageW = 52;
    let pipeTopImageH = 400;
    let pipeTopTamX = 40;
    let pipeTopTamY = 160;
    let pipeTopPosX = canvasW - pipeTopTamX - pipesPosX_1;
    let pipeTopPosY = 0 + random_1 - larguraDosTubos;

    pipesPosX_1 += 2;

    ctx.drawImage(sprite, pipeBottomImageX, pipeBottomImageY, pipeBottomImageW, pipeBottomImageH, pipeBottomPosX, pipeBottomPosY, pipeBottomTamX, pipeBottomTamY);
    ctx.drawImage(sprite, pipeTopImageX, pipeTopImageY, pipeTopImageW, pipeTopImageH, pipeTopPosX, pipeTopPosY, pipeTopTamX, pipeTopTamY);

    if(pipesPosX_1 >= canvasW + 28){
        pipesPosX_1 = 0;
        random_1 = Math.floor(Math.random() * (30 - 0) + 0);
    }
}

function pipes2(){
    let pipeBottomImageX = 0;
    let pipeBottomImageY = 169;
    let pipeBottomImageW = 52;
    let pipeBottomImageH = 400;
    let pipeBottomTamX = 40;
    let pipeBottomTamY = 160 + random_2;
    let pipeBottomPosX = canvasW - pipeBottomTamX - pipesPosX_2;
    let pipeBottomPosY = canvasH - pipeBottomTamY + larguraDosTubos;

    let pipeTopImageX = 52;
    let pipeTopImageY = 169;
    let pipeTopImageW = 52;
    let pipeTopImageH = 400;
    let pipeTopTamX = 40;
    let pipeTopTamY = 160;
    let pipeTopPosX = canvasW - pipeTopTamX - pipesPosX_2;
    let pipeTopPosY = 0 - random_2 - larguraDosTubos;

    pipesPosX_2 += 2;

    ctx.drawImage(sprite, pipeBottomImageX, pipeBottomImageY, pipeBottomImageW, pipeBottomImageH, pipeBottomPosX, pipeBottomPosY, pipeBottomTamX, pipeBottomTamY);
    ctx.drawImage(sprite, pipeTopImageX, pipeTopImageY, pipeTopImageW, pipeTopImageH, pipeTopPosX, pipeTopPosY, pipeTopTamX, pipeTopTamY);

    if(pipesPosX_2 >= canvasW + 28){
        pipesPosX_2 = 0;
        random_2 = Math.floor(Math.random() * (30 - 0) + 0);
    }
}

function colisao(){
    let birdY = 50 + gravidade;
    let birdPosY_top = 50 + gravidade;   
    let birdPosY_bottom = 50 + gravidade + 25;   
    let pipe_1_Top_PosY = 160 - random_1 - larguraDosTubos;
    let pipe_1_bottom_PosY = 160 + random_1 + larguraDosTubos;
    let pipe_2_Top_PosY = 160 - random_2 - larguraDosTubos;
    let pipe_2_bottom_PosY = 160 + random_2 + larguraDosTubos;

    if(pipesPosX_1 >= 420 && pipesPosX_1 <= 490){
        if(birdPosY_top <= pipe_1_Top_PosY || birdPosY_bottom >= pipe_1_bottom_PosY){
            colidido();
        }
    }

    if(pipesPosX_2 >= 420 && pipesPosX_2 <= 490){
        if(birdPosY_top <= pipe_2_Top_PosY || birdPosY_bottom >= pipe_2_bottom_PosY){
            colidido();
        }
    }

    if(birdY >= canvasH - 25 - 56 || birdY <= 0){
        colidido();
    }
}

function colidido(){
    gameLoop = false;
    hit.play();
    gameOver();
}

function pontuacao(){
    if(pipesPosX_1 === 470 || pipesPosX_2 === 470){
        pontos++

        if(localStorage.getItem('high-score') < pontos){
            localStorage.setItem('high-score', pontos);
        }

        ponto.play();
    }

    if(textVisible === true){
        font.load().then((font) => {
            ctx.font = `30px ${font}`;
            ctx.fillStyle = '#fff';
            ctx.textAlign = 'right';
            ctx.fillText(`Score: ${pontos}`, canvasW -50, 50);
        });
    } else {
        ctx.fillStyle = '#ffffff00'
        ctx.fillText(`Score: ${pontos}`, canvasW - 140, 50);
    }

}

function draw(){
    timePipes++
    ctx.clearRect(0, 0, canvasW, canvasH);
    ctx.fillStyle = '#70c5ce';
    ctx.fillRect(0, 0, canvasW, canvasH);
    background();              
    floor();
    bird();
    pipes1();

    if(timePipes >= 140){
        pipes2();
    }

    colisao();
    pontuacao();
}

function funcaoGameLoop(){
    draw();

    if(gameLoop === false){
        clearInterval(game);
    }
}

document.addEventListener('keyup', (event) => {
    if(event.keyCode === 32){
        jumpFuncao();
    }
});

document.addEventListener('click', () => {
    jumpFuncao()
})

function jumpFuncao(){
    jump = true;
    
    if(gameLoop === false){
        pulo.pause();
    } else {
        pulo.play();
    }
}

function inicio(){
    ctx.clearRect(0, 0, canvasW, canvasH);
    ctx.fillStyle = '#70c5ce';
    ctx.fillRect(0, 0, canvasW, canvasH);

    function image(){
        let imageX = 134;
        let imageY = 0;
        let imageW = 174;
        let imageH = 152;
        let tamX = 174;
        let tamY = 152;
        let posX = 163;
        let posY = 84;

        ctx.drawImage(sprite, imageX, imageY, imageW, imageH, posX, posY, tamX, tamY);
    }

    function bird(){
        let imageX = 0;
        let imageY = 0;
        let imageW = 34;
        let imageH = 25;
        let tamX = 34;
        let tamY = 25;
        let posX = 20;
        let posY = 50;
        
        framesInicio++
        framesInicio > 2 ? framesInicio = 0 : 'err';
        ctx.drawImage(sprite, imageX, imageY + imageH * framesInicio, imageW, imageH, posX, posY + gravidade, tamX, tamY);
    }

    function background(){
        let imageX = 390;
        let imageY = 0;
        let imageW = 276;
        let imageH = 204;
        let tamX = 143;
        let tamY = 102;
        let posX = 0;
        let posY = canvasH - tamY;
    
        ctx.drawImage(sprite, imageX, imageY, imageW, imageH, posX, posY, tamX, tamY);
        ctx.drawImage(sprite, imageX, imageY, imageW, imageH, posX + tamX, posY, tamX, tamY);
        ctx.drawImage(sprite, imageX, imageY, imageW, imageH, posX + tamX * 2, posY, tamX, tamY);
        ctx.drawImage(sprite, imageX, imageY, imageW, imageH, posX + tamX * 3, posY, tamX, tamY);
    }
    
    function floor(){
        let imageX = 0;
        let imageY = 610;
        let imageW = 224;
        let imageH = 112;
        let tamX = 112;
        let tamY = 56;
        let posX = 0;
        let posY = canvasH - tamY;
    
        ctx.drawImage(sprite, imageX, imageY, imageW, imageH, posX, posY, tamX, tamY);
        ctx.drawImage(sprite, imageX, imageY, imageW, imageH, posX + tamX, posY, tamX, tamY);
        ctx.drawImage(sprite, imageX, imageY, imageW, imageH, posX + tamX * 2, posY, tamX, tamY);
        ctx.drawImage(sprite, imageX, imageY, imageW, imageH, posX + tamX * 3, posY, tamX, tamY);
        ctx.drawImage(sprite, imageX, imageY, imageW, imageH, posX + tamX * 4, posY, tamX, tamY);
    }

    background();
    floor();
    image();
    bird();
}

gameLobby = setInterval(() => { inicio(); }, 90);

document.addEventListener('click', jogo)

function jogo(){
    gameLoop = true;
    clearInterval(gameLobby)
    game = setInterval(() => {funcaoGameLoop()}, frameTime);
    document.removeEventListener('click', jogo);
}

function gameOver(){
    function telaGameOver(){
        let imageX = 134;
        let imageY = 153;
        let imageW = 226;
        let imageH = 200;
        let tamX = 226;
        let tamY = 200;
        let posX = 137;
        let posY = 60;

        ctx.drawImage(sprite, imageX, imageY, imageW, imageH, posX, posY, tamX, tamY);
    } 

    function medal_1(){
        let imageX = 0;
        let imageY = 78;
        let imageW = 44;
        let imageH = 44;
        let tamX = 44;
        let tamY = 44;
        let posX = 163;
        let posY = 146;

        ctx.drawImage(sprite, imageX, imageY, imageW, imageH, posX, posY, tamX, tamY);
    }

    function medal_2(){
        let imageX = 49;
        let imageY = 78;
        let imageW = 44;
        let imageH = 44;
        let tamX = 44;
        let tamY = 44;
        let posX = 163;
        let posY = 146;

        ctx.drawImage(sprite, imageX, imageY, imageW, imageH, posX, posY, tamX, tamY);
    }

    function medal_3(){
        let imageX = 0;
        let imageY = 124;
        let imageW = 44;
        let imageH = 44;
        let tamX = 44;
        let tamY = 44;
        let posX = 163;
        let posY = 146;

        ctx.drawImage(sprite, imageX, imageY, imageW, imageH, posX, posY, tamX, tamY);
    }

    function medal_4(){
        let imageX = 48;
        let imageY = 124;
        let imageW = 44;
        let imageH = 44;
        let tamX = 44;
        let tamY = 44;
        let posX = 163;
        let posY = 146;

        ctx.drawImage(sprite, imageX, imageY, imageW, imageH, posX, posY, tamX, tamY);
    }

    telaGameOver();
    textVisible = false;

    font.load().then((font) => {
        ctx.font = `24px ${font}`;
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center'
        ctx.fillText(`${pontos}`, 320, 150);

        ctx.font = `24px ${font}`;
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center'
        ctx.fillText(`${localStorage.getItem('high-score')}`, 322, 190);
    });

    if(pontos >= 0 && pontos < 20){
        medal_1();
    } else if(pontos >= 20 && pontos < 40){
        medal_2();
    } else if(pontos >= 40 && pontos < 60){
        medal_3();
    } else if(pontos >= 60){
        medal_4();
    }

    document.addEventListener('click', () => {
        window.location.reload();
    });
}

inicio();