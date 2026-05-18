import { useState } from 'react'

function NameInput() {
  const [name, setName] = useState('')

  return (
    <div>
      <input
        className=" border-2"
        type="text"
        placeholder="Enter Name"
        onChange={(e) => setName(e.target.value)}
      />
      <h2>{name}</h2>
    </div>
  )
}

export default NameInput