import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <strong>Count : {count}</strong>

      <br /><br />
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <br /><br />
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  )
}

export default App
