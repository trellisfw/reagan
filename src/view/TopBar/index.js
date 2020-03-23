import React from 'react';

/** @jsx jsx */
import { jsx } from '@emotion/core'

import { Button, Dropdown } from 'semantic-ui-react'
import overmind from '../../overmind'
import config from '../../config';


function TopBar() {
  const { actions, state } = overmind();
  const skin = state.app.skin;
  return (
    <div css={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
      minHeight: '85px',
      borderBottom: '1px solid #979797'
    }}>
      <img css={{
        height: '70px',
        paddingLeft: '20px'
      }} src={'logo.svg'} alt="logo" />
      <div css={{marginRight: 50}}>
          <Dropdown text={state.login.name}>
            <Dropdown.Menu>
              <Dropdown.Item icon='power' text='Logout' value='logout' onClick={actions.view.TopBar.logout} />
            </Dropdown.Menu>
          </Dropdown>
      </div>
    </div>
  );
}

export default TopBar;
