/*
  Written by Andrew Banks. MIT license.
*/
import { combineReducers } from 'redux'

const simplerReduxReducerKey = '@@@@@srReducerKey'
const simplerReduxObjectToMergeKey = '@@@@@srObjectToMergeKey'

let listeners = []
let listenerId = 0
let currentReducersObject

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

    listeners.forEach(listenerObj => {
      listenerObj.listener(reducerKey, objToMerge, type)
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

const addListener = listener => {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof listener !== 'function') {
      throw new Error('addListener: The first argument must be a function.')
    }
  }
  const id = listenerId++
  listeners.push({ listener, id })
  // Return a function that will remove this listener.
  return () => {
    let i = 0
    for (; i < listeners.length && listeners[i].id !== id; ++i);
    if (i < listeners.length) {
      listeners.splice(i, 1)
    }
  }
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
  initialState = { ...initialState }
  return (state = initialState, action) => {
    if (action[simplerReduxReducerKey] === reducerKey) {
      return { ...state, ...action[simplerReduxObjectToMergeKey] }
    }
    return state
  }
}

// Allows dynamic loading of simpler redux mvc components and their associated reducers.
const buildAddReducer = (store, preloadedState) => {
  return (reducerKey, initialState) => {
    // First load the initial state for the reducer.
    let state = { ...initialState }
    // Then load the preloadedState for the keys that exist in the initial state.
    // Therefore, keys in preloadedState[reducerKey] that are not part of the current
    // state shape in initialState are considered deprecated and are ignored.
    const preloadedStateAtReducerKey = preloadedState[reducerKey]
    if (preloadedStateAtReducerKey !== undefined) {
      Object.keys(preloadedStateAtReducerKey).forEach(key => {
        if (state[key] !== undefined) {
          state[key] = preloadedStateAtReducerKey[key]
        }
      })
    }
    // Generate the reducer for reducerKey.
    const reducer = generalReducer(reducerKey, state)
    // Add the reducer to the current list.
    currentReducersObject = { ...currentReducersObject, [reducerKey]: reducer }
    // Replace the redux reducers with the new list.
    store.replaceReducer(combineReducers(currentReducersObject))
  }
}

//
// This must be called with the redux store as a parameter after a createStore.
// Then use the return of this function in the react-redux Provider element as the store.
// If you pass in a rootReducersObject then you can use simpler-redux dynamic loading of reducers.
// Note: rootReducersObject is the actual reducers object and not the combineReducers output.
// If you want only dynamic reducers, use state => state (null reducer) for the redux createStore reducer
// and { } as the rootReducersObject for the call below.
// If you use rootReducersObject then you should also pass in preloadedState (if it exists).
//
export const registerSimplerRedux = (reduxStore, rootReducersObject, preloadedState = {}) => {
  let wrappedReduxStore = Object.create(reduxStore)
  wrappedReduxStore.setRState = makeSetRState(wrappedReduxStore)
  wrappedReduxStore.getRState = makeGetRState(wrappedReduxStore)
  wrappedReduxStore.addListener = addListener
  // Support for dynamic reducer loading.
  if (rootReducersObject !== undefined) {
    currentReducersObject = { ...rootReducersObject }
    wrappedReduxStore.addReducer = buildAddReducer(wrappedReduxStore, { ...preloadedState })
  } else {
    if (process.env.NODE_ENV !== 'production') {
      wrappedReduxStore.addReducer = () => {
        throw new Error('To call addReducer, you must specify a rootReducersObject in the 2nd argument of registerSimplerRedux which can be just {}.')
      }
    }
  }
  return wrappedReduxStore
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

// Sifts out dynamically loaded reducer keys from the preloaded state in order to avoid
// a redux warning. Use the return of this function to pass into the redux createStore.
export const reducersPreloadedState = (reducersObject, preloadedState) =>
  Object.keys(preloadedState).reduce((obj, key) => {
    if (reducersObject[key] !== undefined) {
      obj[key] = preloadedState[key]
    }
    return obj
  }, {})

export const isDynamicReducerLoading = () =>
  currentReducersObject !== undefined
