import {useState, useRef, useEffect} from "react";
import {numToCss, clickToPosition, positionToPercent, percentToPosition, subtract} from "./PositionFuncs";
import {newCharacter, setupCharacterListener, getRandomThree, checkGuess, getScoreboard, postScore} from "./Database";
import MarkerIcon from "./images/marker.svg";
import "./styles/GameArea.css";

function GameAreaDebug({characters, handleCharFound}) {
  const [positionMark, setPositionMark] = useState(null);
  const [radiusMark, setRadiusMark] = useState(null);
  const [guessMark, setGuessMark] = useState(null);
  const [markType, setMarkType] = useState("pos");
  const [charAreas, setCharAreas] = useState([]);
  const image = useRef(null);

  useEffect(() => {
    const stopListener = setupCharacterListener(setCharAreas);
    return () => {stopListener();}
  }, [setCharAreas]);

  function mark(pos) {
    switch (markType) {
      case "pos": setPositionMark(pos); break;
      case "rad": setRadiusMark(pos); break;
      case "guess": setGuessMark(pos); break;
      default: break;
    }
  }

  function handleAddCharacter(e) {
    e.preventDefault();
    if (positionMark === null || radiusMark === null || image.current === null) {return;}
    const name = e.target.elements.name.value;
    const portrait = e.target.elements.portrait.files[0];
    const charPos = positionToPercent(positionMark, image.current.offsetWidth, image.current.offsetHeight);
    const radius = positionToPercent(subtract(radiusMark, positionMark), image.current.offsetWidth, image.current.offsetHeight);
    newCharacter(name, charPos, radius, portrait);
  }

  function handleTestRandom(e) {
    getRandomThree().then((characters) => console.log(characters), (error) => console.error(error));
  }

  function handleTestGuess(e) {
    e.preventDefault();
    if (guessMark === null) {return;}
    const name = e.target.elements.name.value;
    checkGuess(name, positionToPercent(guessMark, image.current.offsetWidth, image.current.offsetHeight))
      .then((result) => console.log(result), (error) => console.error(error));
  }

  function handleTestScoreboard(e) {
    getScoreboard(3).then((scores) => console.log(scores), (error) => console.error(error));
  }

  function handlePostScore(e) {
    e.preventDefault();
    const time = parseInt(e.target.elements.time.value);
    postScore("testplayer", time);
  }

  const charAreasRendered = charAreas.map((a) => {
    return (
      <ClickArea
        key={a.name}
        name={a.name}
        pos={percentToPosition(a.pos, image.current.offsetWidth, image.current.offsetHeight)}
        radius={percentToPosition(a.radius, image.current.offsetWidth, image.current.offsetHeight)}
      />
    );
  });

  return (
    <div className="GameArea">
      <div className="GameArea-debugcontrols">
        <div>
          <fieldset>
            <legend>Mark</legend>
            <label>Position: <input type="radio" name="marktype" defaultChecked onClick={() => setMarkType("pos")}/></label>
            <label>Radius: <input type="radio" name="marktype" onClick={() => setMarkType("rad")}/></label>
            <label>Guess: <input type="radio" name="marktype" onClick={() => setMarkType("guess")}/></label>
          </fieldset>
        </div>
        <div>
          <form onSubmit={handleAddCharacter}>
            <button>Add character</button>
            <label>Name: <input type="text" name="name"/></label>
            <label>Portrait: <input type="file" name="portrait"/></label>
          </form>
        </div>
        <div><button onClick={handleTestRandom}>Test randomizer</button></div>
        <div>
          <form onSubmit={handleTestGuess}>
            <button>Test guess</button>
            <label>Name: <input type="text" name="name"/></label>
          </form>
        </div>
        <div><button onClick={handleTestScoreboard}>Get scoreboard</button></div>
        <div>
          <form onSubmit={handlePostScore}>
            <button>Post high score</button>
            <label>Time: <input type="number" name="time"/></label>
          </form>
        </div>
      </div>
      <div className="GameArea-image" ref={image} onClick={(e) => mark(clickToPosition(e))}>
        <Marker pos={positionMark} type="pos"/>
        <Marker pos={radiusMark} type="rad"/>
        <Marker pos={guessMark} type="guess"/>
        {charAreasRendered}
      </div>
    </div>
  );
}

function Marker({pos, type}) {
  if (pos === null) {return null}

  return (
    <div className="GameArea-markspot" style={{left: numToCss(pos.x), top: numToCss(pos.y)}}>
      <img className="GameArea-mark" src={MarkerIcon} alt="Mark"/>
      <div className="GameArea-marktype">{type}</div>
    </div>
  );
}

function ClickArea({name, pos, radius}) {
  const diameter = numToCss(Math.sqrt(radius.x * radius.x + radius.y * radius.y) * 2);

  return (
    <div 
      className="GameArea-clickarea"
      style={{left: numToCss(pos.x), top: numToCss(pos.y), width: diameter, height: diameter}}
    >
      <div>{name}</div>
    </div>
  )
}

export default GameAreaDebug;
