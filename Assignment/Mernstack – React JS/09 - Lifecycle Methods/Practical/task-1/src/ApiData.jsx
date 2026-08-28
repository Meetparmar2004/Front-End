import React, { Component } from 'react'

class ApiData extends Component {
    constructor() {
        super();
        this.state = {
            users : []
        };
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) => {
            this.setState({ users : data });
        });
    }

  render() {
    return (
      <div>
        <h2>User List</h2>
        <ul>
            {this.state.users.map((user) => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
      </div>
    )
  }
}

export default ApiData