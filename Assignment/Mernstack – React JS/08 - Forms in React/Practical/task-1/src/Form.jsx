import React, { useState } from 'react'

function Form() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Name : ${name}\nEmail : ${email}\n Password : ${password}`)
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
            <br /><br />
            <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <br /><br />
            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <br /><br />
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Form