import {useState, useRef, useEffect} from "react";
import {numToCss, clickToPosition} from "./PositionFuncs";
import MarkerIcon from "./images/marker.svg";
import "./styles/GameArea.css";

function GameAreaDebug({characters, handleCharFound}) {
  const [positionMark, setPositionMark] = useState(null);
  const [radiusMark, setRadiusMark] = useState(null);
  const [guessMark, setGuessMark] = useState(null);
  const [markType, setMarkType] = useState("pos");
  const image = useRef(null);

  function mark(pos) {
    switch (markType) {
      case "pos": setPositionMark(pos); break;
      case "rad": setRadiusMark(pos); break;
      case "guess": setGuessMark(pos); break;
      default: break;
    }
  }

  return (
    <div className="GameArea">
      <div className="GameArea-debugcontrols">
        <div>
          <fieldset>
            <legent>Mark</legent>
            <label>Position: <input type="radio" name="marktype" onClick={() => setMarkType("pos")}/></label>
            <label>Radius: <input type="radio" name="marktype" onClick={() => setMarkType("rad")}/></label>
            <label>Guess: <input type="radio" name="marktype" onClick={() => setMarkType("guess")}/></label>
          </fieldset>
        </div>
        <div>
          <form>
            <button>Add character</button>
            <label>Name: <input type="text" name="name"/></label>
            <label>Portrait: <input type="file" name="portrait"/></label>
          </form>
        </div>
        <div><button>Test randomizer</button></div>
        <div>
          <form>
            <button>Test guess</button>
            <label>Name: <input type="text" name="name"/></label>
          </form>
        </div>
        <div><button>Get scoreboard</button></div>
        <div>
          <form>
            <button>Post high score</button>
            <label>Time: <input type="number" name="time"/></label>
          </form>
        </div>
      </div>
      <div className="GameArea-image" ref={image} onClick={(e) => mark(clickToPosition(e))}>
        <Marker pos={positionMark} type="pos"/>
        <Marker pos={radiusMark} type="rad"/>
        <Marker pos={guessMark} type="guess"/>
      </div>
    </div>
  );
}

function Marker({pos, type}) {
  if (pos === null) {return null}

  return (
    <div className="GameArea-markspot" style={{left: numToCss(pos.x), top: numToCss(pos.y)}}>
      <img className="GameArea-mark" src={MarkerIcon} alt="Mark"/>
      <div>{type}</div>
    </div>
  );
}

export default GameAreaDebug;
