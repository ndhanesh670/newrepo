import { useRef, useState } from "react"

const UseRefTasks = () => {
  const inputRef = useRef(null)
  const valueRef = useRef(null)
  const clearRef = useRef(null)
  const prevRef = useRef(0)
  const intervalRef = useRef(null)

  const [count, setCount] = useState(0)
  const [time, setTime] = useState(0)

  const focusInput = () => {
    inputRef.current.focus()
  }

  const showValue = () => {
    console.log(valueRef.current.value)
  }

  const clearInput = () => {
    clearRef.current.value = ""
  }

  const increase = () => {
    prevRef.current = count
    setCount(count + 1)
  }

  const start = () => {
    if (intervalRef.current) return
    intervalRef.current = setInterval(() => {
      setTime((t) => t + 1)
    }, 1000)
  }

  const stop = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }

  return (
    <div className="p-4 space-y-6">

      <div>
        <h2>1. Focus Input</h2>
        <input ref={inputRef} className="border" />
        <button onClick={focusInput} className="ml-2 border px-2">
          Focus
        </button>
      </div>

      <div>
        <h2>2. Get Value</h2>
        <input ref={valueRef} className="border" />
        <button onClick={showValue} className="ml-2 border px-2">
          Submit
        </button>
      </div>

      <div>
        <h2>3. Clear Input</h2>
        <input ref={clearRef} className="border" />
        <button onClick={clearInput} className="ml-2 border px-2">
          Clear
        </button>
      </div>

      <div>
        <h2>4. Previous Value</h2>
        <p>Current: {count}</p>
        <p>Previous: {prevRef.current}</p>
        <button onClick={increase} className="border px-2">
          Add
        </button>
      </div>

      <div>
        <h2>5. Timer</h2>
        <p>{time}</p>
        <button onClick={start} className="border px-2 mr-2">
          Start
        </button>
        <button onClick={stop} className="border px-2">
          Stop
        </button>
      </div>

    </div>
  )
}

export default UseRefTasks