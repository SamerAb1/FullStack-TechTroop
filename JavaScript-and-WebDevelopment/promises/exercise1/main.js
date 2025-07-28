function checkLuckyNumber(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (num < 1) {
        reject(new Error("Invalid number"));
      } else if (num % 7 === 0) {
        resolve("Lucky!");
      } else {
        resolve("Not Lucky!");
      }
    }, 800);
  });
}

checkLuckyNumber(-7)
  .then((answer) => {
    console.log(answer);
  })
  .catch((error) => console.log(error.message));
