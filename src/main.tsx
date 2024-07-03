import React from 'react'
import ReactDOM from 'react-dom/client'
import Wrapper from './app/Album/layout'
import Page from './app/Album/page'
import "./index.css"
import ScaleOverscroll from './app/Widgets/ScaleOverscroll'



ReactDOM.createRoot( document.getElementById("root") as HTMLElement ).render(
  <React.StrictMode>
    <Wrapper params={{ AlbumName:"SMOK_LAYBACK_VOL" }}>
      <Page />
    </Wrapper>
    <ScaleOverscroll />
  </React.StrictMode>,
)
