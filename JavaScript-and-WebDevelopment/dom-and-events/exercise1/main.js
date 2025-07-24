console.log(document);

const playingField = document.getElementById("playing-field");
console.log(playingField);

const down = document.getElementById("down");
const ball = document.getElementById("ball");
let movLeft = 0;
let movDown = 0;

const moveRight = function () {
  const ball = document.getElementById("ball");
  let movLeft = parseInt(ball.style.left) || 0;
  movLeft += 15;
  ball.style.left = `${movLeft}px`;
};

const moveLeft = function () {
  const ball = document.getElementById("ball");
  let movLeft = parseInt(ball.style.left) || 0;
  movLeft -= 15;
  ball.style.left = `${movLeft}px`;
};

const moveUp = function () {
  const ball = document.getElementById("ball");
  let movDown = parseInt(ball.style.top) || 0;
  movDown -= 15;
  ball.style.top = `${movDown}px`;
};

const moveDown = function () {
  const ball = document.getElementById("ball");
  let movDown = parseInt(ball.style.top) || 0;
  movDown += 15;
  ball.style.top = `${movDown}px`;
};

const upArrow = document.getElementById("up");
const leftArrow = document.getElementById("left");
const rightArrow = document.getElementById("right");
const downArrow = document.getElementById("down");

upArrow.onclick = () => {
  moveUp();
};

leftArrow.onclick = () => {
  moveLeft();
};

rightArrow.onclick = () => {
  moveRight();
};

downArrow.onclick = () => {
  moveDown();
};

// const header = document.createElement("h1")
// header.innerHTML = "The Best Game Ever"
// header.style.color = "#c0392b"
// header.style.fontFamily = "Helvetica"
// document.body.appendChild(header)
// header.setAttribute("class", "my-header")

// const subHeader = document.createElement("h2")
// subHeader.innerHTML = "Game by: ~the creator~"
// subHeader.setAttribute("class", "sub-header")
// document.body.appendChild(subHeader)
