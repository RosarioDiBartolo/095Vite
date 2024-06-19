import React from 'react'
import ReactDOM from 'react-dom/client'
import Wrapper from './app/[AlbumName]/layout'
import Page from './app/[AlbumName]/page'
import "./index.css"
ReactDOM.createRoot( document.getElementById("root") as HTMLElement ).render(
  <React.StrictMode>
    <Wrapper params={{ AlbumName:"SMOK_LAYBACK_VOL" }}>
      <Page />
    </Wrapper>
  </React.StrictMode>,
)
