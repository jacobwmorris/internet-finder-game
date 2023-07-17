import "./styles/StatusBar.css";
import {timeToString} from "./Helpers";
import checkMark from "./images/check.svg";

function StatusBar({characters, time, handleReset}) {
  const charactersRendered = characters.map((c) => {
    return (
      <li key={c.name} className={"StatusBar-checklist-item" + (c.found ? " StatusBar-found" : "")}>
        {c.found ? <img className="StatusBar-checkmark" src={checkMark}/> : null}
        {c.name}
      </li>
    )
  });

  return (
    <div className="StatusBar">
      <ul className="StatusBar-checklist">
        Checklist:
        {charactersRendered}
      </ul>
      <div className="StatusBar-right">
        Time:
        <span className="StatusBar-time">{timeToString(time)}</span>
        <button onClick={(e) => handleReset()}>Restart game</button>
      </div>
    </div>
  );
}

export default StatusBar;
