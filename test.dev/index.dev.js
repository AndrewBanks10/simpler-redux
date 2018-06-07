import { createStore, combineReducers } from 'redux'
import { registerSimplerRedux, generalReducer, stateAccessors } from '../src/simpler-redux'

let moduleName = 'testing'
let initialState = {
  testbool: false,
  counter: 0
}
let reducersObject = {
  [moduleName]: generalReducer(moduleName, initialState)
}

const reduxStore = registerSimplerRedux(createStore(combineReducers(reducersObject)))

reduxStore.setRState(moduleName, { testbool: true })

const reducerState = stateAccessors(reduxStore, moduleName, initialState).reducerState

reducerState.counter = 1

reducerState.counter++

console.info(reducerState.counter)

reducerState.testbool = false

const st = reduxStore.getRState(moduleName)

console.info(st)
