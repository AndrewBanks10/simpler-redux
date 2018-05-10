/* eslint no-console: 0 */
//
// Handle mocha testing.
//
import { createStore, combineReducers } from 'redux'
const assert = require('assert')
const isEqual = require('lodash/isEqual')

let simpleRedux
// Use the source when testing with the debugger. This is "Debug Mocha Tests" entry.
if (process.env.NODE_ENV === 'debugTesting') {
  simpleRedux = require('../src/simpler-redux.js')
  // Test the lib version. "Run Mocha Tests" entry.
} else {
  simpleRedux = require('../lib/simpler-redux.js')
}

const { register, generalReducer, setState, getState } = simpleRedux

let reducersObject = {
}

let initialState = {
  boolVal: false,
  intVal: 0,
  stringVal: '',
  objVal: {},
  arrVal: []
}

const numModules = 100
const baseModuleName = 'module'
const numberStateTransitionsPerKey = 100

for (let i = 0; i < numModules; ++i) {
  let moduleName = `${baseModuleName}${i}`
  reducersObject[moduleName] = generalReducer(moduleName, initialState)
}

const reduxStore = createStore(combineReducers(reducersObject))

register(reduxStore)

describe('Verify setup.', function () {
  it(`The reduxStore is valid.`, function () {
    assert(reduxStore !== 'undefined')
  })
  it(`The redux state should contain ${numModules} keys.`, function () {
    const st = reduxStore.getState()
    assert(Object.keys(st).length === numModules)
  })
  it(`The redux state should match the ${numModules} defined keys.`, function () {
    const st = reduxStore.getState()
    for (let i = 0; i < numModules; ++i) {
      let moduleName = `${baseModuleName}${i}`
      assert(isEqual(st[moduleName], initialState))
    }
  })
})

describe('Test initial getState.', function () {
  it(`Each getState on the moduleName should match initialState.`, function () {
    for (let i = 0; i < numModules; ++i) {
      let moduleName = `${baseModuleName}${i}`
      assert(isEqual(getState(moduleName), initialState))
    }
  })
})

describe(`Test setState/getState with the number of state transitions on each key=${numberStateTransitionsPerKey}.`, function () {
  for (let i = 0; i < numberStateTransitionsPerKey; ++i) {
    initialState.boolVal = i % 2 === 0
    initialState.intVal = i
    initialState.stringVal = `test${i}`
    initialState.objVal = { a: `test${i}` }
    initialState.intVal = [`test${i}`]
    for (let i = 0; i < numModules; ++i) {
      let moduleName = `${baseModuleName}${i}`
      setState(moduleName, initialState)
    }
    it(`Verify setState performed a state transition (pointer change) on each key state transition=${i}.`, function () {
      for (let i = 0; i < numModules; ++i) {
        let moduleName = `${baseModuleName}${i}`
        assert(getState(moduleName) !== initialState)
      }
    })
    it(`Verify getState is equal to the new state transition for each key state transition=${i}.`, function () {
      for (let i = 0; i < numModules; ++i) {
        let moduleName = `${baseModuleName}${i}`
        assert(isEqual(getState(moduleName), initialState))
      }
    })
  }
})
