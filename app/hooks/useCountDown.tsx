import { useEffect, useState } from 'react';

const setPadding = (num: number) => num.toString().padStart(2, '0');

export const useCountDown = (
  date: string = '2026-06-06',
  setMessage?: (str: string) => void
) => {
  const [time, setTime] = useState('');

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 12;

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const targetTime = new Date(date).getTime();
      const remaining = targetTime - currentTime;
      // const remaining = 0; // For testing edge case purposes

      const days = setPadding(Math.floor(remaining / day));
      const hours = setPadding(Math.floor((remaining % day) / hour));
      const minutes = setPadding(Math.floor((remaining % hour) / minute));
      const seconds = setPadding(Math.floor((remaining % minute) / second));

      setTime(`${days}:${hours}:${minutes}:${seconds}`);

      if (remaining <= 0) {
        clearInterval(interval);
        if (setMessage) {
          setTimeout(() => {
            setMessage(
              'Your account connection has just expired please reconnect if you want your account to be linked'
            );
          }, 1000);
        }
        setTime('00:00:00:00');
        console.log('Times up!');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [day, hour, minute, date, setMessage]);

  return {
    time,
  };
};
