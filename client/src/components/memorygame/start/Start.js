import React, { useState } from "react";
import Cards from "../cards/Cards";
import "./start.scss";

const Start = () => {
  const [start, setStart] = useState(false);
  const startGame = () => {
    setStart(true);
  };
  return (
    <div>
      <Cards stateStart={start} start={startGame} />
      {/* <p className="volume-up">volume up</p> */}
    </div>
  );
};

export default Start;
