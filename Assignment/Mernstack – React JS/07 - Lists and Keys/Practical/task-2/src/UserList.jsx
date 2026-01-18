import React from 'react'

function UserList() {
    const users = [
        {id: 1,name: "Meet"},
        {id: 2,name: "Rahul"},
        {id: 3,name: "Amit"}
    ]
  return (
    <div>
        <ul>
            {users.map((users) => (
                <li key={users.id}>{users.name}</li>
            ))}
        </ul>
    </div>
  )
}

export default UserList