import { useState, useEffect } from "react";
import getData from "./dataService";

export default function Exercise2() {
  const [titleIndex, setTitleIndex] = useState(1);
  const [titles, setTitles] = useState([]);

  const updateTitle = () => {
    setTitleIndex(titleIndex + 1);
  };

  useEffect(() => {
    const getTitlesData = async function () {
      const data = await getData();
      console.log(data);

      setTitles(data);
    };
    getTitlesData();
  }, []);

  useEffect(() => {
    setTimeout(updateTitle, 1000);
  }, [titleIndex]);

  return (
    <div>
      <div className="box">
        {titles.find((t) => t.id === titleIndex)?.title ?? "Not found"}
      </div>
    </div>
  );
}
