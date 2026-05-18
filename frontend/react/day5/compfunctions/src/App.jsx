import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Student from './components/Student'
import Button from './components/Button'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Student name="Arun" age="20" course="React" />
      <Button text="Click Me" />

      <nav className="p-4">
        <Link to="/">Home</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App