// Exercise 1


let age = 20;
// Your conditional code here
if(age >= 18){
    console.log("You can vote!");
}else{
    console.log("You aren't old enough to vote!");
}


// Exercise 2


let score = 85;
// Your conditional code here
if(score < 60){
    console.log("F");
}else if(score < 70){
console.log("D");
}else if(score < 80){
console.log("C");
}else if(score < 90){
console.log("B");
}else{
console.log("A");
}



// Exercise 3


let temperature = 20;
let weather = "sunny";
// Your conditional code here

if(weather == 'sunny'){
    if(temperature > 24){
        console.log('Go to the beach.');
    }else if(temperature > 15){
        console.log('Go for a walk.');
    }else{
        console.log('Stay inside and read.');
    }

}else if(weather == 'cloudy'){
    if(temperature > 21){
        console.log("Go hiking.");
    }else{
        console.log('Visit a museum.');
    }    
}else if(weather == 'rainy'){
    console.log('Watch a movie indoors');
}

// Exercise 4


let usernameLength = 6;
let passwordLength = 7;
let userAge = 15;
// Your conditional code here


if(usernameLength > 4 && passwordLength > 7 && userAge > 12){
    console.log('Congrats you can creat an account!');
}else if (usernameLength > 4 && passwordLength > 7){
    console.log('Your are too young to create an account');
}else if(passwordLength > 7 && userAge > 12){
    console.log('Username length is too short.');
}else if(usernameLength > 4 && userAge > 12){
    console.log('Password length is too short.');
}


// Exercise 5

let customerType = "premium";
let purchaseAmount = 150;
let dayOfWeek = 6; // 0 = Sunday, 1 = Monday, etc.
// Your conditional code here

if(customerType == 'vip'){
    console.log("Congrats you got 20% discount");
}else if(customerType == 'premium'){
    if(dayOfWeek > 0  && dayOfWeek < 6){
        console.log("Congrats you got 10% discount");
    }else{
        console.log("Congrats you got 15% discount");
    }
}else{
    if(purchaseAmount > 100){
        console.log("Congrats you got 10% discount");
    }else if(purchaseAmount > 50){
        console.log("Congrats you got 5% discount");
    }else{
        console.log("Sorry you got no discount");
    }
}

// Exercise 6

let year = 2024;
// Your conditional code here
// Examples: 2024 = leap, 1900 = not leap, 2000 = leap, 2023 = not leap

    if((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)){
        console.log('Leap year')
    }else{
    console.log('Not leap year');
    }


