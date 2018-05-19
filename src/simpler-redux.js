/*
  Written by Andrew Banks.
*/
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const makeSetRState = reduxStore => {
  return (reducerKey, objToMerge, type) => {
    if (typeof type === 'undefined') {
      type = reducerKey
    }
    if (process.env.NODE_ENV !== 'production') {
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
}

const makeGetRState = reduxStore => {
  return reducerKey => {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducerKey !== 'string') {
        throw new Error('getState: The first argument must be a string.')
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
    if (action.reducerKey === reducerKey) {
      return { ...state, ...action.objToMerge }
    }
    return state
  }
}

export const connectWithStore = (
  WrappedComponent,
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  options
) => {
  const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    options
  )(WrappedComponent)

  class HOC extends React.Component {
    render () {
      return (
        <ConnectedComponent
          {...this.props}
          store={this.context.store}
        />
      )
    }
  }
  HOC.contextTypes = {
    store: PropTypes.object
  }
  return HOC
}

export const getStateFunction = reducerKey =>
  (state, value) =>
    state[reducerKey][value]

export const setStateFunction = reducerKey =>
  (store, mergeState, key) =>
    store.setRState(reducerKey, mergeState, key)
