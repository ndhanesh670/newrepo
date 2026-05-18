import { useState } from 'react'

function PasswordInput() {
  const [password, setPassword] = useState('')

  return (
    <div>
      <input
        className=" border-2"
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <h2>{password.length < 6 ? 'Weak' : 'Strong'}</h2>
    </div>
  )
}

export default PasswordInput