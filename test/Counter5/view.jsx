import React from 'react'

export default props =>
  <div>
    <div id='counter55'>Counter: {props.counter}</div>
    <button id='increment55' onClick={() => props.increment()}>Increment</button>
  </div>
