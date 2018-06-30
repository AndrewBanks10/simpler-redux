import { consoleSuccess } from '../util'
export const reducerKey = 'counter.15'

export const initialUIState = {
  counter: 10
}

export const initialState = initialUIState

const listener = (moduleReducerKey, objToMerge, type) => {
  if (moduleReducerKey === undefined) {
    throw new Error('listener: Expected moduleReducerKey to be defined.')
  }
  consoleSuccess('Verify moduleReducerKey is defined.')
  if (objToMerge === undefined) {
    throw new Error('listener: Expected objToMerge to be defined.')
  }
  consoleSuccess('Verify objToMerge is defined.')
  if (type === undefined) {
    throw new Error('listener: Expected type to be defined.')
  }
  consoleSuccess('Verify listener is defined.')

  if (moduleReducerKey === reducerKey) {
    if (objToMerge.counter !== 10) {
      throw new Error(`Expected objToMerge.counter to be ${10}.`)
    }
    consoleSuccess(`Verify objToMerge.counter to be ${10}.`)
  }
}

let reducerState
export const storeIsDefinedCallback = (store, stateAccessors) => {
  if (store.addListener === undefined) {
    throw new Error('Expected store.addListener to be defined.')
  }
  ({ reducerState } = stateAccessors(store, reducerKey, initialState))
  store.addListener(listener)
  consoleSuccess('Verify store.listener is defined.')
}

export const serviceFunctions = {
  increment: arg => {
    let val = reducerState.counter
    if (arg !== 10) {
      throw new Error('Expected an argument of 10, tests noStoreParameterOnServiceFunctions.')
    }
    consoleSuccess('Verify an argument of 10, tests noStoreParameterOnServiceFunctions.')
    reducerState.counter += arg
    if (reducerState.counter !== 10 + val) {
      throw new Error(`Expected reducerState.counter to be ${10 + val}.`)
    }
    consoleSuccess(`Verify reducerState.counter is ${10 + val}.`)
  }
}

export const noStoreParameterOnServiceFunctions = true
export const isDynamicReducer = true
