import React, { useState } from "react";
import "./App.css";

const InputForm = ({ setTargetDate, countdownRunning, toggleCountdown }) => {
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input) {
      setErrorMessage("Please select a date to start the Countdown.");
    } else {
      // Calculate the difference between the selected date and the current date
      const selectedDate = new Date(input);
      const currentDate = new Date();
      const differenceInDays = Math.floor(
        (selectedDate - currentDate) / (1000 * 60 * 60 * 24)
      );

      if (differenceInDays > 100) {
        setErrorMessage("Please select a date within the next 100 days.");
      } else {
        setTargetDate(input);
        setErrorMessage("");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-data">
      <div className="form-input">
        <input type="datetime-local" value={input} onChange={handleChange} />
      </div>
      <div className="form-button">
        <button type="submit" onClick={toggleCountdown}>
          {countdownRunning ? "Stop Countdown" : "Start Countdown"}
        </button>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </form>
  );
};

export default InputForm;
