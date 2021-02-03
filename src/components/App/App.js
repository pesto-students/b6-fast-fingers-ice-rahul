import React, { useContext } from 'react';
import { AppContext } from '../../components';
import Home from '../../pages/Home';
import Play from '../../pages/Play';
import Retry from '../../pages/Retry';
import './App.css';

function App() {

  const [appData, setAppData] = useContext(AppContext);
  const name = "userName";
  const difficulty = "difficulty";

  return (
    <>
      <Home name={name} difficulty={difficulty} appData={appData} setAppData={setAppData} />

      <Play name={name} difficulty={difficulty} appData={appData} />

      <Retry name={name} difficulty={difficulty} appData={appData} setAppData={setAppData} />
    </>
  );
}

export default App;
