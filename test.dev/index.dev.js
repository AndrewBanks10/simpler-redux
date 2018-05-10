import { createStore, combineReducers } from 'redux'
import { register, generalReducer, setState, getState } from '../src/simpler-redux.js'

let moduleName = 'testing'
let initialState = {
  testbool: false
}
let reducersObject = {
  [moduleName]: generalReducer(moduleName, initialState)
}

const reduxStore = createStore(combineReducers(reducersObject))

register(reduxStore)

setState(moduleName, { testbool: true })

const st = getState(moduleName)

console.info(st)
