import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useRef } from 'react'

function App() {
  const renderCount = useRef(0)
  const [count, setCount] = useState(0)

  renderCount.current += 1;

  return (
    <div>
      <h2>State Count : {count}</h2>
      <p>Component Rendered : {renderCount.current} times</p>

      <button onClick={() => setCount(count + 1)}>
        Update State (Re-render)
      </button>
    </div>
  )
}

export default App
