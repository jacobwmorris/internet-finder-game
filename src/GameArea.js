import {useState, useRef, useEffect} from "react";
import {v4 as uuidv4} from "uuid";
import MarkerIcon from "./images/marker.svg";
import "./styles/GameArea.css";

function GameArea({characters, handleCharFound}) {
  const [markerPos, setMarkerPos] = useState(null);
  const [guesses, setGuesses] = useState({});
  const image = useRef(null);

  function mark(pos) {
    if (markerPos !== null) {
      setMarkerPos(null);
      return;
    }
    setMarkerPos(pos);
  }

  function guess(imgPos, name) {
    if (true) {
        handleCharFound(name);
    }
    setMarkerPos(null);
  }

  function guess2(imgPos, name) {
    const newList = {...guesses};
    const newId = uuidv4();
    console.log("adding " + newId);
    newList[newId] = {pos: imgPos, name: name};
    setGuesses(newList);
    setMarkerPos(null);
  }

  function removeGuess(id) {
    const guessEntries = Object.entries(guesses);
    const newList = Object.fromEntries(guessEntries.filter((g) => {console.log("removing " + g[0]); return g[0] !== id}));
    setGuesses(newList);
  }

  const guessesRendered = Object.entries(guesses).map(([id, val]) => {
    return (
      <GuessResult
        key={id}
        pos={val.pos}
        name={val.name}
        handleCharFound={handleCharFound}
        handleRemoveSelf={() => removeGuess(id)}
      />
    )
  });

  return (
    <div className="GameArea">
      <div className="GameArea-image" ref={image} onClick={(e) => mark(clickToPosition(e))}>
        <GuessMarker pos={markerPos} characters={characters} handleGuess={guess2}/>
        {guessesRendered}
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

function GuessResult({pos, name, handleCharFound, handleRemoveSelf}) {
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    //TODO: check the guess against the database
    console.log("Running effect for " + pos.x);
    let ignore = false;
    new Promise((resolve, reject) => {setTimeout(() => resolve(false), 2000)})
      .then((result) => {
        if (ignore) {console.log("ignoring promise resolution"); return;}
        setIsChecked(true);

        if (result) {
          handleCharFound(name);
          setIsCorrect(true);
        }
        else {
          setIsCorrect(false);
        }

        setTimeout(() => handleRemoveSelf(), 3000);
      });
    
    return (() => {console.log("Tearing down " + pos.x); ignore = true;});
  }, [name, handleCharFound, handleRemoveSelf]);

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

function incorrectMessage(name)  {
  return (name === "Chuck Testa") ? "Nope, Chuck Testa!" : "Nope!";
}

export default GameArea;
