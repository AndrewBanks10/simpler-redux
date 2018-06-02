import React from 'react'
import { connectWithStore } from '../../test/test'

const testId = 'testId'

// This tests that refs work properly.
class AddItem extends React.Component {
  render () {
    return (
      <div>
        <input
          ref='selector'
          type='text'
          id={testId}
          defaultValue={20}
        />
      </div>
    )
  }
}

const AddItemTest = connectWithStore({ uiComponent: AddItem, reduxOptions: { withRef: true } })

export default class SimpleReduxJavascript extends React.Component {
  componentDidMount () {
    const addItem = this.refs['AddItem']
    const element = addItem.getWrappedInstance().refs['selector']
    if (typeof element.focus !== 'function') {
      throw new Error('Ref failed in AddItemTest1')
    }
    if (element.id !== testId) {
      throw new Error('Ref failed in AddItemTest2')
    }
    if (element.type.toUpperCase() !== 'TEXT') {
      throw new Error('Ref failed in AddItemTest3')
    }
  }
  render () {
    return (
      <div>
        <div id='counter1'>Counter: {this.props.counter1}</div>
        <button id='increment1' onClick={this.props.increment1}>Increment</button>
        <div id='counter2'>Counter: {this.props.counter2}</div>
        <button id='increment2' onClick={this.props.increment2}>Increment</button>
        <div id='counter3'>Counter: {this.props.counter3}</div>
        <button id='increment3' onClick={this.props.increment3}>Increment</button>
        <AddItemTest ref={'AddItem'} />
      </div>
    )
  }
}
