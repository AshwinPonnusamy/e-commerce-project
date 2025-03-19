import React from 'react'
import Router from './route/MainRoutes'
import { BrowserRouter } from 'react-router-dom'


const App = () => {
  return (
    <>
    <BrowserRouter>
      <Router />
      </BrowserRouter>
    </>
  )
}

export default App