import React from 'react'

import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <>
            <div className='flex bg-green-300 justify-between'>
                <div>
                    logo
                </div>

                <div className='flex gap-5 mx-5'> 
                    <Link to="/">Home</Link>
                    <Link to="/render">Render</Link>
                </div>
            </div>
        </>

    )
}



export default Navbar