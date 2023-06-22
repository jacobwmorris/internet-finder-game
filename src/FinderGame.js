import {useState, useRef} from "react";
import StatusBar from "./StatusBar";
import StartDialog from "./StartDialog";

const sampleChars = {
  "Dramatic Chipmunk": {x: 0, y: 0, found: true},
  "Chuck Testa": {x: 1, y: 0, found: true},
  "Mudkip": {x: 0, y: 1, found: false}
}

function FinderGame() {
  const [mode, setMode] = useState("reset");
  const [time, setTime] = useState(0);
  const timerId = useRef(null);
  const [characters, setCharacters] = useState(sampleChars);

  function stopTimer() {
    if (timerId.current !== null) {
      clearInterval(timerId.current);
      timerId.current = null;
    }
  }

  function startTimer() {
    stopTimer();
    let timerCount = 0;
    timerId.current = setInterval(() => {
      timerCount++;
      setTime(timerCount);
    }, 1000);
  }

  function reset() {
    stopTimer();
    //Get a random 3 characters from the database
    setMode("reset");
    setTime(0);
    setCharacters(sampleChars);
  }

  function start() {
    startTimer();
    setMode("start");
  }

  function finish() {
    stopTimer();
    setMode("finish");
  }

  function showScores() {
    setMode("scores");
  }

  function foundCharacter(name) {
    if (characters[name] === undefined) {
      return;
    }

    const newList = {...characters};
    newList[name].found = true;
    const allCharsFound = (newList.find((char) => !char.found) !== undefined);

    setCharacters(newList);
    if (allCharsFound) {
      finish();
    }
  }

  return (
    <div>
      <StatusBar characters={characters} time={time}/>
      <StartDialog show={mode === "reset"} characters={characters} handleStart={start}/>
    </div>
  );
}

export default FinderGame;