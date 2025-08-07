import { useState } from "react";

const Exercise2 = () => {
  const [name, setName] = useState("");
  const [fruit, setFruit] = useState("");

  function printOutput() {
    if (name === "" || fruit === "") {
      console.log("Please Enter Values to the inputs!");
    } else {
      console.log(`${name} selected ${fruit}`);
    }
  }
  return (
    <div>
      <input
        id="name-input"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <select
        id="select-input"
        onChange={(e) => {
          setFruit(e.target.value);
          printOutput();
        }}
        value={fruit}
      >
        <option value="Grape">Grape</option>
        <option value="Peach">Peach</option>
        <option value="Watermelon">Watermelon</option>
      </select>
    </div>
  );
};
export default Exercise2;
