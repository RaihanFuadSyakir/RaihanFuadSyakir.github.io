import { getStyleProperty, incrementStyleProperty, setStyleProperty } from "./modify_CSS_Property.js";

export const SPEED = .05

const grounds = document.querySelectorAll('[data-ground]');

export function initPosGround(){
    setStyleProperty(grounds[0],"--left",0);
    //based on css width of ground 300% and every deltaTime, left increased by 1%
    setStyleProperty(grounds[1],"--left",300);
}

export function updateGround(deltaTime,speedAcc){
    grounds.forEach(ground =>{
        incrementStyleProperty(ground,"--left", deltaTime * speedAcc * SPEED * -1);

        if(getStyleProperty(ground,"--left") <= -300){
            incrementStyleProperty(ground,"--left",600);
        }
    })
}