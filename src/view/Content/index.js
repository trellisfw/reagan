import React from 'react';

/** @jsx jsx */
import { jsx } from '@emotion/core'
import overmind from '../../overmind'

import CoI from './CoI'
import Audit from './Audit'
import PDF from './PDF'

function Content() {
  const { actions, state } = overmind()
  const originalResource = state.app.originalResource || {};
  const doc = state.app.document || {};
  return (
    <div css={{
      display: 'flex',
      flexDirection: 'column',
      flex: '1',
      boxShadow: 'inset 5px 5px 5px #dddddd',
      padding: 10,
      alignItems: 'center'
    }}>
      <div css={{height: 30}}/>
      {
        originalResource._type == "application/vnd.trellisfw.audit.sqfi.1+json" ? <Audit audit={originalResource} /> : null
      }
      {
        originalResource._type == "application/vnd.trellisfw.coi.accord+json" ? <CoI /> : null
      }
      {
        doc.pdf ? <PDF oada={state.oada} path={`${state.app.documentId}/pdf`} /> : null
      }
    </div>
  );
}

export default Content;
