import React from 'react'
import './Card.css'

function Card(props) {
  return (
    <div className='card'>
      <h2>{props.name}</h2>
      <p>Age: {props.age}</p>
      <p>Location: {props.location}</p>
    </div>
  )
}

export default Card