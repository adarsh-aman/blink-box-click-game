import React from "react";
import Grid from "../Grid/Grid";
import Popup from "../Popup/Popup";
import "./crossBoard.scss";

class CrossBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {},
      seconds: 120,
      startGame: false,
      gameOver: false,
      score: 0,
      highScore: [],
      highestScore: 0,
    };
    this.timer = 0;
    this.result = 0;
  }

  secondsToTime = (secs) => {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  };

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  handleCallback = (value) => {
    this.result = this.result + value;
    this.setState({
      score: this.result,
    });
  };

  startTimer = () => {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
      this.setState({
        startGame: true,
      });
    }
  };

  countDown = () => {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    if (seconds == 0) {
      this.setState({
        gameOver: true,
      });
      clearInterval(this.timer);
    }
  };

  handleRestart = () => {
    this.timer = 0;
    this.result = 0;
    this.setState(
      {
        gameOver: false,
        seconds: 120,
        highScore: [...this.state.highScore, this.state.score],
        score: 0,
      },
      () => {
        this.startTimer();
      }
    );
  };

  getHighestScore() {
    const { highScore, score } = this.state;
    if (highScore.length > 1) {
      highScore.sort();
      this.setState({ highestScore: highScore[highScore.length - 1] });
    } else {
      this.setState({ highestScore: highScore[0] });
    }
  }

  getHighScore = () => {
    const { highScore, score } = this.state;
    this.setState(
      {
        highScore: [...highScore, score],
      },
      () => {
        this.getHighestScore();
      }
    );
  };

  render() {
    return (
      <div id="app" className='container'>
        {!this.state.startGame ? (
          <div className='game-button'>
            <p>Please click on Button to start the game!</p>
            <button onClick={this.startTimer}>Start Game</button>
          </div>
        ) : (
          <div className="content">
            <div className="timer-div">
              m: {this.state.time.m} s: {this.state.time.s}
            </div>
            <Grid
              width="3"
              height="3"
              parentCallback={this.handleCallback}
            ></Grid>
            <p>Score is: {this.state.score}</p>
          </div>
        )}
        {this.state.gameOver && (
          <Popup
            score={this.state.score}
            handleRestart={this.handleRestart}
            getHighScore={this.getHighScore}
            highestScore={this.state.highestScore}
          />
        )}
      </div>
    );
  }
}

export default CrossBoard;
