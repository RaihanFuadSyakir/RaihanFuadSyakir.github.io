import { initPosGround, updateGround } from "./ground.js";
import { initPosDino, updateDino, getDinoRects, setDinoLose } from "./dino.js";
import { initPosCactus, updateCactus, getCactusRects } from "./cactus.js";

const SCREEN_WIDTH = 100;
const SCREEN_HEIGHT = 30;
const ACCELERATION = .00001;

const worldScreen = document.querySelector('[data-world]');
const startScreen = document.querySelector('[data-start]');
const gameScore = document.querySelector('[data-score]');
window.addEventListener("resize", setPixelToScreenScale);
document.addEventListener("keydown",handleStart,{once : true})

let currentSpeed;
let t1;
let score;


setPixelToScreenScale();

function handleStart(){
    //before game started
    t1 = null;
    currentSpeed = 1;
    score = 0;
    startScreen.classList.add("hide");
    initPosGround();
    initPosDino();
    initPosCactus();
    window.requestAnimationFrame(update)
}

function update(time){
    //first time running delta will always big because started from runtime web
    if(t1 == null){
        t1 = time;
        window.requestAnimationFrame(update);
        return;      
    }
    const deltaTime = time - t1
    updateGround(deltaTime,currentSpeed);
    updateDino(deltaTime,currentSpeed);
    updateCactus(deltaTime,currentSpeed);
    updateSpeed(deltaTime);
    updateScore(deltaTime);
    if(isLose()){return handleLose()}
    t1 = time
    window.requestAnimationFrame(update);
}
function updateSpeed(deltaTime){
    currentSpeed += (deltaTime * ACCELERATION);
}
function updateScore(deltaTime){
    score += (deltaTime * .05);
    gameScore.innerText = Math.floor(score);
}

function isLose(){
    const dinoRect = getDinoRects();
    return getCactusRects().some(cactus =>{
        return isCollision(cactus,dinoRect)
    })
}
function isCollision(cactusRect,dinoRect){
    return (
        cactusRect.left < dinoRect.right &&
        cactusRect.top < dinoRect.bottom &&
        cactusRect.right > dinoRect.left &&
        cactusRect.bottom > dinoRect.top
    )
}

function handleLose(){
    setDinoLose();
    //not accidentally instant restart game after lose
    setTimeout(() =>{
        document.addEventListener("keydown",handleStart,{once : true});
        startScreen.classList.remove("hide");
    },100)
}

function setPixelToScreenScale(){
    let screenScale;
    if((window.innerWidth / window.innerHeight) < SCREEN_WIDTH / SCREEN_HEIGHT){
        screenScale = window.innerWidth / SCREEN_WIDTH;
    }
    else{
        screenScale = window.innerHeight / SCREEN_HEIGHT;
    }
    worldScreen.style.width = `${SCREEN_WIDTH * screenScale}px`
    worldScreen.style.height = `${SCREEN_HEIGHT * screenScale}px`
}