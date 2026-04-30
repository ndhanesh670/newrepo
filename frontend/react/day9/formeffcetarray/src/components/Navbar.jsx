import React from 'react'
import Register from '../pages/Register'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    <div>
        <div>logo</div>
        <div>
            <Link to="/">form</Link>
        </div>
    </div>
    </>
  )
}

export default Navbar