// Objects


//Exercise 1

let p1 = {
  name: "Jill",
  age: 25,
  city: "New York"
}

let p2 = {
  name: "Robert",
  age: 25,
  city: "New York"
}

if(p1.age == p2.age){
   if(p1.city == p2.city){
    console.log(p1.name + " wanted to date " + p2.name);
   } else{
    console.log(p1.name + " wanted to date " + p2.name + ", but couldn't");
   }
}


//Exercise 2

let library = {
     books: [
    { title: "The Count of Monte Cristo", author: "Alexandre Dumas" },
    { title: "1984", author: "George Orwell" },
    { title: "Who Moved My Cheese?", author: "Spencer Johnson" },
    { title: "War and Peace", author: "leo tolstoy" },
    { title: "The Shadow of the Wind", author: "Carlos Ruiz Zafón" }]
}

//Exercise 3 + 3.1 + 3.2

const reservations = {
  Bob: { claimed: false },
  Ted: { claimed: true }
}

const input_name = 'Bob'; // Try 'Ted' or any other name as well
const name = input_name.toLocaleLowerCase();

if (reservations.name) {
  if (!reservations.name[claimed]) {
    console.log("Welcome, " + reservations.name);
  } else {
    console.log("Hmm, someone already claimed this reservation");
  }
} else {
  reservations[name] = { claimed: true };
  console.log("Welcome, " + reservations.name + " We've added your reservation.");
}


// Exercise 4

const date = 3

const kitchen = {
    owner: "Geraldine",
    hasOven: true/false, // choose one
    fridge: {
        price: 500,
        works: true/false, // choose one
        items: [
            { name: "cheese", expiryDate: 7 },
            { name: "radish", expiryDate: 2 },
            { name: "bread", expiryDate: 1 }
        ]
    }
}

const hasOven = kitchen.hasOven;
const works = kitchen.fridge.works;
const price = kitchen.fridge.price;
const radish = kitchen.fridge.items.find(item => item.name === "radish");
const expiredDays = date - radish.expiryDate; 

const expiredString = `${kitchen.owner}'s ${radish.name} expired ${expiredDays} day${expiredDays !== 1 ? 's' : ''} ago.`;

const fixPrice = price / 2;

if (hasOven && works) {
    console.log(`${expiredString} Weird, considering her fridge works. Luckily, she has an oven to cook the radish in.`);
} else if (!hasOven && works) {
    console.log(`${expiredString} Weird, considering her fridge works. Too bad she doesn't have an oven to cook the radish in.`);
} else if (hasOven && !works) {
    console.log(`${expiredString} Probably because her fridge doesn't work. Luckily, she has an oven to cook the radish in. And she'll have to pay ${fixPrice} to fix the fridge.`);
} else if (!hasOven && !works) {
    console.log(`${expiredString} Probably because her fridge doesn't work. Too bad she doesn't have an oven to cook the radish in. And she'll have to pay ${fixPrice} to fix the fridge.`);
}