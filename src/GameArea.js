import {useState, useRef, useEffect} from "react";
import {numToCss, clickToPosition} from "./PositionFuncs";
import GuessManager from "./GuessManager";
import MarkerIcon from "./images/marker.svg";
import "./styles/GameArea.css";

function GameArea({active, characters, handleCharFound}) {
  const [markerPos, setMarkerPos] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const image = useRef(null);
  const guessManager = useRef(new GuessManager((list) => setGuesses(list.slice()), handleCharFound));

  useEffect(() => {
    guessManager.current.setCallbacks((list) => setGuesses(list.slice()), handleCharFound);
  }, [setGuesses, handleCharFound]);

  function mark(pos) {
    if (markerPos !== null) {
      setMarkerPos(null);
      return;
    }
    setMarkerPos(pos);
  }

  function guess(imgPos, name) {
    guessManager.current.add(name, imgPos, 2000);
    setMarkerPos(null);
  }

  const guessesRendered = guesses.map((g) => {
    return (
      <GuessResult
        key={g.renderId}
        pos={g.pos}
        name={g.name}
        isChecked={g.isChecked}
        isCorrect={g.isCorrect}
      />
    )
  });

  return (
    <div className="GameArea">
      <div
        className={"GameArea-image" + (active ? "" : " GameArea-inactive")}
        ref={image}
        onClick={(e) => mark(clickToPosition(e))}
      >
        {active ? <GuessMarker pos={markerPos} characters={characters} handleGuess={guess}/> : null}
        {guessesRendered}
      </div>
    </div>
  );
}

function GuessMarker({pos, characters, handleGuess}) {
  if (pos === null) {return null}

  const unguessedCharsRendered = characters
    .filter((c) => !c.found)
    .map((c) => {
      return (
        <li key={c.name}>
          <button onClick={(e) => {e.stopPropagation(); handleGuess(pos, c.name)}}>{c.name}</button>
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

function GuessResult({pos, name, isChecked, isCorrect}) {
  if (!isChecked) {
    return (
      <div className="GameArea-guessspot" style={{left: numToCss(pos.x), top: numToCss(pos.y)}}>
        <div className="GameArea-guesspending">Loading...</div>
      </div>
    )
  }
  
  return (
    <div className="GameArea-guessspot" style={{left: numToCss(pos.x), top: numToCss(pos.y)}}>
      {isCorrect ?
        <div className="GameArea-goodguess">Correct!</div> :
        <div className="GameArea-badguess">{incorrectMessage(name)}</div>}
    </div>
  )
}

function incorrectMessage(name)  {
  return (name === "Chuck Testa") ? "Nope, Chuck Testa!" : "Nope!";
}

export default GameArea;
