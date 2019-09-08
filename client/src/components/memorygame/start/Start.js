import React, { useState } from "react";
import Cards from "../cards/Cards";

const Start = () => {
  const [start, setStart] = useState(false);
  const startGame = () => {
    setStart(true);
  };
  return (
    <div>
      <Cards stateStart={start} start={startGame} />
    </div>
  );
};

export default Start;
