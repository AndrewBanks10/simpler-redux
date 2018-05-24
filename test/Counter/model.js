import { getStateFunction, setStateFunction, stateAccessors, generalReducer } from '../../test/test'
export const reducerKey = 'counter.4'

const getRState = getStateFunction(reducerKey)
const setRState = setStateFunction(reducerKey)

let getState, setState
export const storeIsDefinedCallback = store =>
  ({ getState, setState } = stateAccessors(store, reducerKey))

const counter1Key = 'counter1'
const counter2Key = 'counter2'
const counter3Key = 'counter3'
const counter4Key = 'counter4'

export const initialState = {
  [counter1Key]: 0,
  [counter2Key]: 0,
  [counter3Key]: 0,
  [counter4Key]: 0
}

export const selectors = {
  getCounter1: state =>
    getRState(state, counter1Key),
  getCounter2: state =>
    getRState(state, counter2Key),
  getCounter3: () =>
    getState(counter3Key),
  getCounter4: () =>
    getState(counter4Key)
}

export const serviceFunctions = {
  increment1: store =>
    setRState(store, { [counter1Key]: store.getRState(reducerKey)[counter1Key] + 1 }, 'increment1'),
  increment2: store =>
    setRState(store, { [counter2Key]: store.getRState(reducerKey)[counter2Key] + 1 }, 'increment2'),
  increment3: () =>
    setState({ [counter3Key]: getState()[counter3Key] + 1 }, 'increment3'),
  increment4: store =>
    setState({ [counter4Key]: getState()[counter4Key] + 1 }, 'increment4')
}

export const reducer = generalReducer(reducerKey, initialState)
