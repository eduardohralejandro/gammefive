import React from "react";
import Timer from "../timer/Timer";
import letters from "../../../letters";
import styles from "./cards.module.scss";
import Helmet from "react-helmet";

class Cards extends React.Component {
  state = {
    urlSource: letters,
    lettersArray: [],
    cardFound: false,
    showPanel: false,
    disableBtn: false,
    audio: null
  };
  componentDidMount() {
    //when component mounts we load an audio file
    // code for future versions
    // const url = "http://k007.kiwi6.com/hotlink/n27i2vh6on/Monkeys_Are_Coming.mp3";
    //  const stream = new Audio(url)
    // setTimeout(this.setState({audio:stream.play()}), 1000)
    //  stream.play();
    // const url = "http://k007.kiwi6.com/hotlink/n27i2vh6on/Monkeys_Are_Coming.mp3";
    //  const stream = new Audio(url)
    //  this.setState({audio:stream})
  }

  shuffel = async type => {
    const getRandomValue = arrayValue => {
      return arrayValue
        .map(x => [Math.random(), x])
        .sort(([a], [b]) => a - b)
        .map(([_, x]) => x);
    };

    if (type === "hard") {
      //set again the state to the initial one
      await this.setState({ urlSource: [...letters] });
      //get a random value & sent a random value to our state
      await this.setState({ urlSource: getRandomValue(letters) });
    }
    //splice the letters array according to the level of the game
    if (type === "medium") {
      this.setState({ urlSource: [...letters] });
      let mediumType = letters.splice(0, 12);
      let arrayMediumType = getRandomValue(mediumType);
      this.setState({ urlSource: arrayMediumType });
    }

    if (type === "easy") {
      let easyType = letters.splice(0, 6);
      let arrayEasyType = getRandomValue(easyType);
      await this.setState({ urlSource: arrayEasyType });
    }

    this.setState({ showPanel: true });
  };

  selectedItem = async (_, element, key) => {
    const { urlSource, lettersArray } = this.state;

    await this.setState({ disableBtn: key });
    await this.setState(prevState => ({
      lettersArray: [...prevState.lettersArray, element]
    }));

    const checkDuplicateValues = letter => {
      let compare = new Set(letter).size !== letter.length;

      if (compare) {
        this.setState({ disableBtn: false });

        this.setState({
          urlSource: urlSource.filter(val => !lettersArray.includes(val))
        });
      } else if (this.state.lettersArray.length === 2 && !compare) {
        setTimeout(() => {
          this.setState({ disableBtn: false });
        }, 1000);
      }
      return compare;
    };
    if (
      this.state.lettersArray.length === 3 &&
      !checkDuplicateValues(this.state.lettersArray)
    ) {
      this.setState({ disableBtn: false });
    }
    if (checkDuplicateValues(this.state.lettersArray)) {
      // for future styling
      // this.setState({ cardFound: key })
    }
    if (this.state.lettersArray.length > 1) {
      this.setState({ lettersArray: [] });
    }
  };

  render() {
    const { urlSource, showPanel } = this.state;

    return (
      <div>
        <Helmet bodyAttributes={{ style: "background-color : #19003e" }} />

        {!showPanel ? (
          <div>
            <div className={styles.startGame}>
              <div className={styles.neonOrange}>Memory</div>
              <div className={styles.neonBlue}>Game</div>
            </div>
            <div className={styles.btnLevels}>
              <button
                className={styles.btnLevelChoices}
                onClick={() => this.shuffel("easy")}
              >
                easy
              </button>
              <button
                className={styles.btnLevelChoices}
                onClick={() => this.shuffel("medium")}
              >
                medium
              </button>
              <button
                className={styles.btnLevelChoices}
                onClick={() => this.shuffel("hard")}
              >
                hard
              </button>
            </div>
          </div>
        ) : null}
        <div className={styles.cardBox}>
          {showPanel
            ? urlSource.map((element, key) => {
                return (
                  <div
                    key={key}
                    style={
                      this.props.stateStart ? null : { pointerEvents: "none" }
                    }
                  >
                    <button
                      className={`${styles.cards} ${
                        this.state.disableBtn === key
                          ? styles.cardsEffect
                          : null
                      }`}
                      disabled={this.state.disableBtn === key ? true : null}
                      style={
                        this.state.disableBtn === key
                          ? { backgroundColor: "#ffff" }
                          : null
                      }
                      onClick={e => this.selectedItem(e, element, key)}
                    >
                      {element}
                    </button>
                  </div>
                );
              })
            : null}
        </div>

        <Timer
          start={this.props.start}
          showPanel={this.state.showPanel}
          urlSource={urlSource}
        />
      </div>
    );
  }
}

export default Cards;
