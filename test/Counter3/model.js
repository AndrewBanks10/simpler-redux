import { consoleSuccess } from '../util'
import { buildSelectorsFromUIState } from '../../test/test'
export const reducerKey = 'counter.25'

const initialUIState = {
  counter: 10
}

export const initialState = initialUIState

// Test selectors
export const selectors = buildSelectorsFromUIState(reducerKey, initialUIState)

export const selectorsLisdt = [
  { selectors }
]

let reducerState
export const storeIsDefinedCallback = (store, stateAccessors) => {
  ({ reducerState } = stateAccessors(store, reducerKey, initialState))
}

const serviceFunctions = {
  increment: () => {
    let val = reducerState.counter
    reducerState.counter += 10
    if (reducerState.counter !== val + 10) {
      throw new Error(`Expected reducerState.counter to be ${val + 10}.`)
    }
    consoleSuccess(`Verify reducerState.counter is ${val + 10}.`)
  }
}

export const serviceFunctionList = [
  { serviceFunctions }
]

export const isDynamicReducer = true
