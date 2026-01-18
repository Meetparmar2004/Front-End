import React from 'react'

function FruitList() {
    const fruits = ["Apple", "Banana", "Mango", "Orange"]
  return (
    <div>
        <ul>
            {fruits.map((fruits, index) => (
                <li key={index}>{fruits}</li>
            ))}
        </ul>
    </div>
  )
}

export default FruitList