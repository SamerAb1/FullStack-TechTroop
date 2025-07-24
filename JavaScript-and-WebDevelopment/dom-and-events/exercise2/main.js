const reservations = {
  Bob: { claimed: false },
  Ted: { claimed: true },
};

function isOnlyLetters(str) {
  return /^[a-z]+$/.test(str);
}

const checkReservations = function (name) {
  let cname = name.toLowerCase();
  if (!isOnlyLetters(cname)) {
    outputSpan.textContent = "Please Enter Valid Name!";
  } else if (reservations[name] !== undefined) {
    if (!reservations[name].claimed) {
      console.log(`Welcome, ${name}`);
      reservations[name].claimed = true;
      outputSpan.textContent = `Welcome, ${name}`;
    } else {
      console.log(`Hmm, someone already claimed this reservation`);
      outputSpan.textContent = `Hmm, someone already claimed this reservation`;
    }
  } else {
    console.log("You have no reservation");
    outputSpan.textContent = "You have no reservation";
  }
};

const checkBtn = document.getElementById("checkBtn");
const input = document.getElementById("myInput");
const res = document.getElementById("reservation");
const outputSpan = document.createElement("span");
outputSpan.id = "output";
outputSpan.style.fontWeight = "bold";
outputSpan.style.fontSize = "20px";
outputSpan.style.padding = "10px 20px";

res.appendChild(outputSpan);

checkBtn.onclick = () => {
  const inputValue = input.value;
  console.log(inputValue);
  checkReservations(inputValue);
  input.value = "Enter your name";
};
