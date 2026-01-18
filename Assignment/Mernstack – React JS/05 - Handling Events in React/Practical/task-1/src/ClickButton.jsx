import React, { useState } from 'react'

function ClickButton() {
    const [text, setText] = useState("Not Clicked")
  return (
    <div>
        <p>{text}</p>
        <button onClick={()=>{setText("Clicked!")}}>Click Me</button>
    </div>
  )
}

export default ClickButton