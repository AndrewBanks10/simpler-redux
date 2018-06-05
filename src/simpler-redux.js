/*
  Written by Andrew Banks.
*/
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import hoistStatics from 'hoist-non-react-statics'

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

//
// Builds a mapDispatchToProps function based on the service functions and adds the store as
// the first parameter to each service function and the rest of the parameters given
// by the react UI component when called in react.
//
export const allServiceFunctionsToPropsWithStore = serviceFunctions =>
  (dispatch, ownProps) =>
    Object.keys(serviceFunctions).reduce((obj, e) => {
      obj[e] = (...args) => serviceFunctions[e](ownProps.store, ...args)
      return obj
    }, {})

//
// Builds a mapDispatchToProps function based on the service functions and adds
// all of the  parameters given by the react UI component when called in react.
//
export const allServiceFunctionsToProps = serviceFunctions =>
  () =>
    Object.keys(serviceFunctions).reduce((obj, e) => {
      obj[e] = (...args) => serviceFunctions[e](...args)
      return obj
    }, {})

//
// Builds a mapStateToProps function that returns the entire reducer state.
//
export const allStateToProps = reducerKey =>
  state => state[reducerKey]

//
// Builds a mapStateToProps function that returns key/selector pairs
//

export const allStateToPropsUsingSelectors = selectors =>
  state =>
    Object.keys(selectors).reduce((obj, e) => {
      obj[e] = selectors[e](state)
      return obj
    }, {})

const getState = (store, reducerKey) =>
  () => store.getRState(reducerKey)

const setState = (store, reducerKey) =>
  (mergeState, type) => store.setRState(reducerKey, mergeState, type)

//
// Only call this in the storeIsDefinedCallback sent into connectWithStore above.
// Use the store parameter provided in connectWithStore along with the reducerKey in the module.
//
export const stateAccessors = (store, reducerKey) => {
  return {
    getState: getState(store, reducerKey),
    setState: setState(store, reducerKey)
  }
}

export const makeSharedModuleKeyName = (key, options) =>
  `${key}${options.id}`

export const connectWithStore = (
  options
) => {
  options = {...options}
  let storeIsDefinedCallback = options.storeIsDefinedCallback
  if (options.mapStateToProps === undefined && options.selectors !== undefined) {
    options.mapStateToProps = allStateToPropsUsingSelectors(options.selectors)
  }
  if (options.usingStateAccessors) {
    if (process.env.NODE_ENV !== 'production') {
      if (options.serviceFunctions === undefined) {
        throw new Error('connectWithStore: options.serviceFunctions cannot be undefined when specifying options.usingStateAccessors.')
      }
    }
    options.mapDispatchToProps = allServiceFunctionsToProps(options.serviceFunctions)
  } else if (options.mapDispatchToProps === undefined && options.serviceFunctions !== undefined) {
    options.mapDispatchToProps = allServiceFunctionsToPropsWithStore(options.serviceFunctions)
  }
  // call the react-redux connect.
  const ConnectedComponent = connect(
    options.mapStateToProps,
    options.mapDispatchToProps,
    options.mergeProps,
    options.reduxOptions
  )(options.uiComponent)

  class HOC extends React.Component {
    constructor (props, context) {
      super(props, context)
      this.setWrappedInstance = this.setWrappedInstance.bind(this)
    }
    // Support the redux connect getWrappedInstance out of this HOC.
    // This way, the consumer does nothing different when using this HOC
    // vs redux connected components when handling refs.
    setWrappedInstance (ref) {
      if (!options.reduxOptions || !options.reduxOptions.withRef) {
        return
      }
      // Refer to the original instance of the component wrapped with connect.
      if (ref) {
        if (typeof ref.getWrappedInstance !== 'function') {
          if (process.env.NODE_ENV !== 'production') {
            console.log('There is something wrong with redux connect.')
            return
          }
        }
        this.wrappedInstance = ref.getWrappedInstance()
      }
    }
    getWrappedInstance () {
      if (process.env.NODE_ENV !== 'production') {
        if (this.wrappedInstance === undefined) {
          console.log('The getWrappedInstance return is undefined. Did you use the withRef: true option?')
        }
      }
      return this.wrappedInstance
    }
    render () {
      // Handles a callback for the consumer to cache and/or use the store.
      if (storeIsDefinedCallback) {
        storeIsDefinedCallback(this.context.store)
        storeIsDefinedCallback = null
      }
      // Add the store to the props of the redux connected component so that it can be referenced
      // in mapDispatchToProps with ownProps.
      return (
        <ConnectedComponent
          {...this.props}
          ref={this.setWrappedInstance}
          store={this.context.store}
        />
      )
    }
  }

  HOC.displayName = `connectWithStore(${ConnectedComponent.displayName || ConnectedComponent.name})`
  // Opt in for the context.
  HOC.contextTypes = {
    store: PropTypes.object
  }
  return hoistStatics(HOC, ConnectedComponent)
}

// This supports moving the react life cycle events into the model/business code.
class ReactLifeCycleComponent extends React.Component {
  constructor (props) {
    super(props)
    this.runFunction = this.runFunction.bind(this)
    this.runFunction(this.props.onConstructor)
  }
  runFunction (func, args = []) {
    return func ? func.call(this, ...args) : null
  }
  componentDidMount () {
    this.runFunction(this.props.componentDidMount)
  }
  componentWillUnmount () {
    this.runFunction(this.props.componentWillUnmount)
  }
  componentDidCatch (...args) {
    this.runFunction(this.props.componentDidCatch, args)
  }
  render () {
    this.runFunction(this.props.onRender)
    // Render prop
    return this.props.componentToRender()
  }
}

ReactLifeCycleComponent.propTypes = {
  componentToRender: PropTypes.func.isRequired,
  onConstructor: PropTypes.func,
  componentDidMount: PropTypes.func,
  componentWillUnmount: PropTypes.func,
  componentDidCatch: PropTypes.func,
  onRender: PropTypes.func
}

export const hookedLifeCycleComponent = (Component, props = {}) => {
  const {
    onConstructor,
    onRender,
    componentDidMount,
    componentWillUnmount,
    componentDidCatch,
    componentToRender,
    ...propsToPass
  } = props
  return (
    <ReactLifeCycleComponent
      onConstructor={onConstructor}
      onRender={onRender}
      componentDidMount={componentDidMount}
      componentWillUnmount={componentWillUnmount}
      componentDidCatch={componentDidCatch}
      componentToRender={() => <Component {...propsToPass} />}
    />
  )
}

export const connectLifeCycleComponentWithStore = options => {
  const component = options.uiComponent
  const hooked = props => hookedLifeCycleComponent(component, props)
  const newOptions = { ...options, uiComponent: hooked }
  return connectWithStore(newOptions)
}
