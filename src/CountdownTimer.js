import React, { useEffect, useState } from "react";
import "./App.css";

const CountdownTimer = ({ targetDate, countdownRunning }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [timerOver, setTimerOver] = useState(false);

  useEffect(() => {
    if (countdownRunning) {
      const timer = setInterval(() => {
        const newTimeLeft = calculateTimeLeft();
        setTimeLeft(newTimeLeft);

        // Check if timer is over
        if (
          newTimeLeft.days === 0 &&
          newTimeLeft.hours === 0 &&
          newTimeLeft.minutes === 0 &&
          newTimeLeft.seconds === 0
        ) {
          setTimerOver(true);
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    } else {
      // If countdown is stopped, reset all countdown values to 0
      setTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    }
  }, [countdownRunning, targetDate]);

  function calculateTimeLeft() {
    const difference = new Date(targetDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      let totalSeconds = Math.floor(difference / 1000);

      const days = Math.min(Math.floor(totalSeconds / (24 * 60 * 60)), 99);
      totalSeconds %= 24 * 60 * 60;
      const hours = Math.min(Math.floor(totalSeconds / (60 * 60)), 23);
      totalSeconds %= 60 * 60;
      const minutes = Math.min(Math.floor(totalSeconds / 60), 59);
      const seconds = Math.min(totalSeconds % 60, 59);

      timeLeft = {
        days,
        hours,
        minutes,
        seconds,
      };
    } else {
      // If countdown is below 0, set all countdown values to 0
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return timeLeft;
  }

  if (timerOver) {
    return <div className="timer-over-message">Timer is Over!</div>;
  }

  if (timeLeft.days > 100) {
    return (
      <div className="timer-over-message">
        Please select a date within the next 100 days.
      </div>
    );
  }

  return (
    <div className="counter-timer">
      <div className="days-timer">
        {timeLeft.days} <div>{timeLeft.days === 1 ? "Day" : "Days"}</div>
      </div>
      <div className="hours-timer">
        {timeLeft.hours} <div>{timeLeft.hours === 1 ? "Hour" : "Hours"}</div>
      </div>
      <div className="minutes-timer">
        {timeLeft.minutes}{" "}
        <div>{timeLeft.minutes === 1 ? "Minute" : "Minutes"}</div>
      </div>
      <div className="seconds-timer">
        {timeLeft.seconds}{" "}
        <div>{timeLeft.seconds === 1 ? "Second" : "Seconds"}</div>
      </div>
    </div>
  );
};

export default CountdownTimer;
