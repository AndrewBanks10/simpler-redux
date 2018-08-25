export const reducerKey = 'counter.77'

export const initialState = {
  counter7: 0
}

export const selectors = {
  counter7: state => {
    return state[reducerKey].counter7
  }
}

let reducerState
export const storeIsDefinedCallback = (store, stateAccessors) =>
  ({ reducerState } = stateAccessors(store, reducerKey, initialState))

export const serviceFunctions = {
  increment: () => {
    reducerState.counter7++
  }
}
