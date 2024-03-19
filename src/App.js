import "./App.css";
import InputForm from "./InputForm";
import { useState } from "react";
import CountdownTimer from "./CountdownTimer";

function App() {
  const [targetDate, setTargetDate] = useState(null);
  const [countdownRunning, setCountdownRunning] = useState(false);

  const toggleCountdown = () => {
    setCountdownRunning((prev) => !prev);
  };

  return (
    <div className="App">
      <h1>Countdown Timer</h1>
      <InputForm
        setTargetDate={setTargetDate}
        countdownRunning={countdownRunning}
        toggleCountdown={toggleCountdown}
      />
      {targetDate && (
        <CountdownTimer
          targetDate={targetDate}
          countdownRunning={countdownRunning}
        />
      )}
    </div>
  );
}

export default App;
