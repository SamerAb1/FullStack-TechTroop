import "./App.css";
import ShoppingCart from "./ShoppingCart.jsx";
import { ThemeProvider } from "./theme/ThemeContext.jsx";
import ThemeDemo from "./ThemeDemo.jsx";

export default function App() {
  return (
    <>
      <h1>Exercise 1- Shopping Cart</h1>
      <ShoppingCart />
      <hr style={{ margin: "2rem 0" }} />
      <h1>Exercise 2 — Theme with Context</h1>
      <ThemeProvider>
        <ThemeDemo />
      </ThemeProvider>
    </>
  );
}
