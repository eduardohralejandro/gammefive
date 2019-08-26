import React from "react";
import Timer from "../timer/Timer";
import letters from "../../../letters";
import "./cards.scss";

class Cards extends React.Component {
  state = {
    urlSource: letters,
    lettersArray: [],
    cardFound: false,
    showPanel: false,
    disableBtn: false
  };
  async componentDidMount() {
    const url = "http://k007.kiwi6.com/hotlink/n27i2vh6on/Monkeys_Are_Coming.mp3";

    const stream = new Audio(url);
    stream.play();
  }
  shuffel = async type => {
    const getRandomValue = arrayValue => {
      return arrayValue
        .map(x => [Math.random(), x])
        .sort(([a], [b]) => a - b)
        .map(([_, x]) => x);
    };

    if (type === "hard") {
      //we set again the state to the initial one
      await this.setState({ urlSource: [...letters] });
      //we get a random value
      await this.setState({ urlSource: getRandomValue(letters) });
    }

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
    console.log(this.state.lettersArray);
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
        {!showPanel ? (
          <div>
            <div className="start-game">
              <div className="neon-orange">Memory</div>
              <div className="neon-blue">Game</div>
            </div>
            <div className="btn-levels">
              <button
                className="btn-choices"
                onClick={() => this.shuffel("easy")}
              >
                easy
              </button>
              <button
                className="btn-choices"
                onClick={() => this.shuffel("medium")}
              >
                medium
              </button>
              <button
                className="btn-choices"
                onClick={() => this.shuffel("hard")}
              >
                hard
              </button>
            </div>
          </div>
        ) : null}
        <div className="card-box">
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
                      className={`cards ${
                        this.state.disableBtn === key ? "cards-effect" : null
                      }`}
                      disabled={this.state.disableBtn === key ? true : null}
                      style={
                        this.state.disableBtn === key
                          ? { backgroundColor: "white" }
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