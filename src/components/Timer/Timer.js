import { navigate, usePath } from 'hookrouter';
import React, { useRef, useEffect, useReducer } from 'react';
import './Timer.css';

const totalSize = 500;
const timeStep = 0.1;

function handleTime(state, action) {
    if (action.type === 'resetTime') {
        return {
            ...state,
            timeLeft: action.value,
            stepSize: totalSize / (action.value / timeStep),
            status: totalSize
        }
    } else if (action.type === 'updateTime') {
        return {
            ...state,
            timeLeft: state.timeLeft > timeStep ? state.timeLeft - timeStep : 0,
            status: state.status > state.stepSize ? state.status - state.stepSize : 0
        }
    }

    return state;
}

function Timer({ seconds, onChange }) {
    const path = usePath();
    const [{ stepSize, status, timeLeft }, dispatch] = useReducer(handleTime, { stepSize: 0, status: totalSize, timeLeft: seconds });
    const gameScore = useRef(0);
    const displayTime = () => {
        dispatch({ type: "updateTime" })
        gameScore.current += timeStep;
        if(onChange)
        {
            onChange(gameScore.current);
        }

        localStorage.setItem("gamescore",gameScore.current);
        if (status <= stepSize) {
            gameOver();
        }
    }

    const gameOver = () => {
        let currentScore = {};
        let gameScores = [];
        currentScore.score = gameScore.current;
        if (localStorage.getItem("scores") !== null) {
            gameScores = JSON.parse(localStorage.getItem("scores"));
        }
        gameScores.push(currentScore);
        localStorage.setItem("scores", JSON.stringify(gameScores));
        navigate(`/retry/${path.split('/')[2]}/${path.split('/')[3]}`);
    }

    useEffect(() => {
        const timer = setInterval(() => {
            status <= 0 ? clearInterval(timer) : displayTime();
        }, timeStep * 1000);
        return () => clearInterval(timer)
    });

    useEffect(() => {
        dispatch({ type: "resetTime", value: seconds });
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
