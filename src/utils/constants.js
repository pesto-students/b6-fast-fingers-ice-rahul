export const baseUrl = 'https://fast-fingers-backend.herokuapp.com';
//export const baseUrl = 'http://localhost:4000';

export const loginUrl = {
    url: `${baseUrl}/api/login`,
    method: 'POST'
};

export const registerUrl = {
    url: `${baseUrl}/api/register`,
    method: 'POST'
};

export const userDetailsUrl = {
    url: `${baseUrl}/api/`,
    method: 'GET'
};

export const getWordsUrl = {
    url: `${baseUrl}/api/getWords`,
    method: 'POST'
}

export const addScoreURL = {
    url: `${baseUrl}/api/addScore`,
    method: 'POST'
};

export const getScoreBoardURL = {
    url: `${baseUrl}/api/getScore`,
    method: 'GET'
};

export const quitGameURL = {
    url: `${baseUrl}/api/quitGame`,
    method: 'GET'
};

export const logOutURL = {
    url: `${baseUrl}/api/logout`,
    method: 'POST'
};
