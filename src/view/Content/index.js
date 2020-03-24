import React from 'react';

/** @jsx jsx */
import { jsx } from '@emotion/core'
import overmind from '../../overmind'
import _ from 'lodash'

import CoI from './CoI'
import Audit from './Audit'
import PDF from './PDF'
import ReactJson from 'react-json-view'
import { Button } from 'semantic-ui-react'

function Content() {
  const { actions, state } = overmind()
  const originalResource = state.app.originalResource || {};
  const doc = state.app.document || {};

  var jsonData = null
  if (originalResource) {
    jsonData = _.cloneDeep(originalResource)
    if (jsonData._id) delete jsonData._id
    if (jsonData._rev) delete jsonData._rev
    if (jsonData._type) delete jsonData._type
    if (jsonData._meta) delete jsonData._meta
  }

  return (
    <div css={{
      display: 'flex',
      flexDirection: 'column',
      flex: '1',
      boxShadow: 'inset 5px 5px 5px #dddddd',
      padding: 10,
      alignItems: 'center'
    }}>
      <div css={{height: 20}}/>
      {
        (!state.app.maskedResourceURLVerify) ? null :
        (state.app.valid) ?
        <div css={{fontSize: 25, color: 'green' }}>
          {'Integrity of document verified.'}
        </div>
        :
        <div css={{fontSize: 25, color: 'red' }}>
          {'Could not verify document integrity.'}
        </div>
      }
      <div css={{height: 10}}/>
      {
        originalResource._type == "application/vnd.trellisfw.audit.sqfi.1+json" ? <Audit audit={originalResource} /> : null
      }
      {
        originalResource._type == "application/vnd.trellisfw.coi.accord+json" ? <CoI coi={originalResource} /> : null
      }
      {
        doc.pdf ? <PDF oada={state.oada} path={`${state.app.documentId}/pdf`} /> : null
      }
      {
        (!state.app.showData) ? null :
        <ReactJson
          src={jsonData}
          name={'data'}
          collapsed={1}
          collapseStringsAfterLength={50}
          displayDataTypes={false}
          displayObjectSize={false}
          enableClipboard={false}
        />
      }
      {
        <Button onClick={() => {actions.app.toggleShowData()}}>
          {(state.app.showData) ? 'Hide Data' : 'View Data'}
        </Button>
      }
    </div>
  );
}

export default Content;
