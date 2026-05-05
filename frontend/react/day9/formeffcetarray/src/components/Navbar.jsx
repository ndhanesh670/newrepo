import React, { useState } from 'react'
import Register from '../pages/Register'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const [theme, setTheme] = useState(true);

  const changeTheme = () => {
    setTheme(!theme)
  }

  return (
    <>
    <div className= {theme ? 'bg-amber-200 flex justify-between' : 'bg-black flex justify-between text-white'}>
        <div>logo</div>
        <div className='gap-5 p-3 flex ' >
            <Link to="/">form</Link>
            <button onClick={changeTheme}>switch theme</button>
        </div>
    </div>
    </>
  )
}

export default Navbar