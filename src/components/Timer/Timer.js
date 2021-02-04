import React, { useState, useContext, useEffect } from 'react';
import { AppContext, DropDownList } from '../../components';
import './Timer.css';

function Timer({ seconds, name }) {
    const [appData, setAppData] = useContext(AppContext);
    const totalSize = 500;
    const timeStep = 0.1;
    const [stepSize, setStepSize] = useState(0);
    const [status, setStatus] = useState(totalSize);
    const [timeLeft, setTimeLeft] = useState(seconds);

    const displayTime = () => {
        setTimeLeft(timeLeft > timeStep ? timeLeft - timeStep : 0);
        setStatus(status > stepSize ? status - stepSize : 0);
        setAppData((prevValue) => {
            return {
                ...prevValue,
                "score": appData.score + timeStep,
                [name]: status > 0 ? Number(timeLeft).toFixed(2) : status
            }
        });
        if (status <= stepSize) {
            gameOver();
        }
    }

    const gameOver = () => {
        const difficultyConfig = DropDownList.filter((val) => val.level === appData.difficulty)[0];
        let currentScore = {};
        let gameScores = [];
        currentScore.score = appData.score;
        if (appData.gameScores) {
            gameScores = appData.gameScores;
        }
        gameScores.push(currentScore);
        setAppData((prevValue) => {
            return {
                ...prevValue,
                gameScores: gameScores,
                pageIndex: 2,
                currentDifficultyFactor: difficultyConfig.difficultyFactor
            }
        });
    }

    useEffect(() => {
        if (appData.pageIndex === 1) {
            const timer = setInterval(() => {
                status === 0 ? clearInterval(timer) : displayTime();
            }, timeStep * 1000);
            return () => clearInterval(timer)
        }
    })

    useEffect(() => {
        setTimeLeft(seconds);
        setStepSize(totalSize / (seconds / timeStep));
        setStatus(totalSize);
    }, [seconds]);

    return (
        <div className="timerContainer">
            <svg
                className="background-ring"
                width="200"
                height="200">
                <circle
                    className="progress-ring__circle"
                    stroke="#FFFFFFA6"
                    strokeWidth="10"
                    fill="transparent"
                    r="80"
                    cx="100"
                    cy="100" />
            </svg>
            <svg
                className="progress-ring"
                width="200"
                height="200">
                <circle
                    className="progress-ring__circle"
                    stroke="#FF5155"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={`${status}, 502`}
                    strokeLinecap="round"
                    r="80"
                    cx="100"
                    cy="100" />
                <text
                    style={{ fontFamily: 'Gotham', fontSize: '3em' }}
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    stroke="#FFFFFF"
                    fill="#FFFFFF"
                    strokeWidth="2px"
                    dy=".3em">
                    {Number(timeLeft).toFixed(2)}
                </text>
            </svg>
        </div>
    );
}

export default Timer;
