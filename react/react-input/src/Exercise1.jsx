import { useState } from "react";

const Exercise1 = () => {
  const [person, setPerson] = useState({ name: "", age: "" });

  function showAlert() {
    if (person.name === "" || person.age === "") {
      alert("Please Enter Values to the inputs!");
    } else {
      alert(
        `Come in ${person.name}, you're ${person.age} - that's good enough`
      );
    }
  }
  const handleChange = (event, property) => {
    setPerson({ ...person, [property]: event.target.value });
  };
  return (
    <div>
      <input
        id="name-input"
        onChange={(e) => handleChange(e, "name")}
        value={person.name}
      />
      <input
        id="age-input"
        onChange={(e) => handleChange(e, "age")}
        value={person.age}
      />
      <button onClick={showAlert}>Go to Bar</button>
    </div>
  );
};
export default Exercise1;
