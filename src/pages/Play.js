import React from 'react'
import { Header, Game, Footer, ScoreBoard } from '../components';

function Play({ appData, name, difficulty }) {
  return (
    <div className="Game" style={{ display: appData.pageIndex === 1 ? "block" : "none" }}>
      <Header userName={name} difficulty={difficulty} />
      <div className="gameBody">
        <ScoreBoard />
        <Game />
      </div>
      <Footer leftButton="stop" />
    </div>
  )
}

export default Play;