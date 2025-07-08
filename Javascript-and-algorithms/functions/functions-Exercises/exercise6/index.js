function isArmstrongNumber(number){
    let numOfDigits = number.toString().length;
    let sumOfPow = 0;

    while(number != 0){
        sumOfPow += (number % 10) ** numOfDigits;
        number = parseInt(number / 10);
    }
    return sumOfPow;
}

for(i = 100; i < 1000; i++){
    if(isArmstrongNumber(i) === i){
        console.log(i);
    }
}