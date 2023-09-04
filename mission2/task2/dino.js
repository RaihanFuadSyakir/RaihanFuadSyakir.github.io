import { getStyleProperty, incrementStyleProperty, setStyleProperty } from "./modify_CSS_Property.js";

const dino = document.querySelector("[data-dino]");
const JUMP_SPEED = .48;
const GRAVITY = .002;
//consist of 2 frame dino
const DINO_FRAME_LIMIT = 2;
//each frame 100ms
const FRAME_TIME = 100;

let isJumping;
let dinoFrame;
let currentFrameTime;
let yVelocity;

export function initPosDino(){
    isJumping = false;
    dinoFrame = 0;
    currentFrameTime = 0;
    yVelocity = 0;
    setStyleProperty(dino, "--bottom", 0);
    document.removeEventListener("keydown",onJump);
    document.addEventListener("keydown",onJump);
}
export function setDinoLose(){
    dino.src = `./images/dino-lose.png`
}
export function updateDino(deltaTime,speedAcc){
    handleRun(deltaTime,speedAcc);
    handleJump(deltaTime);
}
export function getDinoRects(){
    return dino.getBoundingClientRect();
}
function handleRun(deltaTime,speedAcc){
    if(isJumping){
        dino.src = `./images/dino-stationary.png`
        return;
    }
    if(currentFrameTime >= FRAME_TIME){
        dinoFrame = (dinoFrame + 1) % DINO_FRAME_LIMIT;
        dino.src = `./images/dino-run-${dinoFrame}.png`
        currentFrameTime -= FRAME_TIME;
    }
    currentFrameTime += deltaTime * speedAcc;
}
function handleJump(deltaTime){
    if(!isJumping){return}
    
    incrementStyleProperty(dino, "--bottom", yVelocity * deltaTime);
    if(getStyleProperty(dino, "--bottom") <= 0){
        setStyleProperty(dino, "--bottom",0);
        isJumping = false;
    }
    yVelocity -= GRAVITY * deltaTime;
}

function onJump(e){
    if(e.code !== "Space" || isJumping){return};
    yVelocity = JUMP_SPEED;
    isJumping = true;
}