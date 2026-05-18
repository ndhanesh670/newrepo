function Navbar() {
  return (
    <nav className="flex justify-between p-4 bg-black text-white">
      <h1>Logo</h1>
      <ul className="flex gap-4">
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
  )
}

export default Navbar