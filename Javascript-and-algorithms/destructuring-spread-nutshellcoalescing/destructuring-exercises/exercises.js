// Exercise-1

let facts = {numPlanets1: 8, yearNeptuneDiscovered: 1846};
let {numPlanets1, yearNeptuneDiscovered} = facts;

console.log(numPlanets1); // "8"
console.log(yearNeptuneDiscovered); // "1846"



// Exercise-2

let planetFacts = {
  numPlanets: 8,
  yearNeptuneDiscovered: 1846,
  yearMarsDiscovered: 1659
};

let {numPlanets, ...discoveryYears} = planetFacts;

console.log(discoveryYears); // "{yearNeptuneDiscovered: 1846, yearMarsDiscovered: 1659}"

// Exercise-3

function getUserData({firstName, favoriteColor="green"}){
  return `Your name is ${firstName} and you like ${favoriteColor}`;
}

console.log(getUserData({firstName: "Alejandro", favoriteColor: "purple"})) // Your name is ejandro and you like purple
console.log(getUserData({firstName: "Melissa"})) //  Your name is Melissa and you like green
console.log(getUserData({})) // ? Your name is undefined and you like green


// Exercise 4


let [first, second, third] = ["Maya", "Marisa", "Chi"];

console.log(first); // Maya
console.log(second); // Marisa
console.log(third); // Chi


// Exercise 5

let [raindrops, whiskers, ...aFewOfMyFavoriteThings] = [
  "Raindrops on roses",
  "whiskers on kittens",
  "Bright copper kettles",
  "warm woolen mittens",
  "Brown paper packages tied up with strings"
]

console.log(raindrops); // Raindrops on roses
console.log(whiskers); // whiskers on kittens
console.log(aFewOfMyFavoriteThings); //  ["Bright copper kettles", "warm woolen mittens", "Brown paper packages tied up with strings"]
