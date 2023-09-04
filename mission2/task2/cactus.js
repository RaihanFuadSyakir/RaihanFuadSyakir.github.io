import { SPEED } from "./ground.js";
import { getStyleProperty, incrementStyleProperty, setStyleProperty } from "./modify_CSS_Property.js";

const CACTUS_MIN_INTERVAL = 500
const CACTUS_MAX_INTERVAL = 2000


let nextCactusTime;
const screen = document.querySelector("[data-world]");


export function initPosCactus(){
    nextCactusTime = CACTUS_MIN_INTERVAL;
    document.querySelectorAll("[data-cactus]").forEach(cactus =>{
        cactus.remove();
    })
}
export function updateCactus(deltaTime,speedAcc){
    document.querySelectorAll("[data-cactus]").forEach(cactus =>{
        incrementStyleProperty(cactus, "--left", deltaTime * speedAcc * SPEED * -1);
        if(getStyleProperty(cactus,"--left") <= -100){
            cactus.remove();
        }
    })

    if(nextCactusTime <= 0){
        spawnCactus();
        nextCactusTime = randomNumberBetween(CACTUS_MIN_INTERVAL,
            CACTUS_MAX_INTERVAL) / speedAcc;
    }
    nextCactusTime -= deltaTime;
}
export function getCactusRects(){
    return [...document.querySelectorAll("[data-cactus]")].map(cactus =>{
        return cactus.getBoundingClientRect();
    })
}
function randomNumberBetween(min,max){
    return Math.floor(Math.random() * (max-min+1) + min);
}
function spawnCactus(){
    const newCactus = document.createElement("img");
    newCactus.dataset.cactus = true;
    newCactus.src = "./images/cactus.png";
    newCactus.classList.add("cactus");
    setStyleProperty(newCactus,"--left",100);
    screen.append(newCactus);
}