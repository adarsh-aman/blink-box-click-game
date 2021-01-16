import React, { useState } from "react";
import "../../scss/index.scss";

const Popup = ({ score, handleRestart, getHighScore, highestScore }) => {
  let [endmessage, setEndMessage] = useState(false);

  function handleEnd() {
    getHighScore();
    setEndMessage(true);
  }
  return (
    <div className="popup">
      <div className="popup_inner">
        {endmessage && (
          <div className="highscore-div">
            Your high score is : {score > highestScore ? score : highestScore}
          </div>
        )}
        {endmessage ? (
          <h1>Thanks for Playing</h1>
        ) : (
          <h1>You have scored: {score}</h1>
        )}
        {!endmessage && (
          <div className="buttonWrapper">
            <button onClick={handleRestart}>Restart Game!</button>
            <button onClick={handleEnd}>End Game</button>
            <p>Note: Click on End Game button to know your highscore!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
