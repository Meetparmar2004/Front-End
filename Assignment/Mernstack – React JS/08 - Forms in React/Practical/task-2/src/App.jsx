import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FormValidation from './FormValidation'

function App() {
  const [count, setCount] = useState(0)

  return <FormValidation />
}

export default App
