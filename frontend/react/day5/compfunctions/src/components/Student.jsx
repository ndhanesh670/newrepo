function Student(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.age}</p>
      <p>{props.course}</p>
    </div>
  )
}

export default Student