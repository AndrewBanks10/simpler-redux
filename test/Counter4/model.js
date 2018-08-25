import { consoleSuccess } from '../util'
export const reducerKey = 'counter.35'

const initialUIState = {
  counter: 10
}

export const initialState = initialUIState

let reducerState
export const storeIsDefinedCallback = (store, stateAccessors) => {
  ({ reducerState } = stateAccessors(store, reducerKey, initialState))
}

// This module tests a manually defined mapStateToProps.
export const mapStateToProps = state => {
  return ({
    counter: state[reducerKey].counter
  })
}

// This implements the MSTP caching for a manually defined mapStateToProps.
export const mapStateToPropsReducerKeys = [
  reducerKey
]

export const serviceFunctions = {
  increment: () => {
    let val = reducerState.counter
    reducerState.counter += 10
    if (reducerState.counter !== val + 10) {
      throw new Error(`Expected reducerState.counter to be ${val + 10}.`)
    }
    consoleSuccess(`Verify reducerState.counter is ${val + 10}.`)
  },
  increment2: () => {
    reducerState.counter++
  }
}
