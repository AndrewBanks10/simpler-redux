import { createStore, combineReducers } from 'redux'
import { registerSimplerRedux, generalReducer, stateAccessors } from '../src'

let moduleName = 'testing'
let initialState = {
  testbool: false,
  counter: 0
}

const SET_BUSY = 'SET_BUSY'

const setBusy = () =>
  ({ type: SET_BUSY })

const initialState2 = {
  isBusy: false
}

const reducer = (state = Object.assign({}, initialState2), action) => {
  switch (action.type) {
    case SET_BUSY:
      return Object.assign({}, state, { isBusy: true })
    default:
      return state
  }
}

let reducersObject = {
  [moduleName]: generalReducer(moduleName, initialState),
  reducer: reducer
}

const reduxStore = registerSimplerRedux(createStore(combineReducers(reducersObject)))

reduxStore.dispatch(setBusy())

reduxStore.setRState(moduleName, { testbool: true })

const reducerState = stateAccessors(reduxStore, moduleName, initialState).reducerState

reducerState.counter = 1

reducerState.counter++

console.info(reducerState.counter)

reducerState.testbool = false

const st = reduxStore.getRState(moduleName)

console.info(st)

console.log(reduxStore.getState())
