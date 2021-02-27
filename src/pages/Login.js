import React, { useReducer } from "react";
import { Logo, InputText } from "../components";
import { navigate } from 'hookrouter';
import { registerUrl, loginUrl } from '../utils/constants';

function updateState(state, action) {
    switch (action.type) {
        case 'name': return {
            ...state,
            name: action.value
        }
        case 'email': return {
            ...state,
            email: action.value
        }
        case 'password': return {
            ...state,
            password: action.value
        }
        case 'loading': return {
            ...state,
            loading: action.value
        }
        case 'page': return {
            ...state,
            page: action.value
        }
        case 'error': return {
            ...state,
            msg: action.value,
            msgType: 'err'
        }
        case 'success': return {
            ...state,
            msg: action.value,
            msgType: 'success'
        }
        default: return {
            name: '',
            email: '',
            password: '',
        }
    }
}

function Login() {
    const [{ name, email, password, loading, msg, msgType, page }, dispatch] = useReducer(updateState, { name: '', email: '', password: '', loading: false, msg: false, page: 'register', msgType:'err' });
    let accessToken = '';
    let refreshToken = '';

    function callApi(url, body) {
        dispatch({ type: 'loading', value: true });
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then((res) => res.json())
            .catch((err) => {
                console.log(err);
//                dispatch({ type: 'error', value: err })
            })
            .finally(() => {
                dispatch({ type: 'loading', value: false })
            });
    }

    function registerUser() {
        callApi(registerUrl.url, { name: name, email: email, password: password })
            .then((res) => {
                if (!res.status) {
                    dispatch({ type: 'error', value: res.msg });
                } else {
                    dispatch({ type: 'error', value: false });
                    dispatch({ type: 'page', value: 'login' });
                    dispatch({ type: 'success', value: res.msg });
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch({ type: 'error', value: err })
            });
    }

    function loginUser() {
        callApi(loginUrl.url, { email: email, password: password })
            .then((res) => {
                if (!res.status) {
                    dispatch({ type: 'error', value: res.msg });
                } else {
                    accessToken = JSON.stringify(res.accessToken);
                    refreshToken = JSON.stringify(res.refreshToken);
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    navigate('/');
                }
            })
            .catch((err) => {
                console.log(err);
//                dispatch({ type: 'error', value: err })
            });
    }

    function togglePage() {
        const toggledPage = page === 'register' ? 'login' : 'register';
        dispatch({ type: 'page', value: toggledPage });
        dispatch({ type: 'error', value: false });
    }

    function SubmitButton() {
        return (
            <div className="submit" onClick={page === 'register' ? registerUser : loginUser}>
                {page}
            </div>)
    }

    function Loading() {
        return (
            <div className="submit">
                Loading ...
            </div>)
    }

    function Msg({ type }) {
        return (
            <div className={type}>
                {msg}
            </div>)
    }

    return (
        <div className="App" >
            <Logo />

            {
                page === 'register' ?
                    <InputText
                        placeholder="Type Your Name"
                        onChange={(playerName) => dispatch({ type: 'name', value: playerName })}
                    /> : ''
            }
            <InputText
                placeholder="Type Your Email"
                type="email"
                onChange={(playerEmail) => dispatch({ type: 'email', value: playerEmail })}
            />
            <InputText
                placeholder="Type Your Password"
                type="password"
                onChange={(playerPassword) => dispatch({ type: 'password', value: playerPassword })}
            />
            {
                msg ? <Msg type={msgType} /> : ''
            }
            {
                loading ? <Loading /> : <SubmitButton />
            }
            {
                page === 'register' ?
                    <div className="login" onClick={togglePage}>
                        Already a user? Login Here
                </div> :
                    <div className="login" onClick={togglePage}>
                        New user? Register Here
                </div>
            }

        </div>
    );
}

export default Login;