import { useState } from 'react'

const Register = () => {
  const [name, setName] = useState('')

  const handleSubmit = () => {
    localStorage.setItem('username', name)
  }

  return (
    <div className="m-4 flex gap-3">
      <input
        type="text"
        placeholder="Enter Name"
        className="border px-3 py-2 rounded"
        onChange={(e) => setName(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  )
}

export default Register