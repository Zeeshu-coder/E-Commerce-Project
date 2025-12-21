import React from 'react'
import Navbar from './components/Navbar'
import {BrowserRouter} from "react-router-dom";
import Register from './components/Register';


const App = () => {
  return (
    <>
      <Navbar/>
      <Register/>
      <BrowserRouter>
        
      </BrowserRouter>
    </>
  )
}

export default App
