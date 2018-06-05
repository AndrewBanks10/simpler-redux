import { generalReducer } from '../../test/test'
export const reducerKey = 'counter.5'

let hooksCalled = {
  componentDidMount: 0,
  onConstructor: 0,
  onRender: 0,
  componentWillUnmount: 0
}

export const initialState = {
  counter: 0
}

export const selectors = {
  counter: state => {
    return state[reducerKey].counter
  },
  hooksCalled: () => hooksCalled
}

export const serviceFunctions = {
  increment: store =>
    store.setRState(reducerKey, { counter: store.getRState(reducerKey).counter + 1 }, 'increment'),
  componentDidMount: store => hooksCalled.componentDidMount++,
  componentWillUnmount: () => hooksCalled.componentWillUnmount++,
  onConstructor: store => hooksCalled.onConstructor++,
  onRender: store => hooksCalled.onRender++
}

export const reducer = generalReducer(reducerKey, initialState)
