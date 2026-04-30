import React from 'react'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Register/>}/>
    </Routes>
    </>
  )
}

export default App