import React from 'react'

export default props =>
  <div>
    <div id='counter35'>Counter: {props.counter}</div>
    <button id='increment35' onClick={() => props.increment()}>Increment</button>
  </div>
