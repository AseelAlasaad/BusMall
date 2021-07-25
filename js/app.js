'use strict';


let leftimg = document.getElementById("left");
let centerimg = document.getElementById("center");
let rightimg = document.getElementById("right");
let Resultbutton = document.getElementById("View Results");
let list = document.getElementById("result-list");


let maxAttempts = 25;
let userAttempts = 0;

let leftimgindex;
let centerimgindex;
let rightimgindex;

function Product(name, src) {
    this.name = name;
    this.src = src;
    this.shown = 0;
    this.votes = 0;
    Product.arrproduct.push(this);

}
//array of object
Product.arrproduct = [];


//new instances
new Product("bag", "img/bag.jpg");
new Product("banana", "img/banana.jpg");
new Product("bathroom", "img/bathroom.jpg");
new Product("boots", "img/boots.jpg");
new Product("breakfast", "img/breakfast.jpg");
new Product("bubblegum", "img/bubblegum.jpg");
new Product("chair", "img/chair.jpg");
new Product("cthulhu", "img/cthulhu.jpg");
new Product("dog-duck", "img/dog-duck.jpg");
new Product("dragon", "img/dragon.jpg");
new Product("pen", "img/pen.jpg");
new Product("pet-sweep", "img/pet-sweep.jpg");
new Product("scissors", "img/scissors.jpg");
new Product("shark", "img/shark.jpg");
new Product("sweep", "img/sweep.png");
new Product("tauntaun", "img/tauntaun.jpg");
new Product("unicorn", "img/unicorn.jpg");
new Product("water-can", "img/water-can.jpg");
new Product("wine-glass", "img/wine-glass.jpg");
//random function, from 0 to 19
function randomProduct() {
    return Math.floor(Math.random() * Product.arrproduct.length);
}



//render function 

function renderThreeimg() {
    leftimgindex = randomProduct();
    centerimgindex = randomProduct();
    rightimgindex = randomProduct();

    while (leftimgindex === rightimgindex || rightimgindex === centerimgindex || leftimgindex === centerimgindex) {
        rightimgindex = randomProduct();
        centerimgindex = randomProduct();

    }
    console.log(leftimgindex, centerimgindex, rightimgindex);
    leftimg.src = Product.arrproduct[leftimgindex].src;
    centerimg.src = Product.arrproduct[centerimgindex].src;
    rightimg.src = Product.arrproduct[rightimgindex].src;

    Product.arrproduct[leftimgindex].shown++;
    Product.arrproduct[centerimgindex].shown++;
    Product.arrproduct[rightimgindex].shown++;

}
renderThreeimg();

leftimg.addEventListener("click", handleUserClick);
centerimg.addEventListener("click", handleUserClick);
rightimg.addEventListener("click", handleUserClick);

function handleUserClick(event) {
    userAttempts++;

    if (userAttempts < maxAttempts) {
        if (event.target.id === 'left') {
            Product.arrproduct[leftimgindex].votes++;
            //console.log(Product.arrproduct[leftimgindex]);
        }
        else if (event.target.id === 'center') {
            Product.arrproduct[centerimgindex].votes++;
        }
        else {
            Product.arrproduct[rightimgindex].votes++;
        }
        renderThreeimg();

    } else {   //remove event listener

        leftimg.removeEventListener('click', handleUserClick);
        centerimg.removeEventListener('click', handleUserClick);
        rightimg.removeEventListener('click', handleUserClick);
        Resultbutton.addEventListener('click', Button);
        function Button(event) {

            for (let i = 0; i < Product.arrproduct.length; i++) {
                let listitem = document.createElement('li');
                list.appendChild(listitem);
                listitem.textContent = `${Product.arrproduct[i].name} had  ${Product.arrproduct[i].votes} votes, and was seen ${Product.arrproduct[i].shown} times`;
            }
            //remove event listener 
            Resultbutton.removeEventListener('click', Button);
        }

    }

}


