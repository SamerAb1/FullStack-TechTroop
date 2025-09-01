const fetchitemData = function () {
  let input = $("#item-input").val();

  $.get(`priceCheck/${input}`, function (itemData) {
    if (itemData.price === null) {
      $("body").append(`<div>Item not found - ${itemData.name}</div>`);
    } else {
      $("body").append(
        `<div>The price of ${itemData.name} - ${itemData.price}$</div>`
      );
    }
  });
};

const buyitemData = function () {
  let input = $("#item-input").val();

  $.get(`buy/${input}`, function (itemData) {
    console.log(itemData);
    if (itemData.inventory) {
      $("body").append(
        `<div> You have bought - ${itemData.name} - ${
          itemData.inventory - 1
        } left</div>`
      );
    } else {
      if (itemData.inventory < 1) {
        $("body").append(
          `<div> Not enough inventory - ${itemData.name} - ${itemData.inventory} left</div>`
        );
      } else {
        $("body").append(`<div>Item not found - ${itemData.name}</div>`);
      }
    }
  });
};
