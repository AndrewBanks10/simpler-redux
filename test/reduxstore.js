import reducersObject from './reducers'
import { createStore, combineReducers } from 'redux'
import { registerSimplerRedux, reducersPreloadedState } from './test'

export let mstpCacheHits = 0
export let mstpCalcs = 0

// These below have been set to an initialization in the modules that would cause failure.
// So, the preloadedState sets them to the correct initialization proving that
// the preloadedState works properly.
const preloadedState = {
  'counter.15': { counter: 0 },
  'counter.4': { counter1: 0, counter2: 0, counter3: 0 },
  'counter.5': { counter: 0 },
  'counter.10': { remove: false }
}

const mapStateToPropsCalc = obj => {
  mstpCalcs++
}

const mapStateToPropsCache = obj => {
  mstpCacheHits++
}

const options = {
  mapStateToPropsCalc,
  mapStateToPropsCache
}

const store = registerSimplerRedux(
  createStore(
    combineReducers(reducersObject),
    reducersPreloadedState(reducersObject, preloadedState) // Removes dynamically loaded reducer keys.
  ),
  reducersObject, // Allows dynamic reducer loading.
  preloadedState, // Tests preloaded state on the dynamic loaded reducers.
  options // Options
)

export default store
