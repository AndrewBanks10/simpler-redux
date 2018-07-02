import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import hoistStatics from 'hoist-non-react-statics'
import getReducerKeyProxy from './proxy'

// Teact lifecycle events supported in the model code.
const reactLifeCycleEvents = {
  onConstructor: 'onConstructor',
  onRender: 'onRender',
  componentDidMount: 'componentDidMount',
  componentWillUnmount: 'componentWillUnmount',
  componentDidCatch: 'componentDidCatch',
  componentToRender: 'componentToRender'
}

//
// Builds a mapDispatchToProps function based on the service functions and adds the store as
// the first parameter to each service function and the rest of the parameters given
// by the react UI component when called in react.
//
export const allServiceFunctionsToPropsWithStore = serviceFunctions =>
  (_dispatch, ownProps) =>
    Object.keys(serviceFunctions).reduce((obj, e) => {
      obj[e] = (...args) => serviceFunctions[e](ownProps.store, ...args)
      return obj
    }, {})

//
// Builds a mapDispatchToProps function based on the service functions and adds
// all of the parameters given by the react UI component when called in react.
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

//
// Builds a mapStateToProps function that returns key/UI State pairs
//
const allStateToPropsUsingUIState = (reducerKey, initialUIState) =>
  state =>
    Object.keys(initialUIState).reduce((obj, e) => {
      obj[e] = state[reducerKey][e]
      return obj
    }, {})

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

const connectWithStoreBase = (
  options
) => {
  let {
    reduxOptions,
    storeIsDefinedCallback,
    reducerKey,
    isDynamicReducer,
    initialState,
    mapStateToProps,
    mapDispatchToProps,
    serviceFunctions,
    uiComponent,
    selectors,
    initialUIState,
    noStoreParameterOnServiceFunctions,
    mergeProps
  } = options

  if (process.env.NODE_ENV !== 'production') {
    if (uiComponent === undefined) {
      throw new Error('connectWithStore: options.uiComponent cannot be undefined.')
    }
    if (isDynamicReducer) {
      if (reducerKey === undefined) {
        throw new Error('To use isDynamicReducer, you must pass in a valid reducerKey as an option to connectWithStore.')
      }
      if (initialState === undefined) {
        throw new Error(`To use isDynamicReducer, you must pass in a reducer initialState as an option to connectWithStore ${reducerKey}.`)
      }
    }
    if (storeIsDefinedCallback && typeof storeIsDefinedCallback !== 'function') {
      throw new Error(`connectWithStore: options.storeIsDefinedCallback must be a function.`)
    }
    if (selectors !== undefined && initialUIState !== undefined) {
      throw new Error('connectWithStore: Cannot export both selectors and initialUIState.')
    }
  }

  const withRef = reduxOptions && reduxOptions.withRef
  if (initialState !== undefined) {
    initialState = { ...initialState }
  }

  // If mapStateToProps is defined by the consumer then keep it no matter what.
  if (mapStateToProps === undefined) {
    if (selectors !== undefined) {
      mapStateToProps = allStateToPropsUsingSelectors(selectors)
    } else if (reducerKey !== undefined && initialUIState !== undefined) {
      mapStateToProps = allStateToPropsUsingUIState(reducerKey, initialUIState)
    }
  }

  // If mapDispatchToProps is defined by the consumer then keep it no matter what.
  if (mapDispatchToProps === undefined && serviceFunctions !== undefined) {
    if (noStoreParameterOnServiceFunctions) {
      mapDispatchToProps = allServiceFunctionsToProps(serviceFunctions)
    } else {
      mapDispatchToProps = allServiceFunctionsToPropsWithStore(serviceFunctions)
    }
  }

  // Call the react-redux connect.
  const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    reduxOptions
  )(uiComponent)

  class HOC extends React.Component {
    constructor (props, context) {
      super(props, context)
      // Handles the dynamic loading of the reducer.
      if (isDynamicReducer) {
        // This will build the reducer and add it to the reducers object.
        this.context.store.addReducer(reducerKey, initialState)
      }
      // Handles a callback for the consumer to cache and/or use the store.
      if (storeIsDefinedCallback) {
        storeIsDefinedCallback(this.context.store, stateAccessors)
      }
      this.setWrappedInstance = this.setWrappedInstance.bind(this)
    }
    // Support the redux connect getWrappedInstance out of this HOC.
    // This way, the consumer does nothing different when using this HOC
    // vs redux connected components when handling refs.
    setWrappedInstance (ref) {
      if (!withRef) {
        return
      }
      // Refer to the original instance of the component wrapped with connect.
      if (ref) {
        if (process.env.NODE_ENV !== 'production') {
          if (typeof ref.getWrappedInstance !== 'function') {
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

//
// This supports moving the react life cycle events into the model/business code serviceFunctions functions object.
//
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
  onConstructor: PropTypes.func,
  onRender: PropTypes.func,
  componentDidMount: PropTypes.func,
  componentWillUnmount: PropTypes.func,
  componentDidCatch: PropTypes.func,
  componentToRender: PropTypes.func.isRequired
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
  if (process.env.NODE_ENV !== 'production') {
    if (options.serviceFunctions === undefined) {
      throw new Error('connectLifeCycleComponentWithStore: You must define and export a serviceFunctions object in the model code in order to use this function.')
    }
  }
  const component = options.uiComponent
  const hookedLCC = props => hookedLifeCycleComponent(component, props)
  const newOptions = { ...options, uiComponent: hookedLCC }
  return connectWithStoreBase(newOptions)
}

//
// Call this instead of the react-redux connect.
//
export const connectWithStore = options => {
  // First decide if the serviceFunctions object contains react lifecycle calls.
  if (options.serviceFunctions !== undefined) {
    const hasLifeCycle = Object.keys(options.serviceFunctions).some(e =>
      reactLifeCycleEvents[e] !== undefined
    )
    if (hasLifeCycle) {
      return connectLifeCycleComponentWithStore(options)
    }
  }
  // No react lifecycle calls.
  return connectWithStoreBase(options)
}
