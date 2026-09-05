import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [secondsLeft, setSecondsLeft] = useState(86400); // 24 hours

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 86400));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');

  return (
    <div
      style={{
        fontFamily: "'Orbitron', monospace",
        fontSize: '1.25rem',
        fontWeight: 'bold',
        letterSpacing: '0.15em',
        color: '#4ade80',
        textShadow: '0 0 10px rgba(74, 222, 128, 0.7)'
      }}
    >
      {hours}:{minutes}:{seconds}
    </div>
  );
};

export default CountdownTimer;
