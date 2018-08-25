import React from 'react'

export default props =>
  <div>
    <div id='counter66'>Counter: {props.counter}</div>
    <button id='increment66' onClick={() => props.increment()}>Increment</button>
  </div>
