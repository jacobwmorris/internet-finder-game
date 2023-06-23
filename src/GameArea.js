import {useState, useRef} from "react";
import MarkerIcon from "./icons/marker.svg";

function GameArea({characters, handleCharFound}) {
  const [markerPos, setMarkerPos] = useState(null);
  const image = useRef(null);

  const unguessedChars = Object.keys(characters).filter((name) => !characters[name].found);

  function mark(imgX, imgY) {
    if (markerPos !== null) {
      setMarkerPos(null);
      return;
    }
    setMarkerPos({x: imgX, y: imgY});
  }

  function guess(imgPos, name) {
    //TODO: check this info agaist the database
    if (true) {
        handleCharFound(name);
    }
    setMarkerPos(null);
  }

  return (
    <div>
      <img src="./images/main.jpg" alt="Main image" ref={image} onClick={(e) => mark(e.offsetX, e.offsetY)}/>
      <GuessMarker pos={markerPos} unguessedChars={unguessedChars} handleGuess={guess}/>
    </div>
  );
}

function GuessMarker({pos, unguessedChars, handleGuess}) {
  if (pos === null) {return null}

  const unguessedCharsRendered = unguessedChars.map((name) => {
    return (
      <li key={name}>
        <button onClick={(e) => handleGuess(pos, name)}>{name}</button>
      </li>
    );
  });

  return (
    <div>
      <img src={MarkerIcon} alt="Mark"/>
      <div>
        <h2>Who is this?</h2>
        <ul>
          {unguessedCharsRendered}
        </ul>
      </div>
    </div>
  );
}

export default GameArea;
