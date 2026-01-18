import React from 'react'
import { useState } from 'react'

function InputForm() {
    const [value, setValue] = useState("")
  return (
    <div>
        <input type="text" placeholder='Type here...' value={value} onChange={(e)=>setValue(e.target.value)}/>
        <p>You typed : {value}</p>
    </div>
  )
}

export default InputForm