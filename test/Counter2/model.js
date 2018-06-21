export const reducerKey = 'counter.15'

export const initialUIState = {
  counter: 0
}

export const initialState = initialUIState

const listener = (moduleReducerKey, objToMerge, type) => {
  if (moduleReducerKey === undefined) {
    throw new Error('listener: Expected moduleReducerKey to be defined.')
  }
  if (objToMerge === undefined) {
    throw new Error('listener: Expected objToMerge to be defined.')
  }
  if (type === undefined) {
    throw new Error('listener: Expected type to be defined.')
  }

  if (moduleReducerKey === reducerKey) {
    if (objToMerge.counter !== 10) {
      throw new Error(`Expected objToMerge.counter to be ${10}.`)
    }
  }
}

let reducerState
export const storeIsDefinedCallback = (store, stateAccessors) => {
  if (store.addListener === undefined) {
    throw new Error('Expected store.addListener to be defined.')
  }
  ({ reducerState } = stateAccessors(store, reducerKey, initialState))
  store.addListener(listener)
}

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

export const noStoreParameterOnServiceFunctions = true
