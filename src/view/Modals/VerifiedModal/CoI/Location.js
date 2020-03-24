import React from 'react'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Icon, Table } from 'semantic-ui-react'

function Location (props) {
  const { data, title } = props
  return (
    <Table.Row>
      <Table.Cell collapsing css={{fontWeight: 'bold'}}>
        {title}
      </Table.Cell>
      <Table.Cell>
        <div>{data.street_address}</div>
        <div>{`${data.city}, ${data.state} ${data.postal_code}`}</div>
        <div>{data.country}</div>
      </Table.Cell>
    </Table.Row>
  )
}

export default Location
