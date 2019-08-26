import React, { Fragment } from "react";
import End from "../end/End";
import "./timer.scss";

class Timer extends React.Component {
  state = {
    timer: 0,
    time: {},
    seconds: 59,
    startBtn: false
  };

  secondsToTime = secs => {
    let hours = Math.floor(secs / (60 * 60));

    let divisorMinutes = secs % (60 * 60);
    let minutes = Math.floor(divisorMinutes / 60);

    let divisorSeconds = divisorMinutes % 60;
    let seconds = Math.ceil(divisorSeconds);

    let timerInfo = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return timerInfo;
  };

  async componentDidMount() {
    const { seconds } = this.state;

    let timeLeft = this.secondsToTime(seconds);
    this.setState({ time: timeLeft });
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  startTimer = () => {
    const { seconds, timer } = this.state;

    if (timer === 0 && seconds > 0) {
      this.setState({ timer: setInterval(this.countDown, 1000) });
    }
    this.setState({ startBtn: true });
  };

  countDown = () => {
    const { seconds, timer } = this.state;

    let countDownseconds = seconds - 1;
    this.setState({
      time: this.secondsToTime(countDownseconds),
      seconds: countDownseconds
    });

    if (seconds === 1 || this.props.urlSource.length === 0) {
      clearInterval(timer);
    }
  };

  render() {
    const { time } = this.state;
    const { urlSource, showPanel } = this.props;
    const logicGameOver =
      urlSource.length !== 0 && time.s === 0 && time.m === 0;
    return (
      <div>
        {showPanel ? (
          urlSource.length === 0 ? (
            <Fragment>
              <p>Wow congrats, you won</p>
              <End />
            </Fragment>
          ) : (
            <span>
              <div className="clock-box">
                {logicGameOver ? null : (
                  <div className={this.state.startBtn ? "loader" : null}></div>
                )}

                <span
                  style={
                    logicGameOver ? { display: "none" } : { display: "block" }
                  }
                  className="time-numbers"
                >
                  {time.m}:{time.s}
                </span>
              </div>
              {logicGameOver ? (
                <p className="no-more-time-msg">
                  Hey no more time left, maybe try again <End />
                </p>
              ) : null}
              <div className="btn-start-box">
                <button
                  className="btn-start"
                  disabled={this.state.startBtn}
                  onClick={() => {
                    this.startTimer();
                    this.props.start();
                  }}
                >
                  Start
                </button>
              </div>
            </span>
          )
        ) : null}
      </div>
    );
  }
}

export default Timer;
