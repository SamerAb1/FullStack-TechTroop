// Loops


// Exercise 1

const names = ["Ashley", "Donovan", "Lucas"]
const ages = [23, 47, 18]
const people = []

for (let i = 0; i < names.length; i++) {
    people.push({ name: names[i], age: ages[i] });
}
console.log(people);


// Exercise 2

for(let person of people){
    console.log(`${person.name} is ${person.age} years old`);
}


// Exercise 3

const posts = [
  {id: 1, text: "Love this product"},
  {id: 2, text: "This is the worst. DON'T BUY!"},
  {id: 3, text: "So glad I found this. Bought four already!"}
]


for(let post in posts){
    if(posts[post].id === 2){
        posts.splice(post,1);
    }
}

console.log(posts);

// Exercise 4

const posts1 = [
  {
    id: 1, 
    text: "Love this product",
    comments: []
  },
  { 
    id: 2, 
    text: "This is the worst. DON'T BUY!", 
    comments: [
                {id: 1, text: "Idiot has no idea"}, 
                {id: 2, text:"Fool!"}, 
                {id: 3, text: "I agree!"}
              ]
   },
   {
    id: 3, 
    text: "So glad I found this. Bought four already!",
    comments: []
   }
]

for(let post1 in posts1){
     if(posts1[post1].id === 2){
        for(let comment in posts1[post1].comments){
            if(posts1[post1].comments[comment].id === 3){
                posts1[post1].comments.splice(comment,1);
            }
        }
     }
}

console.log(posts1);

// Exercise 5

const dictionary = {
  "A": ["Aardvark", "Abacus", "Actually", "Atomic"],
  "B": ["Banana", "Bonkers", "Brain", "Bump"],
  "C": ["Callous", "Chain", "Coil", "Czech"]
}


for(let letter of Object.keys(dictionary)){
    console.log(`Words that begins with ${letter}`);
    for(let word of dictionary[letter]){
        console.log(word);
    }
}