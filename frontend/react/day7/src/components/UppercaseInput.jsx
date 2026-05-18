import { useState } from 'react'

function UppercaseInput() {
  const [text, setText] = useState('')

  return (
    <div>
      <input
        className=" border-2"
        type="text"
        placeholder="Enter Text"
        onChange={(e) => setText(e.target.value)}
      />
      <h2>{text.toUpperCase()}</h2>
    </div>
  )
}

export default UppercaseInput