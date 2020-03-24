import React from 'react'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import overmind from '../../../overmind'
import _ from 'lodash'
import moment from 'moment'
import ReactJson from 'react-json-view'
import Audit from './Audit'
import CoI from './CoI'

import { Button } from 'semantic-ui-react'

function Content (props) {
  const { actions, state } = overmind()
  const myActions = actions.view.Modals.VerifiedModal
  const myState = state.view.Modals.VerifiedModal

  var jsonData = null
  var jsonTitle = myState.path;
  if (myState.data) {
    jsonData = _.cloneDeep(myState.data)
    if (jsonData._id) delete jsonData._id
    if (jsonData._rev) delete jsonData._rev
    if (jsonData._type) delete jsonData._type
    if (jsonData._meta) delete jsonData._meta
  }

  return (
    <div>
      <div
        css={{
          color: '#2439FF',
          fontSize: 16,
          marginBottom: 7,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {
          (myState.type == "audit") ? <Audit data={myState.data} path={myState.path} /> : null
        }
        {
          (myState.type == "coi") ? <CoI data={myState.data} path={myState.path} /> : null
        }
        {!myState.showData ? (
          ''
        ) : jsonData == null ? (
          <span>&lt; No Data &gt;</span>
        ) : (
          <ReactJson
            src={jsonData}
            name={jsonTitle}
            collapsed={1}
            collapseStringsAfterLength={50}
            displayDataTypes={false}
            displayObjectSize={false}
            enableClipboard={false}
          />
        )}
        <div css={{display: 'flex'}}>
          <Button onClick={() => {myActions.toggleShowData(_.get(myState, 'documentKey'))}}>
            {(myState.showData) ? 'Hide Data' : 'View Data'}
          </Button>
          <div css={{width: 40}}/>
          <Button onClick={() => {myActions.close()}}>Close</Button>
        </div>
      </div>
    </div>
  )
}

export default Content
