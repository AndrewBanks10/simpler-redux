export const reducerKey = 'counter.66'

export const initialUIState = {
  counter: 10
}

export const initialState = {
  initialUIState,
  cache: null
}

let reducerState
export const storeIsDefinedCallback = (store, stateAccessors) =>
  ({ reducerState } = stateAccessors(store, reducerKey, initialState))

export const serviceFunctions = {
  increment: () => {
    reducerState.counter++
  }
}
