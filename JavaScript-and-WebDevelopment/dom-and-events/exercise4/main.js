const container = document.getElementById("container");

for (let i = 0; i < 10; i++) {
  const box = document.createElement("div");
  box.className = "box";

  box.onmouseenter = () => {
    box.style.backgroundColor = getRandomColor();
  };

  container.appendChild(box);
}

function getRandomColor() {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
}
