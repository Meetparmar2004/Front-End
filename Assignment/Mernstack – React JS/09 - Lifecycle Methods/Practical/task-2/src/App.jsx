import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LifecycleLogger from './LifecycleLogger'

function App() {
  const [show, setShow] = useState(true)

  return (
    <div>
      <button onClick={() => setShow(!show)}>Toggle Component</button>

      {show && <LifecycleLogger />}
    </div>
  )
}

export default App
