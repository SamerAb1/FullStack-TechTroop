import react, { useState } from "react";
import Item from "./Item";
export default function Home({ data }) {
  return (
    <div>
      <h4>Store</h4>
      {data.store.map((d) => (
        <Item item={d} discount={data.shouldDiscount} />
      ))}
    </div>
  );
}
