import React, { useContext, useState, useEffect } from 'react';
import { Timer, InputText, AppContext, DropDownList, Dictionary } from '../../components';
import './Game.css'

function Game() {
    const [appData, setAppData] = useContext(AppContext);
    const difficultyConfig = DropDownList.filter((val) => val.level === appData.difficulty)[0];
    const [wordChallenge, setWordChallenge] = useState(appData[difficultyConfig.level][0]);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const indicateLetters = (letters) => {
            const lettersResult = Array.from(letters).map((val, idx) => {
                if (appData.gameInput[idx] && appData.gameInput[idx] === val.innerHTML) {
                    val.style.color = "#54BA18";
                    return 1;
                } else if (appData.gameInput[idx] && appData.gameInput[idx] !== val.innerHTML) {
                    val.style.color = "#445298";
                    return 0;
                } else {
                    val.style.color = "#FFFFFF";
                    return 0;
                }
            })
            return lettersResult;
        }

        if (appData.gameInput !== undefined) {
            const letters = document.querySelectorAll('.letters');
            const correctLetters = indicateLetters(letters).reduce((total, num) => total + num);
            if (correctLetters === Array.from(letters).length) {
                getRandomValue();
                setAppData((prevValue) => {
                    return {
                        ...prevValue,
                        "gameInput": ""
                    }
                })
                const newletters = document.querySelectorAll('.letters');
                indicateLetters(newletters);
            }
        }
    });

    useEffect(() => {
        if (appData.pageIndex === 1) {
            setAppData((prevValue) => {
                return {
                    ...prevValue,
                    "score": 0
                }
            });
            getRandomValue();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appData.pageIndex]);

    const getRandomValue = () => {
        const randomNumber = Math.random() * appData[difficultyConfig.level].length;
        const index = Math.floor(randomNumber);
        const word = appData[difficultyConfig.level][index];
        setWordChallenge(word);
        const allowedTime = Number(word.length / appData.currentDifficultyFactor).toFixed(2);
        let currentDifficultyFactor = appData.currentDifficultyFactor + 0.01;
        setAppData((prevValue) => {
            return {
                ...prevValue,
                currentDifficultyFactor: appData.currentDifficultyFactor + 0.01
            }
        })
        let filteredDifficultyFactorList = DropDownList.filter((val) => (currentDifficultyFactor > val.difficultyFactor));
        let difficultyFactorList = filteredDifficultyFactorList[filteredDifficultyFactorList.length - 1];
        if (difficultyFactorList !== undefined && appData.difficulty !== difficultyFactorList.level) {
            let filteredList = [];
            if (appData[difficultyFactorList.level]) {
                filteredList = appData[difficultyFactorList.level];
            } else {
                filteredList = Dictionary.filter((val) => val.length >= difficultyFactorList.minWord && val.length <= difficultyFactorList.maxWord);
            }
            setAppData((prevValue) => {
                return {
                    ...prevValue,
                    difficulty: difficultyFactorList.level,
                    [difficultyFactorList.level]: filteredList
                }
            });
        }
        setSeconds(allowedTime > 2 ? allowedTime : 2);
    }

    return (
        <div className="gameContainer">
            <Timer name="gameTimer" seconds={seconds} />
            <div className="wordChallenge">
                {wordChallenge.split('').map((val, idx) => (<span className="letters" key={`W-${idx}`}>{val}</span>))}
            </div>
            <InputText name="gameInput" placeholder="Type The Word Here" />
        </div>
    );

}

export default Game;