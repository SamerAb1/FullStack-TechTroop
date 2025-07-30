const input = document.getElementById("input");
const addBtn = document.getElementById("click-btn");
const clearWisdomBtn = document.getElementById("clear-wisdom-btn");
let liCount = 0;

let wisdom = [];

addBtn.onclick = () => {
  try {
    let userInput = input.value;
    if (!userInput) {
      throw new Error("Please Enter value!");
    }
    addToHTML(userInput);
    wisdom.push({ id: liCount, text: userInput });
    if (wisdom.length % 2 === 0) {
      localStorage.wisdom = JSON.stringify(wisdom);
    }
    input.value = "";
  } catch (error) {
    console.log(error.message);
  }
};

function addToHTML(input) {
  liCount++;
  const $li = $("<li>")
    .attr("id", `item-${liCount}`)
    .attr("data-index", liCount);
  const $deleteSpan = $("<span>")
    .text("X")
    .css("color", "red")
    .css("margin-right", "10px")
    .addClass("delete-btn");
  const $textSpan = $("<span>").text(input);
  $li.append($deleteSpan, $textSpan);
  $("#input-list").append($li);
}

$(window).on("load", function () {
  wisdom = JSON.parse(localStorage.wisdom || []);
  wisdom.forEach((element) => {
    addToHTML(element.text);
  });
});

clearWisdomBtn.onclick = () => {
  localStorage.removeItem("wisdom");
};

$("#input-list").on("click", ".delete-btn", function () {
  const $li = $(this).parent();
  const indexToDelete = parseInt($li.attr("data-index"));

  $li.remove();

  wisdom = wisdom.filter((item) => item.id !== indexToDelete);

  localStorage.wisdom = JSON.stringify(wisdom);
});
