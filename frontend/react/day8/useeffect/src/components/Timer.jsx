import { useEffect, useState } from 'react'

function Timer() {
  const [time, setTime] = useState(0)

  useEffect(() => {
    setInterval(() => {
      if (time === 10) {
        setTime(0)
      } else {
        setTime(time + 1)
      }
    }, 1000)
  }, [time])

  return <h1>{time}</h1>
}

export default Timer