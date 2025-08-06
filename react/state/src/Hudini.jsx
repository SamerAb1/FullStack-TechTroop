import react, { useState } from "react";

export default function Hudini() {
  const [show, setShow] = useState(false);
  function toggleButton() {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  }
  return (
    <>
      <button onClick={toggleButton}>Show</button>
      <div>{show ? "Now You See Me!" : "Now You Don't!"}</div>
    </>
  );
}
