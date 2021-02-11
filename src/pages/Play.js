import React from 'react'
import { Header, Game, Footer, ScoreBoard } from '../components';

function Play({ appData, name, difficulty, setAppData }) {
  return (
    <div className="Game" style={{ display: appData.pageIndex === 1 ? "block" : "none" }}>
      <Header userName={name} difficulty={difficulty} appData={appData} />
      <div className="gameBody">
        <ScoreBoard appData={appData} />
        <Game appData={appData} setAppData={setAppData} />
      </div>
      <Footer leftButton="stop" appData={appData} setAppData={setAppData} />
    </div>
  )
}

export default Play;