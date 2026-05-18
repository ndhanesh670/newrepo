function Button(props) {
  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded">
      {props.text}
    </button>
  )
}

export default Button