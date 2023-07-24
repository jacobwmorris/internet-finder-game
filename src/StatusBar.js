import {useState} from "react";
import {timeToString} from "./Helpers";
import checkMark from "./images/check.svg";
import "./styles/StatusBar.css";

function StatusBar({characters, time, handleReset}) {
  const [picOn, setPicOn] = useState(characters.map((c) => false));

  function showPicture(num) {
    setPicOn(picOn.map((p, i) => i === num ? true : p));
  }

  function hidePicture(num) {
    setPicOn(picOn.map((p, i) => i === num ? false : p));
  }

  const charactersRendered = characters.map((c, i) => {
    return (
      <li
        key={c.name}
        className={"StatusBar-checklist-item" + (c.found ? " StatusBar-found" : "")}
        onPointerEnter={(e) => showPicture(i)}
        onPointerLeave={(e) => hidePicture(i)}
      >
        <div className="StatusBar-checkbox">
          {c.found ? <img src={checkMark} alt="Check"/> : null}
        </div>
        <div className="StatusBar-checkname">{c.name}</div>
        {picOn[i] ? <Picture name={c.name} url={c.portrait}/> : null}
      </li>
    );
  });

  <li>
    <div className="StatusBar-checkbox">
      <img/>
    </div>
    <div>
      Name
    </div>
  </li>

  return (
    <div className="StatusBar">
      <ul className="StatusBar-checklist">
        Checklist:
        {charactersRendered}
      </ul>
      <div className="StatusBar-right">
        Time:
        <span className="StatusBar-time">{timeToString(time)}</span>
        <button className="StatusBar-button" onClick={(e) => handleReset()}>Restart game</button>
      </div>
    </div>
  );
}

function Picture({name, url}) {
  return (
    <div className="StatusBar-picture">
      <img src={url} alt={name}/>
    </div>
  );
}

export default StatusBar;
