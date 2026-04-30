import React, {useState} from 'react'

const Render = () => {

  const [Count, setCount] = useState(0)

  const countplus = ()=>{
    setCount(Count+1)
  }

  const countminus = ()=>{
    setCount(Count-1)
  }

  const reset =()=>{
    setCount(0)
  }

  return (
    <div className='bg-blue-300 h-screen gap-2 flex flex-col items-center justify-center text-center'>
      <p className=''>{Count}</p>
      <button onClick={countplus}>increase</button>
      <button onClick={countminus}> decrease</button>
      <button onClick={reset}>reset</button>
    </div>
  )
}

export default Render