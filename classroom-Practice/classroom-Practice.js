const rollDice = new Promise((resolve, reject) => {
  setTimeout(() => {
    const random = Math.floor(Math.random() * 7) + 1;
    if (random < 7) {
      resolve(random);
    } else {
      reject(random);
    }
  }, 0.5);
});

rollDice.then();

Promise((resolve, reject) => {
  function oldAsyncFunction() {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve("Success");
      } else {
        reject(new Error("Failed"));
      }
    }, 1000);
  }
});
