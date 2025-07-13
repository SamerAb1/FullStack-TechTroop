// Exercise 1

console.log('Please enter two numbers and operation (n1 op n2) ', process.argv);
const number1 = parseInt(process.argv[2]);
const operation = process.argv[3];
const number2 = parseInt(process.argv[4]);
let answer = operation === "+" ? number1 + number2 : operation === "-" ? number1 - number2 : operation === "*" ? number1 * number2 : operation === "/" ? number1 / number2 : console.log("Please enter valid operation!");
if(number1 && number2 && operation){
    console.log(`Output: ${number1} ${operation} ${number2} = ${answer}`);
}else{
    console.log("Please enter valid input!");
}
