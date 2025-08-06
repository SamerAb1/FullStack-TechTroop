import react, { useState } from "react";

export default function Landing({ data }) {
  return (
    <div>
      {data.store.map((d, i) =>
        d.hottest ? (
          <div key={i}>
            Welcome ,{data.user}. The hottest item is {d.item} for {d.price}$
          </div>
        ) : null
      )}
    </div>
  );
}
