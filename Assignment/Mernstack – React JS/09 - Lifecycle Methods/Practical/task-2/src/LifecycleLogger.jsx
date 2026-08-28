import React, { Component } from 'react'

class LifecycleLogger extends Component {
    constructor() {
        super();
        this.state = {
            count : 0
        };
    }

    componentDidUpdate() {
        console.log("Component updated")
    }

    componentWillUnmount() {
        console.log("Component unmounted")
    }

  render() {
    return (
      <div>
        <h2>Count : {this.state.count}</h2>
        <button onClick={() => this.setState({ count : this.state.count + 1 })}>
            Update
        </button>
      </div>
    )
  }
}

export default LifecycleLogger