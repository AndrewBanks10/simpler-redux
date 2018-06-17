import { generalReducer, stateAccessors } from '../../test/test'
export const reducerKey = 'counter.15'

export const initialState = {
  counter: 0
}

let reducerState
export const storeIsDefinedCallback = store =>
  ({ reducerState } = stateAccessors(store, reducerKey, initialState))

export const serviceFunctions = {
  increment: arg => {
    let val = reducerState.counter
    if (arg !== 10) {
      throw new Error('Expected an argument of 10.')
    }
    reducerState.counter += arg
    if (reducerState.counter !== 10 + val) {
      throw new Error(`Expected reducerState.counter to be ${10 + val}.`)
    }
  }
}

export const reducer = generalReducer(reducerKey, initialState)
