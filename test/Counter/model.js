import { getStateFunction, setStateFunction, generalReducer } from '../../test/test'
export const reducerKey = 'counter.4'

const getRState = getStateFunction(reducerKey)
const setRState = setStateFunction(reducerKey)

const counter1Key = 'counter1'
const counter2Key = 'counter2'
const counter3Key = 'counter3'

export const initialUIState = {
  [counter1Key]: 0,
  [counter2Key]: 0,
  [counter3Key]: 0
}

export const initialState = initialUIState

let getState, setState, reducerState
export const storeIsDefinedCallback = (store, stateAccessors) =>
  ({ getState, setState, reducerState } = stateAccessors(store, reducerKey, initialState))

export const selectors = {
  getCounter1: state =>
    getRState(state, counter1Key),
  getCounter2: state =>
    reducerState[counter2Key],
  getCounter3: () =>
    getState(counter3Key)
}

export const serviceFunctions = {
  onConstructor: store => {
    if (typeof store.setRState !== 'function') {
      throw new Error('store is not defined.')
    }
    if (typeof setState !== 'function') {
      throw new Error('setState is not defined.')
    }
  },
  increment1: store =>
    setRState(store, { [counter1Key]: store.getRState(reducerKey)[counter1Key] + 1 }, 'increment1'),
  increment2: () =>
    (reducerState[counter2Key]++),
  increment3: () =>
    setState({ [counter3Key]: getState()[counter3Key] + 1 }, 'increment3')
}

export const reducer = generalReducer(reducerKey, initialState)
