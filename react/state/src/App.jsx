import { useState } from "react";
import Hudini from "./Hudini";
import Home from "./Home";
import "./App.css";
import Landing from "./Landing";

function App() {
  const initialData = {
    user: "Robyn",
    store: [
      { item: "XSPS Pro Player", price: 800, discount: 0.2, hottest: false },
      { item: "Gizem Backwatch", price: 230, discount: 0.6, hottest: false },
      {
        item: "Surround Sound Pelican",
        price: 3099,
        discount: 0.05,
        hottest: true,
      },
    ],
    shouldDiscount: false,
    currentPage: "Landing",
  };
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(data.currentPage);
  const [discount, setDiscount] = useState(data.shouldDiscount);
  function setPage() {
    if (currentPage === "Landing") {
      data.currentPage = "Home";
    } else {
      data.currentPage = "Landing";
    }
    setCurrentPage(data.currentPage);
  }

  function applyDiscount() {
    setData((prev) => ({
      ...prev,
      shouldDiscount: !prev.shouldDiscount,
    }));
  }
  return (
    <>
      <div className="Exercise-1">
        <h1>----Exercise-1----</h1>
        <Hudini />
      </div>
      <div className="Exercise-2">
        <h1>----Exercise-2 + 3 + 4----</h1>
        <button onClick={setPage}>Change Page</button>

        {currentPage === "Landing" ? (
          <Landing data={data} />
        ) : (
          <div>
            {discount ? (
              <button onClick={applyDiscount}>Remove Discount</button>
            ) : (
              <button onClick={applyDiscount}>Add Discount</button>
            )}
            <Home data={data} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
