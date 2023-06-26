import {useState, useRef} from "react";
import MarkerIcon from "./images/marker.svg";
import "./styles/GameArea.css";

function GameArea({characters, handleCharFound}) {
  const [markerPos, setMarkerPos] = useState(null);
  const image = useRef(null);

  function mark(pos) {
    if (markerPos !== null) {
      setMarkerPos(null);
      return;
    }
    setMarkerPos(pos);
  }

  function guess(imgPos, name) {
    //TODO: check this info agaist the database
    if (true) {
        handleCharFound(name);
    }
    setMarkerPos(null);
  }

  return (
    <div className="GameArea">
      <div className="GameArea-image" ref={image} onClick={(e) => mark(clickToPosition(e))}>
        <GuessMarker pos={markerPos} characters={characters} handleGuess={guess}/>
      </div>
    </div>
  );
}

function GuessMarker({pos, characters, handleGuess}) {
  if (pos === null) {return null}

  const unguessedCharsRendered = Object.keys(characters)
    .filter((name) => !characters[name].found)
    .map((name) => {
      return (
        <li key={name}>
          <button onClick={(e) => {e.stopPropagation(); handleGuess(pos, name)}}>{name}</button>
        </li>
      );
    });

  return (
    <div className="GameArea-markspot" style={{left: numToCss(pos.x), top: numToCss(pos.y)}}>
      <img className="GameArea-mark" src={MarkerIcon} alt="Mark"/>
      <div className="GameArea-guesslist">
        <h2>Who is this?</h2>
        <ul>
          {unguessedCharsRendered}
        </ul>
      </div>
    </div>
  );
}

function numToCss(num) {
  return num.toString() + "px";
}

function clickToPosition(clickEvent) {
  const elementX = clickEvent.target.offsetLeft;
  const elementY = clickEvent.target.offsetTop;
  return {
    x: clickEvent.pageX - elementX,
    y: clickEvent.pageY - elementY
  };
}

export default GameArea;
