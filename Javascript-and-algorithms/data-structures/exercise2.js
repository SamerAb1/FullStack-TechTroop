function deepEqual(a, b) {
    if (a === b) return true;
    if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) {
        return false;
    }
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (!deepEqual(a[i], b[i])) return false;
        }
        return true;
    }
    if (Array.isArray(a) !== Array.isArray(b)) {
        return false;
    }
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    for (let key of aKeys) {
        if (!b.hasOwnProperty(key) || !deepEqual(a[key], b[key])) return false;
    }
    return true;
}



class UniqueArray {
    constructor() {
        this.items = [];
    }

    add(item) {
        if (!this.exists(item)) {
            this.items.push(item);
        }
    }

    exists(item) {
        for (let storedItem of this.items) {
            if (deepEqual(storedItem, item)) {
                return true;
            }
        }
        return false;
    }

    showAll() {
        console.log(this.items);
    }

    get(index) {
        return (index >= 0 && index < this.items.length) ? this.items[index] : -1;
    }
}
