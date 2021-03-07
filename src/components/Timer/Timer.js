import { navigate, usePath } from 'hookrouter';
import React, { useRef, useEffect, useReducer } from 'react';
import './Timer.css';

const TOTAL_SIZE = 500;
const TIME_STEP = 0.1;

function handleTime(state, action) {
  if (action.type === 'resetTime') {
    return {
      ...state,
      timeLeft: action.value,
      stepSize: TOTAL_SIZE / (action.value / TIME_STEP),
      status: TOTAL_SIZE
    }
  } else if (action.type === 'updateTime') {
    return {
      ...state,
      timeLeft: state.timeLeft > TIME_STEP ? state.timeLeft - TIME_STEP : 0,
      status: state.status > state.stepSize ? state.status - state.stepSize : 0
    }
  }

  return state;
}

function Timer({ seconds, onChange }) {
  const path = usePath();
  const [{ stepSize, status, timeLeft }, dispatch] = useReducer(handleTime, { stepSize: 0, status: TOTAL_SIZE, timeLeft: seconds });
  const gameScore = useRef(0);
  const displayTime = () => {
    dispatch({ type: "updateTime" })
    gameScore.current += TIME_STEP;
    if (onChange) {
      onChange(gameScore.current);
    }

    localStorage.setItem("gamescore", gameScore.current);
    if (status <= stepSize) {
      gameOver();
    }
  }

  const gameOver = () => {
    navigate(`/retry/${path.split('/')[2]}/${path.split('/')[3]}`);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      status <= 0 ? clearInterval(timer) : displayTime();
    }, TIME_STEP * 1000);
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
