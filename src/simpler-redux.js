/*
  Written by Andrew Banks.
*/

// 25 lines without blanks, comments and argument checks.
let reduxStore

const register = store =>
  (reduxStore = store)

const setState = (reducerKey, objToMerge, type) => {
  if (typeof type === 'undefined') {
    type = reducerKey
  }
  if (process.env.NODE_ENV !== 'production') {
    if (typeof reduxStore === 'undefined') {
      throw new Error('setReduxStore must be called before calling setState.')
    }
    if (typeof reducerKey !== 'string') {
      throw new Error('setState: The first argument must be a string.')
    }
    if (typeof objToMerge === 'undefined') {
      throw new Error('setState: The second argument cannot be undefined.')
    }
    if (typeof type !== 'string') {
      throw new Error('setState: The third argument must be a string.')
    }
  }

  reduxStore.dispatch({
    reducerKey,
    objToMerge,
    type
  })
}

const getState = reducerKey => {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof reduxStore === 'undefined') {
      throw new Error('setReduxStore must be called before calling getState.')
    }
    if (typeof reducerKey !== 'string') {
      throw new Error('getState: The first argument must be a string.')
    }
  }
  return reduxStore.getState()[reducerKey]
}

const generalReducer = (reducerKey, initialState) => {
  return (state = Object.assign({}, initialState), action) => {
    if (action.reducerKey === reducerKey) {
      return Object.assign({}, state, action.objToMerge)
    }
    return state
  }
}

export { register, setState, getState, generalReducer }
