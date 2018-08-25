import React from 'react'

const Counter1 = props =>
  <div>
    <div id='counter4'>Counter: {props.counter}</div>
    <button id='increment4' onClick={props.increment}>Increment</button>
  </div>

export default Counter1
