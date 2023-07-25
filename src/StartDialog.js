import noPortrait from "./images/noportrait.png";
import "./styles/StartDialog.css";

function StartDialog({show, characters, handleStart}) {
  if (!show) {
    return null;
  }

  const charactersRendered = characters.map((c) => {
    return <Portrait key={c.name} name={c.name} url={c.portrait}/>;
  });

  return (
    <div className="StartDialog">
      <div className="StartDialog-box">
        <h1>Where's That Meme?</h1>
        <p>
          Look for the following internet legends in the picture.
          When you find them, click on them and then select their name.
          If you need to, you can mouse over the names in the checklist to see their pictures again.
        </p>
        <h2>You're looking for:</h2>
        <ul className="StartDialog-list">
          {charactersRendered}
        </ul>
        <button className="StartDialog-button" onClick={(e) => handleStart()}>Start game</button>
      </div>
    </div>
  )
}

function Portrait({name, url}) {
  return (
    <li>
      <div className="StartDialog-name">{name}</div>
      <img className="StartDialog-pic" src={url || noPortrait} alt={name}/>
    </li>
  )
}

export default StartDialog;
