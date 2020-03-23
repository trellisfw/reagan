import React from 'react';

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import overmind from './overmind'

import TopBar from './view/TopBar';
import Content from './view/Content';
import VerifiedModal from './view/Modals/VerifiedModal';
import Login from './Login';

function App() {
  const { state, actions } = overmind();
  if (!state.app.finished) {
    return <Login />
  }
  return (
    <div css={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'stretch'
    }}>

      <TopBar />
      <div css={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch'
      }}>
        <Content />
        <VerifiedModal />
      </div>
    </div>
  );
}

export default App;
