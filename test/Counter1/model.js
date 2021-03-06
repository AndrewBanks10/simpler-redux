export const reducerKey = 'counter.5'

let hooksCalled = {
  componentDidMount: 0,
  onConstructor: 0,
  onRender: 0,
  componentWillUnmount: 0
}

export const initialState = {
  counter: 10
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
  componentDidMount: store => {
    if (typeof store.setRState === 'function') {
      hooksCalled.componentDidMount++
    }
  },
  componentWillUnmount: store => {
    if (typeof store.setRState === 'function') {
      hooksCalled.componentWillUnmount++
    }
  },
  onConstructor: store => {
    if (typeof store.setRState === 'function') {
      hooksCalled.onConstructor++
    }
  },
  onRender: store => {
    if (typeof store.setRState === 'function') {
      hooksCalled.onRender++
    }
  }
}
