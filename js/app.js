'use strict';

let divimg=document.getElementById('threeimg');
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

// array for name
let namearr=[];

// array for votes
let votearr=[];

// array for shown
let shownarr=[]; 

// array to store img to avoid duplicated
let Dupimg=[];

function Product(name, src) {
    this.name = name;
    this.src = src;
    this.shown = 0;
    this.votes = 0;
    Product.arrproduct.push(this);

    // push name of product in array
    namearr.push(this.name);

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
// new Product("dragon", "img/dragon.jpg");
// new Product("pen", "img/pen.jpg");
// new Product("pet-sweep", "img/pet-sweep.jpg");
// new Product("scissors", "img/scissors.jpg");
// new Product("shark", "img/shark.jpg");
// new Product("sweep", "img/sweep.png");
// new Product("tauntaun", "img/tauntaun.jpg");
// new Product("unicorn", "img/unicorn.jpg");
// new Product("water-can", "img/water-can.jpg");
// new Product("wine-glass", "img/wine-glass.jpg");

//random function, from 0 to 19
function randomProduct() {
    return Math.floor(Math.random() * Product.arrproduct.length);
}



//render function 

function renderThreeimg() {
    leftimgindex = randomProduct();
    centerimgindex = randomProduct();
    rightimgindex = randomProduct();
//add new condition in while loop to avoid duplicated image in next refresh of page
    while (leftimgindex === rightimgindex 
        || rightimgindex === centerimgindex 
        || leftimgindex === centerimgindex
        ||Dupimg.includes(leftimgindex)
        ||Dupimg.includes(centerimgindex)
        ||Dupimg.includes(rightimgindex))
        {
        leftimgindex =randomProduct();    
        rightimgindex = randomProduct();
        centerimgindex = randomProduct();
       }
       //push the index of image in  array 
      Dupimg=[leftimgindex,centerimgindex,rightimgindex];

      console.log(Dupimg);
      




    console.log(leftimgindex, centerimgindex, rightimgindex);
    leftimg.src = Product.arrproduct[leftimgindex].src;
    Product.arrproduct[leftimgindex].shown++;
    
    centerimg.src = Product.arrproduct[centerimgindex].src;
    Product.arrproduct[centerimgindex].shown++;
    
    rightimg.src = Product.arrproduct[rightimgindex].src;
    Product.arrproduct[rightimgindex].shown++;
    
}
//call function
renderThreeimg();

divimg.addEventListener('click',handleUserClick);
function handleUserClick(event) {


    if (userAttempts < maxAttempts) {
        if (event.target.id === 'left') {
            Product.arrproduct[leftimgindex].votes++;
            //console.log(Product.arrproduct[leftimgindex]);
        }
        else if (event.target.id === 'center') {
            Product.arrproduct[centerimgindex].votes++;
        }
        else if(event.target.id === 'right'){
            Product.arrproduct[rightimgindex].votes++;
        }
        else{
            alert('pls click on the images');
            userAttempts--;
        }
        renderThreeimg();

    } else { 
        
        Resultbutton.hidden=false;
        //add event for Button 
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

        for (let i=0 ;i<Product.arrproduct.length ;i++)
        {
            votearr.push(Product.arrproduct[i].votes);
            shownarr.push(Product.arrproduct[i].shown);
        }


       //remove event listener

       divimg.removeEventListener('click', handleUserClick);
       drawChart(); 
    }
    userAttempts++;
    
}

function drawChart(){
    const data = {
      labels: namearr,
      datasets: [{
        label: 'Votes',
        data:votearr,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
     
    },

  {
        label: 'Shown',
        data:shownarr,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }
    ]

    };

    const config = {
        type: 'bar',
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        },
      };

    var mychart=new Chart(document.getElementById('mychart'),
    config
    );  
}


