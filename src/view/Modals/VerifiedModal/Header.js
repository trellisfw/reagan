import React from 'react'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import { Header } from 'semantic-ui-react'
import overmind from '../../../overmind'
import _ from 'lodash'
import { Button, Icon } from 'semantic-ui-react'

function MyHeader (props) {
  const { state, actions } = overmind()
  const myState = state.view.Modals.VerifiedModal
  const myActions = actions.view.Modals.VerifiedModal
  return (
    <Header>
      <div css={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        { (state.app.valid) ?
          <div css={{fontSize: 25, color: 'green' }}>
            {'Data Integrity Verified'}
          </div>
          :
          <div css={{fontSize: 25, color: 'red' }}>
            {'WARNING: Could not verify data integrity!'}
          </div>
        }
        <Button icon onClick={()=>myActions.close()}>
          <Icon name='x' />
        </Button>
      </div>
    </Header>
  )
}

export default MyHeader
