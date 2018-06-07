/*
  Written by Andrew Banks.
*/
import getReducerKeyProxy from './proxy'

const simplerReduxReducerKey = '@@@@@srReducerKey'
const simplerReduxObjectToMergeKey = '@@@@@srObjectToMergeKey'

const makeSetRState = reduxStore => {
  return (reducerKey, objToMerge, type) => {
    if (type === undefined) {
      type = reducerKey
    }
    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducerKey !== 'string') {
        throw new Error('setRState: The first argument must be a string.')
      }
      if (objToMerge === undefined) {
        throw new Error('setRState: The second argument cannot be undefined.')
      }
      if (typeof type !== 'string') {
        throw new Error('setRState: The third argument must be a string.')
      }
    }

    reduxStore.dispatch({
      [simplerReduxReducerKey]: reducerKey,
      [simplerReduxObjectToMergeKey]: objToMerge,
      type
    })
  }
}

const makeGetRState = reduxStore => {
  return reducerKey => {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducerKey !== 'string') {
        throw new Error('getRState: The first argument must be a string.')
      }
    }
    return reduxStore.getState()[reducerKey]
  }
}

export const registerSimplerRedux = store => {
  let wrappedReduxStore = Object.create(store)
  wrappedReduxStore.setRState = makeSetRState(wrappedReduxStore)
  wrappedReduxStore.getRState = makeGetRState(wrappedReduxStore)
  return wrappedReduxStore
}

export const generalReducer = (reducerKey, initialState) => {
  return (state = { ...initialState }, action) => {
    if (action[simplerReduxReducerKey] === reducerKey) {
      return { ...state, ...action[simplerReduxObjectToMergeKey] }
    }
    return state
  }
}

// This makes it easier to access reducerKey state previously given a reducerKey.
export const getStateFunction = reducerKey =>
  (state, key) =>
    state[reducerKey][key]

// This makes it easier to set reducerKey state previously given a reducerKey.
export const setStateFunction = reducerKey =>
  (store, mergeState, type) =>
    store.setRState(reducerKey, mergeState, type)

const getState = (store, reducerKey) =>
  () => store.getRState(reducerKey)

const setState = (store, reducerKey) =>
  (mergeState, type) => store.setRState(reducerKey, mergeState, type)

//
// Only call this in the storeIsDefinedCallback sent into connectWithStore above.
// Use the store parameter provided in connectWithStore along with the reducerKey in the module.
//
export const stateAccessors = (store, reducerKey, defaultState) => {
  if (process.env.NODE_ENV !== 'production') {
    if (store === undefined) {
      throw new Error('The first parameter (store) to stateAccessors must be defined.')
    }
    if (typeof reducerKey !== 'string') {
      throw new Error('The second parameter (reducerKey) to stateAccessors must be a string.')
    }
  }
  let ret = {
    getState: getState(store, reducerKey),
    setState: setState(store, reducerKey)
  }

  if (defaultState !== undefined) {
    ret.reducerState = getReducerKeyProxy(store, reducerKey, defaultState)
  }

  return ret
}

export const makeSharedModuleKeyName = (key, options) =>
  `${key}${options.id}`
