/*
  Written by Andrew Banks.
*/

const simplerReduxReducerKey = '@@@@@srReducerKey'
const simplerReduxObjectToMergeKey = '@@@@@srObjectToMergeKey'

let listeners = []

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

    listeners.forEach(listener => {
      listener(reducerKey, objToMerge, type)
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

const addListener = listener =>
  listeners.push(listener)

//
// This must be called with the redux store as a parameter after a createStore.
// Then use the return of this function in the react-redux Provider element as the store.
//
export const registerSimplerRedux = reduxStore => {
  let wrappedReduxStore = Object.create(reduxStore)
  wrappedReduxStore.setRState = makeSetRState(wrappedReduxStore)
  wrappedReduxStore.getRState = makeGetRState(wrappedReduxStore)
  wrappedReduxStore.addListener = addListener
  return wrappedReduxStore
}

//
// Call this to generate your reducer.
//
export const generalReducer = (reducerKey, initialState) => {
  if (process.env.NODE_ENV !== 'production') {
    if (reducerKey === undefined) {
      throw new Error('generalReducer: reducerKey must be defined.')
    }
    if (initialState === undefined) {
      throw new Error('generalReducer: initialState must be defined.')
    }
  }
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

// Use this to generate shared module keys.
export const makeSharedModuleKeyName = (key, options) =>
  `${key}${options.id}`
