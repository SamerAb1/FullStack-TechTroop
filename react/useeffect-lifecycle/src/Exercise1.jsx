import { useState, useEffect } from "react";

export default function Exercise1() {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  const updateTime = () => {
    const now = new Date();
    setTime({
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
    });
  };

  useEffect(() => {
    setTimeout(updateTime, 1000);
  }, [time]);

  return (
    <>
      <div>{`Current time: ${time.hours}:${time.minutes}:${time.seconds}`}</div>
    </>
  );
}
