import React from 'react'
import Navbar from './components/Navbar'
import NameInput from './components/NameInput'
import EmailInput from './components/EmailInput'
import PasswordInput from './components/PasswordInput'
import UppercaseInput from './components/UppercaseInput'
import CharacterCount from './components/CharacterCount'

const App = () => {
  return (
    <><Navbar /><NameInput /><EmailInput /><PasswordInput /><UppercaseInput /><CharacterCount /></>
  )
}

export default App