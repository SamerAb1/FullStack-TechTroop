import react, { useState } from "react";

export default function Item({ item, discount }) {
  return (
    <div>
      {item.item}:{" "}
      {discount ? `${parseInt(item.price) * (1 - item.discount)}` : item.price}$
    </div>
  );
}
