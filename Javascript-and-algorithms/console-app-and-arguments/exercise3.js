// Exercise 3

const readline = require('readline');
const person = {
    name: "",
    email: "",
    age: 0,
    favcolor :""
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('What is your name? ', (name) => {
    person.name = name;
    rl.question('What is your Email? ', (email) => {
        person.email = email;
        rl.question('How old are you? ', (age) => {
            person.age = parseInt(age);
            rl.question('What is your favorite color? ', (color) => {
                person.favcolor = color;
                rl.close();

   console.log(`Registration Summary: \nName: ${person.name} \nEmail: ${person.email} \nAge: ${person.age} \nFavorite Color: ${person.color}`);
            });
        });
    });
});
