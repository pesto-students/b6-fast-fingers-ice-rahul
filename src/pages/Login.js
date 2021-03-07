import React, { useReducer } from "react";
import { Logo, InputText } from "../components";
import { navigate } from 'hookrouter';
import { CONFIG } from '../utils/constants';
import { handleState } from '../utils/reducers';
import { callApi } from '../utils/functions';

function Login() {
  const [{ name, email, password, loading, msg, msgType, page }, dispatch] = useReducer(handleState, { name: '', email: '', password: '', loading: false, msg: false, page: 'register', msgType: 'err' });
  let accessToken = '';
  let refreshToken = '';

  function registerUser() {
    dispatch({ type: 'loading', value: true });
    callApi(CONFIG.REGISTER.url, { name: name, email: email, password: password })
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
      })
      .finally(() => {
        dispatch({ type: 'loading', value: false })
      });
  }

  function loginUser() {
    dispatch({ type: 'loading', value: true });
    callApi(CONFIG.LOGIN.url, { email: email, password: password })
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
      })
      .finally(() => {
        dispatch({ type: 'loading', value: false })
      });
  }

  function togglePage() {
    const toggledPage = page === 'register' ? 'login' : 'register';
    dispatch({ type: 'page', value: toggledPage });
    dispatch({ type: 'error', value: false });
  }

  function SubmitButton({ type }) {
    return (
      <div className="submit" onClick={type}>
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
        loading ? <Loading /> : <SubmitButton type={page === 'register' ? registerUser : loginUser}/>
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