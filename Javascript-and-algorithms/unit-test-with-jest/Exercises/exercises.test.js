const { Exercises } = require("./exercises");

// Exercise - 1
test("isEven should return true if n is even, false otherwise", () => {
    const Ex = new Exercises();
    expect(Ex.isEven(2)).toBeTruthy();
    expect(Ex.isEven(3)).toBeFalsy();
    expect(Ex.isEven("4")).toBeFalsy(); // Exercise 5
    expect(Ex.isEven(null)).toBeTruthy();  // Exercise 5
});
// Exercise - 2
test("should remove at least one element from the array `arr`", () => {
    const Ex = new Exercises();
    let arr = [0,1,2,3,4,5,6,7,8];
    let length = arr.length;
    let arr1 = [0]; // Exercise 5
    expect(Ex.removeAtLeastOne(arr)).not.toHaveLength(length);
    expect(Ex.removeAtLeastOne(arr1)).not.toHaveLength(0); // Exercise 5
    expect(Ex.removeAtLeastOne([])).toEqual([]);
});
// Exercise - 3
test("should return a clean string without these symbols: '!'', '#', '.', ',', '''", () => {
    const Ex = new Exercises();
    let str = "!t#e.s,t'"
    expect(Ex.simplify(str)).toEqual("test");
    expect(Ex.simplify("")).toEqual("");
    expect(Ex.simplify(null)).toEqual(""); // Exercise 5
    expect(Ex.simplify(undefined)).toEqual(""); // Exercise 5
    expect(Ex.simplify("test")).toEqual("test");
});
// Exercise - 4
test("should return {error: 'Need at least one boolean'} if there at lest one boolean, return true of trues are more then falses and return false otherwise ", () => {
    const Ex = new Exercises();
    let arr = [true,true,false];

    expect(Ex.validate()).toEqual("Need at least one boolean");
    expect(Ex.validate(arr)).toBeTruthy();
    arr.push(false);
    expect(Ex.validate(arr)).toBeFalsy();
    arr.push(false);
    expect(Ex.validate(arr)).toBeFalsy();
    expect(Ex.validate([null, 1, "true", undefined])).toEqual("Need at least one boolean"); // Exercise 5
    expect(Ex.validate([false, false, false])).toBeFalsy(); // Exercise 5
    
});
