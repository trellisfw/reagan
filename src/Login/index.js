import React from 'react';

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import _ from 'lodash'
import overmind from '../overmind'
import { Input, Button, Form, Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import config from '../config';

function Login() {
  const { state, actions } = overmind();
  const appState = state.app;
  const myState = state.login;
  const myActions = actions.login;
  return (
    <div css={css`
      height: 100vh;
      width: 100vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `}>
    <img css={{
      height: 100,
      marginBottom: 25
    }} src={`logo.svg`} alt="logo" />
    <img css={{
      height: 100,
      marginBottom: 25
    }} src={`magnify.svg`} alt="logo" />
    <div css={{fontSize: 20, paddingBottom: 100}}>{'Verifying your data...'}</div>
    <a css={css`
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 1.2em;
        color: #FFFFFF;
        cursor: pointer;
      `}
      onClick={myActions.logout}>
      Logout
    </a>
    </div>
  );
}

export default Login;
