/*
  Write your code in the corresponding method
  Please note: You must also add the correct arguments to the methods
*/

//Exercise 1
const findFactorial = function(num) {
  //Your code here
  if(num === 1) return 1;

  return (num * findFactorial(num - 1));

}

console.log(findFactorial(5));
console.log(findFactorial(8));

//Exercise 2
const reverseString = function(str, left, right) {
  //Your code here
  if(str === "") {return "";}
  return reverseString(str.slice(1)) + str[0];
}

console.log(reverseString("exercise"));
console.log(reverseString("1234567"));

//Exercise 3
const arr1 = [1, 2, 3]
const arr2 = []

const swap = function(arr1, arr2) {
  //Your code here
  if(arr1.length === 0) return;
  arr2.push(arr1.shift());
  return swap(arr1,arr2);

}

swap(arr1,arr2);
console.log(arr1);
console.log(arr2);

/* DO NOT REMOVE THE EXPORTS BELOW */
module.exports = { findFactorial, reverseString, swap }