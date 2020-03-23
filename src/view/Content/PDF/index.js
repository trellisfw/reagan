import React from 'react'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Table } from 'semantic-ui-react'

import { Document, Page } from 'react-pdf';


function PDF (props) {
  //Get url and headers for getting access to pdf
  const {oada, path} = props;
  const httpHeaders = {Authorization: 'Bearer '+oada.token}
  const url = `${oada.url}/${path}`
  return (
    <div>
      <Document
        file={
          {
            url,
            httpHeaders
          }
        }
        onLoadSuccess={({numPages}) => {}}>
        <Page className={'pdfPage'} pageNumber={1} width={900} />
      </Document>
    </div>
  )
}

export default PDF
