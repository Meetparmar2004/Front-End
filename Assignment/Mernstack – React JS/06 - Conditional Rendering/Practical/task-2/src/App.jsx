import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import VoteEligibility from './VoteEligibility'

function App() {
  const [count, setCount] = useState(0)

  return <VoteEligibility age={20}/>
}

export default App
