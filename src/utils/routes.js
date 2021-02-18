import React from 'react';
import HomePage from '../pages/Home';
import PlayPage from '../pages/Play';
import RetryPage from '../pages/Retry';

const routes = {
    '/': () => <HomePage />,
    '/play/:playerName/:difficulty': ({ playerName, difficulty }) => <PlayPage playerName={playerName} difficulty={difficulty} />,
    '/retry/:playerName/:difficulty': ({ playerName, difficulty }) => <RetryPage playerName={playerName} difficulty={difficulty} />
};

export default routes;