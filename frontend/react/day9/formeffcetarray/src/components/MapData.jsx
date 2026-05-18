const MapData = () => {
  const fruits = ['Apple', 'Banana', 'Mango']

  return (
    <div className="m-4">
      {fruits.map((item, index) => (
        <h2 key={index} className="border p-2 mb-2 rounded w-32">
          {item}
        </h2>
      ))}
    </div>
  )
}

export default MapData