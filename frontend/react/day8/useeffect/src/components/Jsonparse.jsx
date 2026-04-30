import React, { useEffect, useState } from 'react'

const Jsonparse = () => {

  const [dataGet, setDataGet] = useState([])

  useEffect(()=>{

    const fetchdata = async ()=>{

      const getData = await  fetch("https://dummyjson.com/products")
      const changeData = await getData.json()

      setDataGet(changeData.products)

    }

    fetchdata() 
  },[])


  return (
    <>
    {dataGet.map((e)=>(
      <p key={e.id}> {e.price}</p>
    ))}
    </>
  )
}

export default Jsonparse