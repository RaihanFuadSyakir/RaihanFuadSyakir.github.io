
class itemCart{
    name;
    id;
    value;
    imgref;
    nominal;
    total;
    constructor(name,id,value){
        this.name = name;
        this.id = id;
        this.value = value;
        this.imgref = `./images/${this.name}.jpg`;
        this.nominal = 0
        this.total = 0
    }
    add(){
        this.nominal += 1;
    }
    subsract(){
        if(this.nominal === 0){return}
        this.nominal -= 1;
    }
    setTotalValue(){
        this.total = this.nominal * this.value;
    }
}
class listItemCart{
    listItem;
    constructor(){
        this.listItem = [];
    }
    addItem(item){
        this.listItem.push(item);
    }
    getListItem(){
        return this.listItem;
    }
}
const list = new listItemCart();
let item = new itemCart("headphone",1,10000);
list.addItem(item)
item = new itemCart("Phone",2,20000);
list.addItem(item)
item = new itemCart("gorengan",3,1000);
list.addItem(item)
item = new itemCart("mieayam",4,15000);
list.addItem(item)
item = new itemCart("tikus",5,30000);
list.addItem(item)
item = new itemCart("sate",6,30000);
list.addItem(item)
const setList = () => {
    let listItem = document.getElementById("list-item");
    list.getListItem().map(item => {
        let newDiv = '<div>';
        newDiv +=
        `<div class="item-box center-xy">
            <img src="${item.imgref}" alt="" class="img-item">
            <div class="mx-auto">${item.name} - Rp${item.value}</div>
            <div class="d-flex mx-auto">
                <button id="minus-${item.name}">-</button>
                <div id="number-${item.name}" class="item-nominal my-auto">0</div>
                <button id="plus-${item.name}">+</button>
            </div>
        </div>`;
        newDiv += '</div>';
        listItem.insertAdjacentHTML('beforeend', newDiv);
        const minusButton = document.getElementById(`minus-${item.name}`);
        const plusButton = document.getElementById(`plus-${item.name}`);
        const numberElement = document.getElementById(`number-${item.name}`);

        minusButton.addEventListener('click', () => {
            item.subsract();
            numberElement.textContent = item.nominal;
            item.setTotalValue();
            // Update other UI elements, e.g., total value
        });

        plusButton.addEventListener('click', () => {
            item.add();
            numberElement.textContent = item.nominal;
            item.setTotalValue();
            // Update other UI elements, e.g., total value
        });
    });
};
const totalBtn = document.getElementById("getTotal");
totalBtn.addEventListener('click',() =>{
    const cartList = document.getElementById("cart-item");
    console.log(list.getListItem().map(item => item.name))
    list.getListItem().map(item => {
        let newDiv = '<div>'
        newDiv +=
        `
        <div class="item-cart">
            <div>${item.name}</div>
            <div>
                <span>${item.value}</span> x <span>${item.nominal}</span>
            </div>
            </div>
            <div>${item.total}</div>`
        newDiv += '</div>'
        cartList.insertAdjacentHTML('beforeend', newDiv);
    })
})
setList();
