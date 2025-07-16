class Exercises {

    constructor(){

    }

    // Exercise - 1
    //should return true if n is even, false otherwise
    isEven(n) {
        return n % 2 == 0 ? true : false;
    }

    // Exercise - 2
    //should remove at least one element from the array `arr`
    removeAtLeastOne(arr) {
        let numItemsToRemove = Math.floor(Math.random() * (arr.length - 1)) + 1;
        arr.splice(0, numItemsToRemove);
        return arr;
    }

    // Exercise - 3
    //should return a clean string without these symbols: "!", "#", ".", ",", "'"
    simplify(str) {
    let symbols = ["!", "#", ".", ",", "'"];
    return str.split("").filter(c => symbols.indexOf(c) == -1).join("");
    }

    // Exercise - 4
    validate(arr) {
        let trueCount = 0;
        let falseCount = 0;

        arr.forEach(element => {
             if(typeof element === "boolean"){
                element === true ? trueCount++ : falseCount++;
             }
        })
      if (trueCount === 0 && falseCount === 0) return "Need at least one boolean";
      return trueCount > falseCount;
    }

}

let Ex = new Exercises();
console.log(Ex.removeAtLeastOne([]));

module.exports = {Exercises};