export const reducerKey = 'counter.4'

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
    state[reducerKey][counter1Key],
  getCounter2: state =>
    state[reducerKey][counter2Key],
  getCounter3: state =>
    state[reducerKey][counter3Key],
  getCounter4: state =>
    state[reducerKey][counter4Key]
}

export const serviceFunctions = {
  increment1: store =>
    store.setRState(reducerKey, { [counter1Key]: store.getRState(reducerKey)[counter1Key] + 1 }, 'increment1'),
  increment2: store =>
    store.setRState(reducerKey, { [counter2Key]: store.getRState(reducerKey)[counter2Key] + 1 }, 'increment2'),
  increment3: store =>
    store.setRState(reducerKey, { [counter3Key]: store.getRState(reducerKey)[counter3Key] + 1 }, 'increment3'),
  increment4: store =>
    store.setRState(reducerKey, { [counter4Key]: store.getRState(reducerKey)[counter4Key] + 1 }, 'increment4')
}
