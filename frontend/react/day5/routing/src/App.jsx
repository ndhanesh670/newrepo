import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Render from './components/Render'
import { Route,Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/render' element={<Render/>}/>
    </Routes>
    </>
  )
}

export default App