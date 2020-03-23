import React from 'react'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import { Header } from 'semantic-ui-react'
import overmind from '../../../overmind'
import _ from 'lodash'

function MyHeader (props) {
  const { state } = overmind()
  const myState = state.view.Modals.VerifiedModal
  return (
    <Header>
      <div css={{display: 'flex', justifyContent: 'space-between'}}>
        <div>{'Data Integrity Verified'}</div>
      </div>
    </Header>
  )
}

export default MyHeader
