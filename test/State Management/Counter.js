import { getStateFunction, setStateFunction } from '../../test/test'
export const reducerKey = 'counter.4'

const getState = getStateFunction(reducerKey)
const setState = setStateFunction(reducerKey)

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
    getState(state, counter1Key),
  getCounter2: state =>
    getState(state, counter2Key),
  getCounter3: state =>
    getState(state, counter3Key),
  getCounter4: state =>
    getState(state, counter4Key)
}

export const serviceFunctions = {
  increment1: store =>
    setState(store, { [counter1Key]: store.getRState(reducerKey)[counter1Key] + 1 }, 'increment1'),
  increment2: store =>
    setState(store, { [counter2Key]: store.getRState(reducerKey)[counter2Key] + 1 }, 'increment2'),
  increment3: store =>
    setState(store, { [counter3Key]: store.getRState(reducerKey)[counter3Key] + 1 }, 'increment3'),
  increment4: store =>
    setState(store, { [counter4Key]: store.getRState(reducerKey)[counter4Key] + 1 }, 'increment4')
}
