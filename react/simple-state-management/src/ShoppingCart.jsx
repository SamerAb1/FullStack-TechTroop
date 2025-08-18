import { useReducer } from "react";

const initialState = { items: [], total: 0, itemCount: 0 };

function withRecalc(items) {
  const total = items.reduce((sum, i) => sum + i.price, 0);
  return { items, total, itemCount: items.length };
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const p = action.data;
      if (!p || typeof p.price !== "number") return state;
      const item = { ...p, id: p.id ?? Date.now() + Math.random() };
      return withRecalc([...state.items, item]);
    }
    case "REMOVE_ITEM": {
      const id = action.data;
      if (!state.items.some((i) => i.id === id)) return state;
      return withRecalc(state.items.filter((i) => i.id !== id));
    }
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
}

export default function ShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const products = [
    { name: "Laptop", price: 999 },
    { name: "Phone", price: 599 },
    { name: "Headphones", price: 199 },
  ];

  return (
    <section>
      <h2>
        Shopping Cart ({state.itemCount} items) — Total: $
        {state.total.toFixed(2)}
      </h2>

      <div
        style={{
          display: "flex",
          gap: ".5rem",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        {products.map((p) => (
          <button
            key={p.name}
            onClick={() => dispatch({ type: "ADD_ITEM", data: p })}
          >
            Add {p.name} (${p.price})
          </button>
        ))}
        <button
          onClick={() => dispatch({ type: "CLEAR_CART" })}
          disabled={state.itemCount === 0}
        >
          Clear Cart
        </button>
      </div>

      {state.items.length === 0 && (
        <p style={{ opacity: 0.7 }}>No items yet. Add something above.</p>
      )}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {state.items.map((item) => (
          <li key={item.id} style={{ marginTop: ".5rem" }}>
            {item.name} — ${item.price}
            <button
              style={{ marginLeft: ".5rem" }}
              onClick={() => dispatch({ type: "REMOVE_ITEM", data: item.id })}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
