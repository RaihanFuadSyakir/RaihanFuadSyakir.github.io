export function getStyleProperty(element, prop){
    return parseFloat(getComputedStyle(element).getPropertyValue(prop)) || 0
}
export function setStyleProperty(element, prop, value){
    element.style.setProperty(prop,value);
}
export function incrementStyleProperty(element, prop, increment){
    setStyleProperty(element, prop, getStyleProperty(element,prop) + increment);
}