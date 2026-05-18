import { useEffect, useState } from 'react'

const FetchData = () => {
  const [data, setData] = useState([])

  const getData = async () => {
    let res = await fetch('https://dummyjson.com/users')
    let result = await res.json()
    setData(result.users)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <table className="border m-4">
      <thead>
        <tr>
          <th className="border px-4 py-2">Name</th>
          <th className="border px-4 py-2">Email</th>
        </tr>
      </thead>

      <tbody>
        {data.slice(0, 5).map((item) => (
          <tr key={item.id}>
            <td className="border px-4 py-2">{item.firstName}</td>
            <td className="border px-4 py-2">{item.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default FetchData