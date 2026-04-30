import React from 'react'
import { useState } from 'react'

const Home = () => {

  const [use, setUse] = useState(false)

  const btnClick = () => {
    setUse(!use)
  }

  const [option, setOption] = useState(false)

  const opClick = () => {
    setOption(!option)
  }



  return (<>
    <div className='flex flex-col items-center justify-center gap-3 p-3 h-50 bg-gray-600'>
      <p className='text-white'>Conditional Rendering</p>
      <p>{use ? <p className='bg-green-400 text-white'>TRUE</p> : <p className='bg-red-500 '>FALSE</p>}</p>
      <button onClick={btnClick} className='bg-black text-white'>button</button>

    </div>
    <div className='bg-amber-300 flex flex-col items-center justify-center gap-3 h-50'>
      <p>optional rendering</p>
      <div>
        {option&&<p>TRUE</p>}
      </div>
      <button onClick={opClick} className=''>CLICK</button>

    </div>

  </>

  )
}

export default Home