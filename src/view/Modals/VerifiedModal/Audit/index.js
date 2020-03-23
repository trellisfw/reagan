import React from 'react'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Table } from 'semantic-ui-react'

import OrgLocation from './OrgLocation'
import ScopeLocation from './ScopeLocation'

function Audit (props) {
  const { data, path } = props;
  return (
    <Table definition>
      <Table.Body css={{fontSize: 16}}>
        {(path == 'organization/location') ? <OrgLocation data={data} /> : null}
        {(path == 'scope/operation/location') ? <ScopeLocation data={data} /> : null}
      </Table.Body>
    </Table>
  )
}

export default Audit
