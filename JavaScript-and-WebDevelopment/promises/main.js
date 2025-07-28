console.log("before setTimeout");
setTimeout(function () {
  console.log("in the callback");
}, 1000);
console.log("after setTimeout");
