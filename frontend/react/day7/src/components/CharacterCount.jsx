import { useState } from 'react'

function CharacterCount() {
  const [text, setText] = useState('')

  return (
    <div>
      <input
        className=" border-2"
        type="text"
        placeholder="Enter Text"
        onChange={(e) => setText(e.target.value)}
      />
      <h2>Count: {text.length}</h2>
    </div>
  )
}

export default CharacterCount