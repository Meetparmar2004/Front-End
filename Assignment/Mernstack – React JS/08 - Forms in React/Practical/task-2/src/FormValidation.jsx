import React from 'react'
import { useState } from 'react'

function FormValidation() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!email.includes("@")) {
            setError("Please enter a valid email address");
            return;
        }

        setError("")
        alert(`Name : ${name}\nEmail: ${email}\nPassword: ${password}`);
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <br /><br />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br /><br />

            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default FormValidation