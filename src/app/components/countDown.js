import { useEffect, useState } from 'react';

const CountdownClock = ({ durationInSeconds }) => {
  const [timeRemaining, setTimeRemaining] = useState(durationInSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeRemaining <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeRemaining(timeRemaining - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <p>Signal will expire in {formatTime(timeRemaining)}</p>
    </div>
  );
};

export default CountdownClock;
