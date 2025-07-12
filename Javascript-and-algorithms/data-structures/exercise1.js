
class UniqueArray {
    constructor() {
        this.items = [];
        this.itemSet = {}; 
    }

    add(item) {
        if (!this.itemSet[item]) {
            this.items.push(item);
            this.itemSet[item] = true;
        }
    }

    showAll() {
        console.log(this.items);
    }

    exists(item) {
        return !!this.itemSet[item];
    }

    get(index) {
        return (index >= 0 && index < this.items.length) ? this.items[index] : -1;
    }
}

const uniqueStuff = new UniqueArray();
uniqueStuff.add("toy");
uniqueStuff.showAll();             // ["toy"]
uniqueStuff.add("toy");
uniqueStuff.showAll();             // ["toy"]
console.log(uniqueStuff.exists("toy")); // true
uniqueStuff.add("poster");
uniqueStuff.add("hydrogen");
console.log(uniqueStuff.get(2));   // "hydrogen"
