import React from "react";
import "./end.scss";
class End extends React.Component {
  replayGame = () => {
    //this is for this first version, to improve for future versions
    window.location.reload();
  };

  render() {
    return (
      <div>
        <button
          className="btn-end"
          type="button"
          onClick={() => this.replayGame()}
        >
          play again
        </button>
      </div>
    );
  }
}

export default End;