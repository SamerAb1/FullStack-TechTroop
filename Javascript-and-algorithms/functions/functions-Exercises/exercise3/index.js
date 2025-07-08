function isEven(arr, num){
    for(i in arr){
        if(arr[i] === num){
            return true;
        }
    }
    return false;
}


let arr = [0,1,2,3,4,5,6];

console.log(isEven(arr,9));
