const fetchitemData = function () {
  let input = $("#item-input").val();

  $.get(`priceCheck/${input}`, function (itemData) {
    $("body").append(`<div>${itemData.title} - ${itemData.price}</div>`);
  });
};

const buyitemData = function () {
  let input = $("#item-input").val();

  $.get(`buy/${input}`, function (itemData) {
    $("body").append(
      `<div> You have bought - ${itemData.title} - ${itemData.inventory} left</div>`
    );
  });
};
