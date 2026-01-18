import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginStatus from './LoginStatus'

function App() {
  const [count, setCount] = useState(0)

  return <LoginStatus />
}

export default App
