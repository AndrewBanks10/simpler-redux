import React from 'react'

export default props =>
  <div>
    <div id='counter1'>Counter: {props.counter1}</div>
    <button id='increment1' onClick={props.increment1}>Increment</button>
    <div id='counter2'>Counter: {props.counter2}</div>
    <button id='increment2' onClick={props.increment2}>Increment</button>
    <div id='counter3'>Counter: {props.counter3}</div>
    <button id='increment3' onClick={props.increment3}>Increment</button>
    <div id='counter4'>Counter: {props.counter4}</div>
    <button id='increment4' onClick={props.increment4}>Increment</button>
  </div>
