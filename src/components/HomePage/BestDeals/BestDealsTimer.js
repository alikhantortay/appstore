import { useEffect, useState } from "react";

export const BestDealsTimer = () => {
  const [total] = useState(
    Date.parse(new Date()) + 1461443000,
  );
  const [timer, setTimer] = useState(
    `16d : 21h : 57m : 23s`,
  );

  const countTime = () => {
    const remaining = total - Date.parse(new Date());
    const days = Math.floor(
      remaining / (1000 * 60 * 60 * 24),
    );
    const hours = Math.floor(
      (remaining / 1000 / 60 / 60) % 24,
    );
    const minutes = Math.floor(
      (remaining / 1000 / 60) % 60,
    );
    const seconds = Math.floor((remaining / 1000) % 60);

    setTimer(
      `${days > 9 ? days : "0" + days}d : ${
        hours > 9 ? hours : "0" + hours
      }h : ${minutes > 9 ? minutes : "0" + minutes}m : ${
        seconds > 9 ? seconds : "0" + seconds
      }s`,
    );
  };

  useEffect(() => {
    setInterval(countTime, 1000);
  });

  return <span>{timer}</span>;
};
