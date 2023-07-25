import {useState, useRef, useEffect, useLayoutEffect} from "react";
import {numToCss, clickToPosition, positionToPercent, percentToPosition} from "./PositionFuncs";
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
    if (image.current === null) {return;}
    guessManager.current.add(name, positionToPercent(imgPos, image.current.offsetWidth, image.current.offsetHeight), 2000);
    setMarkerPos(null);
  }

  const guessesRendered = guesses.map((g) => {
    return (
      <GuessResult
        key={g.renderId}
        pos={percentToPosition(g.pos, image.current.offsetWidth, image.current.offsetHeight)}
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
  const guessList = useRef(null);

  useLayoutEffect(() => {
    if (guessList.current === null || pos === null) {return;}

    const listPos = positionGuessList(pos, guessList.current);
    guessList.current.style = `left:${numToCss(listPos.x)};top:${numToCss(listPos.y)};`;
  }, [pos]);

  if (pos === null) {return null}

  const unguessedCharsRendered = characters
    .filter((c) => !c.found)
    .map((c) => {
      return (
        <li key={c.name}>
          <button className="GameArea-guesslistbutton" onClick={(e) => {e.stopPropagation(); handleGuess(pos, c.name)}}>
            {"> "}<span>{c.name}</span>
          </button>
        </li>
      );
    });

  return (
    <div className="GameArea-markspot" style={{left: numToCss(pos.x), top: numToCss(pos.y)}}>
      <img className="GameArea-mark" src={MarkerIcon} alt="Mark"/>
      <div className="GameArea-guesslist" ref={guessList}>
        <h2>Who is this?</h2>
        <ul>
          {unguessedCharsRendered}
        </ul>
      </div>
    </div>
  );
}

function positionGuessList(pos, list) {
  const img = document.querySelector(".GameArea-image");
  const h2 = list.firstChild;
  const desiredX = 20, desiredY = -h2.offsetHeight / 2 - 6;
  const overflowX = (pos.x + desiredX + list.offsetWidth) - img.offsetWidth;
  const overflowY = (pos.y + desiredY + list.offsetHeight) - img.offsetHeight;
  return {
    x: (overflowX > 0) ? -list.offsetWidth - desiredX : desiredX,
    y: (overflowY > 0) ? desiredY - overflowY : desiredY
  };
}

function GuessResult({pos, name, isChecked, isCorrect}) {
  if (!isChecked) {
    return (
      <div className="GameArea-guessspot" style={{left: numToCss(pos.x), top: numToCss(pos.y)}}>
        <div className="GameArea-guesspending">Loading...</div>
      </div>
    );
  }
  
  return (
    <div className="GameArea-guessspot" style={{left: numToCss(pos.x), top: numToCss(pos.y)}}>
      {isCorrect ?
        <div className="GameArea-goodguess">Correct!</div> :
        <div className="GameArea-badguess">{incorrectMessage(name)}</div>}
    </div>
  );
}

function incorrectMessage(name)  {
  return (name === "Chuck Testa") ? "Nope, Chuck Testa!" : "Nope!";
}

export default GameArea;
