/* eslint no-console: 0 */
//
// Handle mocha testing.
//
import { createStore as createReduxStore, combineReducers } from 'redux'
import { consoleTitle } from './util'
const assert = require('assert')
const isEqual = require('lodash/isEqual')

let simplerRedux
// Use the source when testing with the debugger. This is "Debug Mocha Tests" entry.
if (process.env.NODE_ENV === 'debugTesting') {
  consoleTitle('Testing ../src/index.js.')
  simplerRedux = require('../src/index.js')
  // Test the lib version. "Run Mocha Tests" entry.
} else {
  consoleTitle('Testing ../lib/simpler-redux.js.')
  simplerRedux = require('../lib/simpler-redux.js')
}

export const {
  registerSimplerRedux,
  generalReducer,
  connectWithStore,
  allServiceFunctionsToProps,
  allServiceFunctionsToPropsWithStore,
  allStateToProps,
  getStateFunction,
  stateAccessors,
  setStateFunction,
  reducersPreloadedState,
  buildSelectorsFromUIState,
  createModuleData,
  createStore
} = simplerRedux

let reducersObject = {
}

let initialState = {
  boolVal: false,
  intVal: 0,
  stringVal: '',
  objVal: {},
  arrVal: []
}

const numModules = 1000
const baseModuleName = 'module'
const numberStateTransitionsPerKey = 1000

// Total testing of 1,000,000 state transitions on 1000 reducer keys.
consoleTitle(`Total number of redux reducer keys being tested: ${numModules}.`)
consoleTitle(`Total number of redux state transitions per key being tested: ${numberStateTransitionsPerKey}.`)
consoleTitle(`Total number of redux state transitions being tested: ${numModules * numberStateTransitionsPerKey}.`)

for (let i = 0; i < numModules; ++i) {
  let moduleName = `${baseModuleName}${i}`
  reducersObject[moduleName] = generalReducer(moduleName, initialState)
}

const reduxStore = registerSimplerRedux(
  createReduxStore(
    combineReducers(reducersObject)
  ),
  reducersObject
)

describe('Verify setup.', function () {
  it(`The reduxStore is valid.`, function () {
    assert(reduxStore !== 'undefined')
  })
  it(`The redux state should contain ${numModules} keys.`, function () {
    const st = reduxStore.getState()
    assert(Object.keys(st).length === numModules + 1)
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
      assert(isEqual(reduxStore.getRState(moduleName), initialState))
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
      reduxStore.setRState(moduleName, initialState)
    }
    it(`Verify setState performed a state transition (pointer change) on each key state transition=${i}.`, function () {
      for (let i = 0; i < numModules; ++i) {
        let moduleName = `${baseModuleName}${i}`
        assert(reduxStore.getRState(moduleName) !== initialState)
      }
    })
    it(`Verify getState is equal to the new state transition for each key state transition=${i}.`, function () {
      for (let i = 0; i < numModules; ++i) {
        let moduleName = `${baseModuleName}${i}`
        assert(isEqual(reduxStore.getRState(moduleName), initialState))
      }
    })
  }
})

const moduleDataReducer = 'moduleDataReducer'
const moduleData = {
  counter: 0
}
describe(`Test createModuleData`, function () {
  let dataObj = createModuleData(reduxStore, moduleDataReducer, moduleData)
  it(`counter should be 0.`, function () {
    assert(dataObj.getState().counter === 0)
  })
  it(`counter should be 1.`, function () {
    dataObj.setState({counter: 1})
    assert(dataObj.getState().counter === 1)
  })
  it(`counter should be 2.`, function () {
    dataObj.reducerState.counter++
    assert(dataObj.reducerState.counter === 2)
  })
})

describe('Test one reducer.', function () {
  let reduxStoreOneReducer = createStore()
  const testOneReducerKey = 'testOneReducerKey'

  reduxStoreOneReducer.addReducer(testOneReducerKey, initialState)
  it(`The testOneReducerKey is valid.`, function () {
    assert(isEqual(reduxStoreOneReducer.getRState(testOneReducerKey), initialState))
  })

  let preloadedState = {}
  preloadedState[testOneReducerKey] = {
    boolVal: true,
    intVal: 1,
    stringVal: 'foo',
    objVal: {key: 'bar'},
    arrVal: [1]
  }

  let reduxStoreOneReducer2 = createStore(preloadedState)
  reduxStoreOneReducer2.addReducer(testOneReducerKey, initialState)
  it(`The pre-loaded state should be valid.`, function () {
    assert(isEqual(reduxStoreOneReducer2.getRState(testOneReducerKey), { ...preloadedState[testOneReducerKey] }))
  })

  it(`Verify the separation of the two stores.`, function () {
    for (let i = 0; i < numberStateTransitionsPerKey; ++i) {
      reduxStoreOneReducer.setRState(testOneReducerKey, { intVal: i })
      assert(reduxStoreOneReducer.getRState(testOneReducerKey)['intVal'] === i)
      assert(reduxStoreOneReducer.getRState(testOneReducerKey)['intVal'] !==
        reduxStoreOneReducer2.getRState(testOneReducerKey)['intVal']
      )
      reduxStoreOneReducer2.setRState(testOneReducerKey, { intVal: i })
      assert(reduxStoreOneReducer2.getRState(testOneReducerKey)['intVal'] === i)
    }
  })
})
