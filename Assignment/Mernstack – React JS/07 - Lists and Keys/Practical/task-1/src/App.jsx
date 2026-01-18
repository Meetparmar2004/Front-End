import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FruitList from './FruitList'

function App() {
  const [count, setCount] = useState(0)

  return <FruitList />
}

export default App
