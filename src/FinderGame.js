import {useState, useRef} from "react";
import {startEmulator} from "./Database";
import StatusBar from "./StatusBar";
import GameArea from "./GameArea";
import GameAreaDebug from "./GameAreaDebug";
import StartDialog from "./StartDialog";

const debugMode = false;
if (debugMode) {
  startEmulator();
}
const sampleChars = [
  {name: "Dramatic Chipmunk", found: false},
  {name: "Chuck Testa", found: false},
  {name: "Mudkip", found: false}
]

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
    console.log("Game finished");
    stopTimer();
    setMode("finish");
  }

  function showScores() {
    setMode("scores");
  }

  function foundCharacter(name) {
    const newList = characters.map((c) => {
      if (name === c.name) {
        c.found = true;
        return c;
      }
      return c;
    });
    console.log(characters, newList);
    const allCharsFound = (newList.find((c) => !c.found) === undefined);
    
    setCharacters(newList);
    if (allCharsFound) {
      finish();
    }
  }

  return (
    <div>
      <StatusBar characters={characters} time={time}/>
      {debugMode ?
        <GameAreaDebug characters={characters} handleCharFound={foundCharacter}/> :
        <GameArea characters={characters} handleCharFound={foundCharacter}/>}
      <StartDialog show={mode === "reset"} characters={characters} handleStart={start}/>
    </div>
  );
}

export default FinderGame;
