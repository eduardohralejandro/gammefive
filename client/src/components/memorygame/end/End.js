import React, {Fragment} from "react";
import styles from "./end.module.scss";
class End extends React.Component {
  replayGame = () => {
    //this is for this first version, to improve for future versions
    window.location.reload();
  };

  render() {
    return (
      <Fragment>
        <button
          className={styles.btnEnd}
          type="button"
          onClick={() => this.replayGame()}
        >
          play again
        </button>
      </Fragment>
    );
  }
}

export default End;