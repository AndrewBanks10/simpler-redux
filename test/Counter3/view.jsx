import React from 'react'

export default props =>
  <div>
    <div id='counter25'>Counter: {props.counter}</div>
    <button id='increment25' onClick={() => props.increment()}>Increment</button>
  </div>
