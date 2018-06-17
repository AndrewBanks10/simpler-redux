import React from 'react'

export default props =>
  <div>
    <div id='counter15'>Counter: {props.counter}</div>
    <button id='increment15' onClick={() => props.increment(10)}>Increment</button>
  </div>
