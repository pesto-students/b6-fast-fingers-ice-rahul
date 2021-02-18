import React, { useEffect, useReducer } from 'react';
import { Timer, InputText, DropDownList, Dictionary } from '../../components';
import './Game.css'

function manageGame(state, action) {
    const wordBook = [];
    switch (action.type) {
        case 'difficulty':
            const difficultyConfig = DropDownList.filter((val) => val.level === action.value)[0];
            if (!(action.value in wordBook)) {
                wordBook[action.value] = Dictionary.filter((value) => value.length >= difficultyConfig.minWord && value.length <= difficultyConfig.maxWord);
            }
            const generatedWord = wordBook[action.value][Math.floor(Math.random() * wordBook[action.value].length)];
            const difficultyFactor = state.difficultyFactor ? state.difficultyFactor + 0.01 : difficultyConfig.difficultyFactor;
            const allowedTime = Number(generatedWord.length / difficultyFactor).toFixed(2);
            return {
                ...state,
                word: generatedWord,
                difficultyFactor: difficultyFactor,
                seconds: allowedTime
            };
        case 'inputWord':
            return {
                ...state,
                typedWord: action.value,
                reset: action.value !== '' ? false : true
            }
        default:
            return {...state}
    }
}

function Game({ level, onLevelChange, onScoreChange }) {
    const [{ word: wordChallenge, typedWord, reset, seconds, difficultyFactor }, dispatch] = useReducer(manageGame, { reset: false });
    
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
                if (typedWord[idx] && typedWord[idx] === val.innerHTML) {
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
        dispatch({ type: "difficulty", value: level });
    }, [level]);

    return (
        <div className="gameContainer">
            <Timer seconds={seconds} onChange={(score) => onScoreChange(score)}/>
            <div className="wordChallenge">
                {wordChallenge ? wordChallenge.split('').map((val, idx) => (<span className="letters" key={`W-${idx}`}>{val}</span>)) : ''}
            </div>
            <InputText
                reset={reset}
                placeholder="Type The Word Here"
                onChange={(typed) => dispatch({ type: 'inputWord', value: typed })}
            />
        </div>
    );

}

export default Game;