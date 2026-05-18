import { useState } from 'react'

function EmailInput() {
  const [email, setEmail] = useState('')

  return (
    <div>
      <input
        className=" border-2"
        type="text"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <h2>{email ? email : 'Enter Email'}</h2>
    </div>
  )
}

export default EmailInput