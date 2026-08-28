import { useSelector, useDispatch } from "react-redux"
import { increment } from "./counterSlice";
import './App.css'

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Count : {count}</h2>
      <button onClick={() => dispatch(increment())}>
        Increment
      </button>
    </div>
  )
}

export default App
