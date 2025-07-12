class UniqueArray {
    constructor() {
        this.items = [];
    }

    add(item) {
        if (!this.exists(item)) {
            this.items.push(item);
        }
    }

    showAll() {
        console.log(this.items);
    }

    exists(item) {
        for (let storedItem of this.items) {
            if (deepEqual(storedItem, item)) {
                return true;
            }
        }
        return false;
    }

    get(index) {
        return (index >= 0 && index < this.items.length) ? this.items[index] : -1;
    }
}
