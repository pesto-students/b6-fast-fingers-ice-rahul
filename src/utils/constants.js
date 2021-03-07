export const baseUrl = 'https://fast-fingers-backend.herokuapp.com';
//export const baseUrl = 'http://localhost:4000';

export const CONFIG = {
    LOGIN : {
        url: `${baseUrl}/api/login`,
        method: 'POST'
    },
    REGISTER : {
        url: `${baseUrl}/api/register`,
        method: 'POST'
    },
    USER_DETAIL : {
        url: `${baseUrl}/api/`,
        method: 'GET'
    },
    WORDS : {
        url: `${baseUrl}/api/getWords`,
        method: 'POST'
    },
    ADD_SCORE : {
        url: `${baseUrl}/api/addScore`,
        method: 'POST'
    },
    SCOREBOARD : {
        url: `${baseUrl}/api/getScore`,
        method: 'GET'
    },
    QUIT : {
        url: `${baseUrl}/api/quitGame`,
        method: 'GET'
    },
    LOGOUT : {
        url: `${baseUrl}/api/logout`,
        method: 'POST'
    }
}

