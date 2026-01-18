import React, { useState } from 'react'

function LoginStatus() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <div>
        {isLoggedIn ? (
            <button onClick={()=> setIsLoggedIn(false)}>Logout</button>
        ) : (
            <button onClick={()=> setIsLoggedIn(true)}>Login</button>
        )}
    </div>
  )
}

export default LoginStatus