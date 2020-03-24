import React from 'react'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Table } from 'semantic-ui-react'

import Location from './Location'

function CoI (props) {
  const { data, path } = props;
  return (
    <Table definition>
      <Table.Body css={{fontSize: 16}}>
        {(path == 'producer/location') ? <Location title='Producer Location' data={data} /> : null}
        {(path == 'holder/location') ? <Location title='Holder Location' data={data} /> : null}
        {(path == 'insured/location') ? <Location title='Insured Location' data={data} /> : null}
      </Table.Body>
    </Table>
  )
}

export default CoI
