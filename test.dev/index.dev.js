import { createStore, combineReducers } from 'redux'
import { registerSimplerRedux, generalReducer } from '../src/simpler-redux.js'

let moduleName = 'testing'
let initialState = {
  testbool: false
}
let reducersObject = {
  [moduleName]: generalReducer(moduleName, initialState)
}

const reduxStore = registerSimplerRedux(createStore(combineReducers(reducersObject)))

reduxStore.setRState(moduleName, { testbool: true })

const st = reduxStore.getRState(moduleName)

console.info(st)
