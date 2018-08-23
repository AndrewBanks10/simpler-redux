export const reducerKey = 'counter.55'

export const initialUIState = {
  counter: 10
}

export const initialState = initialUIState

let reducerState
export const storeIsDefinedCallback = (store, stateAccessors) =>
  ({ reducerState } = stateAccessors(store, reducerKey, initialState))

export const serviceFunctions = {
  increment: () => {
    reducerState.counter++
  }
}
