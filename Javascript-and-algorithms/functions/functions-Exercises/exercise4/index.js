function isEven(arr, num){
    for(i in arr){
        if(arr[i] === num){
            return true;
        }
    }
    return false;
}


let calculator = {
    add : function(num1, num2){
        return num1 + num2;
    },
    subtract : function(num1, num2){
        return num1 - num2;
    }
}

const result1 = calculator.add(20, 1)
const result2 = calculator.subtract(30, 9)

console.log(calculator.add(result1, result2)) //should print 42
