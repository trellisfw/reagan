import React from 'react'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import { Modal } from 'semantic-ui-react'
import overmind from '../../../overmind'

import Header from './Header';
import Content from './Content';

function VerifiedModal(props) {
  const { actions, state } = overmind();
  const myActions = actions.view.Modals.VerifiedModal;
  const myState = state.view.Modals.VerifiedModal;
  return (
    <Modal open={myState.open} onClose={myActions.close}>
      <Header />
      <Modal.Content >
        <div css={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <Content />
        </div>
      </Modal.Content>
    </Modal>
  );
}

export default VerifiedModal
