import {useState, useRef, useEffect} from "react";
import {startEmulator, getRandomThree} from "./Database";
import StatusBar from "./StatusBar";
import GameArea from "./GameArea";
import GameAreaDebug from "./GameAreaDebug";
import StartDialog from "./StartDialog";
import Scoreboard from "./Scoreboard";

const debugMode = false;
const useFirebaseEmu = false;
if (useFirebaseEmu) {
  startEmulator();
}

function FinderGame({characters, setCharacters, handleRestart}) {
  const [mode, setMode] = useState("reset");
  const [time, setTime] = useState(0);
  const timerId = useRef(null);

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
    setMode("reset");
    stopTimer();
    setTime(0);
    handleRestart();
  }

  function start() {
    startTimer();
    setMode("start");
  }

  function finish() {
    stopTimer();
    setMode("finish");
  }

  function foundCharacter(name) {
    const newList = characters.map((c) => {
      if (name === c.name) {
        c.found = true;
        return c;
      }
      return c;
    });
    const allCharsFound = (newList.find((c) => !c.found) === undefined);
    
    setCharacters(newList);
    if (allCharsFound) {
      finish();
    }
  }

  return (
    <div>
      <StatusBar characters={characters} time={time} handleReset={reset}/>
      <GameArea active={mode === "start"} characters={characters} handleCharFound={foundCharacter}/>
      <StartDialog show={mode === "reset"} characters={characters} handleStart={start}/>
      <Scoreboard show={mode === "finish"} time={time} handleReset={reset}/>
    </div>
  );
}

function StartupScreen() {
  const [characters, setCharacters] = useState("loading");

  useEffect(() => {
    newCharList(setCharacters);
  }, []);

  function restart() {
    newCharList(setCharacters);
  }

  if (debugMode) {
    return <GameAreaDebug/>;
  }

  if (Array.isArray(characters)) {
    return <FinderGame characters={characters} setCharacters={setCharacters} handleRestart={restart}/>;
  }
  else if (characters === "loading") {
    return (
      <div>
        <h1 style={{margin: "20px", textAlign: "center"}}>Loading...</h1>
      </div>
    );
  }
  else {
    return (
      <div>
        <h1 style={{margin: "20px", textAlign: "center"}}>Loading failed.</h1>
      </div>
    );
  }
}

function newCharList(set) {
  set("loading");
  getRandomThree()
    .then((newChars) => {
      newChars.forEach((c) => c.found = false);
      set(newChars);
    })
    .catch((error) => {
      console.error(error);
      set("failed");
    });
}

export default StartupScreen;
