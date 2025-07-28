// Simulated inventory database
const inventory = {
  laptop: { price: 999, stock: 5 },
  mouse: { price: 25, stock: 10 },
  keyboard: { price: 75, stock: 0 }, // Out of stock
  monitor: { price: 299, stock: 3 },
};

function checkInventory(items) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      for (let item of items) {
        if (!inventory[item]) {
          return reject(new Error(`Item "${item}" does not exist`));
        }
        if (inventory[item].stock === 0) {
          return reject(new Error(`${item} is out of stock`));
        }
      }
      resolve(items);
    }, 500);
  });
}

function calculateTotal(items) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let subtotal = items.reduce(
        (sum, item) => sum + inventory[item].price,
        0
      );
      let tax = subtotal * 0.08;
      let total = subtotal + tax;
      resolve({ subtotal, tax, total });
    }, 200);
  });
}

function processPayment(amount) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.9) {
        resolve({
          transactionId: Math.floor(Math.random() * 1000000),
          amount,
          status: "success",
        });
      } else {
        reject(new Error("Payment failed. Please try again."));
      }
    }, 1500);
  });
}

function updateInventory(items) {
  return new Promise((resolve) => {
    setTimeout(() => {
      items.forEach((item) => {
        inventory[item].stock -= 1;
      });
      resolve("Inventory updated");
    }, 300);
  });
}

function checkout(itemNames) {
  let orderSummary = {};

  return checkInventory(itemNames)
    .then((validItems) => {
      return calculateTotal(validItems);
    })
    .then((summary) => {
      orderSummary = summary;
      return processPayment(summary.total);
    })
    .then((paymentResult) => {
      orderSummary.payment = paymentResult;
      return updateInventory(itemNames);
    })
    .then(() => {
      return {
        message: "Order completed successfully!",
        ...orderSummary,
      };
    });
}

// Test cases:
checkout(["laptop", "mouse"]) // Should succeed
  .then((result) => console.log("Order success:", result))
  .catch((error) => console.log("Order failed:", error.message));

checkout(["laptop", "keyboard"]) // Should fail - keyboard out of stock
  .then((result) => console.log("Order success:", result))
  .catch((error) => console.log("Order failed:", error.message));

checkout(["monitor", "mouse", "laptop"]) // Might fail at payment (10% chance)
  .then((result) => console.log("Order success:", result))
  .catch((error) => console.log("Order failed:", error.message));
