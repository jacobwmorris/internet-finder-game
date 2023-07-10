
function StartDialog({show, characters, handleStart}) {
  if (!show) {
    return null;
  }

  const charactersRendered = characters.map((c) => {
    return <Portrait key={c.name} name={c.name}/>;
  });

  return (
    <div>
      <div>
        <h1>Where's That Meme?</h1>
        <p>
          Look for the following internet legends in the picture.
          When you find them, click on them and then select their name.
        </p>
        <strong>You're looking for:</strong>
        <div>
          {charactersRendered}
        </div>
        <button onClick={(e) => handleStart()}>Start game</button>
      </div>
    </div>
  )
}

function Portrait({name}) {
  //TODO: Get the character's portait from firebase

  return (
    <li>
      <div>{name}</div>
      <img src="#" alt={name}/>
    </li>
  )
}

export default StartDialog;
