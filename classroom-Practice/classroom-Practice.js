class Animal {
    constructor(name, numLegs) {
        this.name = name
        this.numLegs = numLegs
        this.children = [];
    }
      giveBirth(name){
        this.children.push(name);
    }
}

class Human {
    constructor(name, age, isFriendly){
        this.name = name;
        this.age = age;
        this.isFriendly = isFriendly;
    }
}

class Vehicle {
    static carsSold = 0;
    constructor(x, y, speed){
        this.x = x;
        this.y = y;
        this._speed = speed;
        this._fuel;
        Vehicle.carsSold++;
    }
    
    static getInfo() {
    console.log("We've sold " + Vehicle.carsSold + " vehicles.");
    }
    static calculateMoney(){
        console.log("We've earned " +Vehicle.carsSold * 30000 +"$ so far");
    }

    set speed(speed) {
        if (speed < 0) {
            return console.log("Speed must be positive");
        }
        this._speed = speed;
    }
    get speed(){
        return this._speed;
    }
    set fuel(amount) {
        if (fuel > 0 && fuel < 151) {
            this._fuel = amount;
        }else{
            return console.log("fuel must be 0 < fuel < 151");
        }
        
    }
    get fuel(){
        return this._fuel;
    }

}
const dog = new Animal("bob", 4);
console.log(dog.name + " " + dog.numLegs);

const person = new Human("bob", 20, true);
console.log(person.name + " " + person.age +" "+ person.isFriendly);

dog.giveBirth("Dolly")
console.log(dog.children) // should print an array with 1 item: ["Dolly"]﻿

const car1 = new Vehicle(1, 2, 100);
const car2 = new Vehicle(1, 2, 100);
const car3 = new Vehicle(1, 2, 100);
Vehicle.getInfo();
Vehicle.calculateMoney();

