let cartItems = [
    { name: "T-shirt", price: 19.99, category: "clothing", quantity: 2 },
    { name: "Laptop", price: 1299.99, category: "electronics", quantity: 1 },
    { name: "Coffee Beans", price: 12.99, category: "food", quantity: 3 },
    { name: "Headphones", price: 89.99, category: "electronics", quantity: 1 },
    { name: "Jeans", price: 59.99, category: "clothing", quantity: 1 }
];

let taxRates = {
    clothing: 0.08,
    electronics: 0.10,
    food: 0.05
};

let totaltax = cartItems.reduce((total,cartitem) => {
    let taxrate = cartitem.category === "clothing" ? taxRates.clothing : 
                  cartitem.category === "electronics" ? taxRates.electronics:
                  cartitem.category === "food" ? taxRates.food : 0;
    return total + (1 + taxrate) * (cartitem.price*cartitem.quantity)
},0);

console.log(totaltax); // Should print: 1621.3292
