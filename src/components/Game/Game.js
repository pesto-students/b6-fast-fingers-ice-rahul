import React, { useEffect, useReducer } from 'react';
import { Timer, InputText, DropDownList } from '../../components';
import { CONFIG } from '../../utils/constants';
import { navigate } from 'hookrouter';
import './Game.css'
import { handleGame } from '../../utils/reducers';
import { callApiWithAuth } from '../../utils/functions';
import Loading from '../../assets/images/loading_game.gif';

function Game({ level, onLevelChange, onScoreChange }) {
  const [{ word: wordChallenge, typedWord, reset, seconds, difficultyFactor, placeholder }, dispatch] = useReducer(handleGame, { reset: false, wordBook: [], placeholder: 'Type The Word Here' });

  if (difficultyFactor) {
    let filteredDifficultyFactorList = DropDownList.filter((val) => (difficultyFactor > val.difficultyFactor));
    let difficultyFactorList = filteredDifficultyFactorList[filteredDifficultyFactorList.length - 1];
    if (difficultyFactorList !== undefined && level !== difficultyFactorList.level) {
      onLevelChange(difficultyFactorList.level);
    }
  }

  useEffect(() => {
    const indicateLetters = (letters) => {
      const lettersResult = Array.from(letters).map((val, idx) => {
        if (typedWord[idx] && typedWord[idx].toLowerCase() === val.innerHTML.toLowerCase()) {
          val.style.color = "#54BA18";
          return 1;
        } else if (typedWord[idx] && typedWord[idx] !== val.innerHTML) {
          val.style.color = "#445298";
          return 0;
        } else {
          val.style.color = "#FFFFFF";
          return 0;
        }
      })
      return lettersResult;
    }

    if (typedWord !== undefined) {
      const letters = document.querySelectorAll('.letters');
      const correctLetters = indicateLetters(letters).reduce((total, num) => total + num);
      if (correctLetters === Array.from(letters).length) {
        dispatch({ type: "difficulty", value: level });
        dispatch({ type: 'inputWord', value: '' });
        const newletters = document.querySelectorAll('.letters');
        indicateLetters(newletters);
      }
    }
  }, [level, typedWord]);

  useEffect(() => {
    dispatch({ type:'placeholder', value: 'Your Game is about to start' })
    callApiWithAuth(CONFIG.WORDS, { level: level })
    .then((res) => {
      localStorage.setItem('accessToken', JSON.stringify(res.accessToken));
      dispatch({ type: 'wordBook', value: { [level]: res.result } })
      dispatch({ type: "difficulty", value: level });
      dispatch({ type:'placeholder', value: 'Type The Word Here' })
    })
    .catch((err) => {
      console.log(err);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/login');
    });
  }, [level]);

  return (
    <div className="gameContainer">
    {
      wordChallenge && wordChallenge.length > 0 ?
      <>
        <Timer seconds={seconds} onChange={(score) => onScoreChange(score)} /> 
        <div className="wordChallenge">
          {wordChallenge ? wordChallenge.split('').map((val, idx) => (<span className="letters" key={`W-${idx}`}>{val}</span>)) : ''}
        </div>
        <InputText
          reset={reset}
          placeholder={placeholder}
          onChange={(typed) => dispatch({ type: 'inputWord', value: typed })}
        />
      </> 
      :
      <>
      <img src={Loading} alt="Loading" />
      <div className="wordChallenge">
        Get Ready
      </div>
      </>
    }
    </div>
  );

}

export default Game;