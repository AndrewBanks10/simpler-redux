import { getStateFunction, setStateFunction } from '../../test/test'
import { consoleSuccess } from '../util'
export const reducerKey = 'counter.4'

const getRState = getStateFunction(reducerKey)
const setRState = setStateFunction(reducerKey)

const counter1Key = 'counter1'
const counter2Key = 'counter2'
const counter3Key = 'counter3'

const initialUIState = {
  [counter1Key]: 10,
  [counter2Key]: 10,
  [counter3Key]: 10
}

export const initialState = initialUIState

let getState, setState, reducerState, _store
export const storeIsDefinedCallback = (store, stateAccessors) => {
  ({ getState, setState, reducerState } = stateAccessors(store, reducerKey, initialState))
  _store = store
}

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
    if (_store === undefined) {
      throw new Error('store is not defined.')
    }
    consoleSuccess('Verify store is defined.')
    if (typeof setState !== 'function') {
      throw new Error('setState is not defined.')
    }
    consoleSuccess('Verify setState is defined.')
    if (typeof getState !== 'function') {
      throw new Error('getState is not defined.')
    }
    consoleSuccess('Verify getState is defined.')
    if (reducerState === undefined) {
      throw new Error('reducerState is not defined.')
    }
    consoleSuccess('Verify reducerState is defined.')
  },
  increment1: store =>
    setRState(store, { [counter1Key]: store.getRState(reducerKey)[counter1Key] + 1 }, 'increment1'),
  increment2: () =>
    (reducerState[counter2Key]++),
  increment3: () =>
    setState({ [counter3Key]: getState()[counter3Key] + 1 }, 'increment3')
}
