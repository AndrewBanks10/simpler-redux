import React from 'react'
import Counter1 from '../Counter1'

const WrapCounter1 = props => {
  if (props.remove) {
    return <div />
  }
  return <Counter1 />
}

export default WrapCounter1
