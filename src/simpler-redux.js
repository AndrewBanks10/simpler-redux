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

//
// This must be called with the redux store as a parameter after a createStore.
// Then use the return of this function in the react-redux Provider element as the store.
//
export const registerSimplerRedux = reduxStore => {
  let wrappedReduxStore = Object.create(reduxStore)
  wrappedReduxStore.setRState = makeSetRState(wrappedReduxStore)
  wrappedReduxStore.getRState = makeGetRState(wrappedReduxStore)
  return wrappedReduxStore
}

//
// Call this to generate your reducer.
//
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
// Use the store parameter provided in connectWithStore along with the reducerKey
// in the module.
//
export const stateAccessors = (store, reducerKey, initialState) => {
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

  if (initialState !== undefined) {
    ret.reducerState = getReducerKeyProxy(store, reducerKey, initialState)
  }

  return ret
}

// Use this to generate shared module keys.
export const makeSharedModuleKeyName = (key, options) =>
  `${key}${options.id}`

//
// Builds a model selectors object from uiInitialState.
// uiInitialState should only contain keys that you want in the
// props of the react component.
// This is not for specialized selectors for the UI that require conjunctions or
// selectors from other modules, etc.
// It is only for simple selectors of the nature state => state[reducerKey][stateKey]
//
export const buildSelectorsFromUIState = (reducerKey, uiInitialState) =>
  Object.keys(uiInitialState).reduce((obj, e) => {
    obj[e] = state => state[reducerKey][e]
    return obj
  }, {})
