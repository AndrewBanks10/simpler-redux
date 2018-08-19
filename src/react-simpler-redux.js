import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import hoistStatics from 'hoist-non-react-statics'
import { stateAccessors } from './simpler-redux'

// React lifecycle events supported in the model code.
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
export const allServiceFunctionsToPropsWithStore = serviceFunctions => {
  const keys = Object.keys(serviceFunctions)
  return (_dispatch, ownProps) =>
    keys.reduce((obj, e) => {
      obj[e] = (...args) => serviceFunctions[e](ownProps.store, ...args)
      return obj
    }, {})
}

//
// Builds a mapDispatchToProps function based on the service functions and adds
// all of the parameters given by the react UI component when called in react.
//
export const allServiceFunctionsToProps = serviceFunctions =>
  () => ({ ...serviceFunctions })

//
// Builds a mapDispatchToProps function based on a serviceFunctionList object.
// This allows including service functions from various modules.
// The keylist allows selecting only a subset of a module's service functions.
// If keylist is not specified then all service functions will be included.
//
export const allServiceFunctionsToPropsUsingServiceFunctionList = serviceFunctionList => {
  serviceFunctionList = [...serviceFunctionList]
  return (_dispatch, ownProps) =>
    serviceFunctionList.reduce((obj, e) => {
      const keylist = e.keylist ? e.keylist : Object.keys(e.serviceFunctions)
      keylist.forEach(key => {
        if (e.withStore) {
          obj[key] = (...args) => e.serviceFunctions[key](ownProps.store, ...args)
        } else {
          obj[key] = (...args) => e.serviceFunctions[key](...args)
        }
      })
      return obj
    }, {})
}

//
// Builds a mapStateToProps function that returns the entire reducer state.
//
export const allStateToProps = reducerKey =>
  state => state[reducerKey]

//
// Builds a mapStateToProps function based on a selectors object.
//
export const allStateToPropsUsingSelectors = selectors => {
  const keys = Object.keys(selectors)
  return state =>
    keys.reduce((obj, e) => {
      obj[e] = selectors[e](state)
      return obj
    }, {})
}

//
// Builds a mapStateToProps function based on a selectorList object.
// This allows including selectors from various modules.
// The keylist allows selecting only a subset of a module's selectors.
// If keylist is not specified then all selectors will be included.
//
export const allStateToPropsUsingSelectorList = selectorList => {
  selectorList = [...selectorList]
  return state =>
    selectorList.reduce((obj, e) => {
      const keylist = e.keylist ? e.keylist : Object.keys(e.selectors)
      keylist.forEach(key => {
        obj[key] = e.selectors[key](state)
      })
      return obj
    }, {})
}

//
// Builds a model selectors object from either initialUIState or .
// initialUIState should only contain keys that you want in the
// props of the react component.
// This is not for specialized selectors for the UI that require conjunctions or
// selectors from other modules, etc.
// It is only for simple selectors of the nature state => state[reducerKey][stateKey]
//
export const buildSelectorsFromUIState = (reducerKey, initialUIState) => {
  const keys = Object.keys(initialUIState)
  return keys.reduce((obj, e) => {
    obj[e] = state => state[reducerKey][e]
    return obj
  }, {})
}

//
// Builds a mapStateToProps function that returns key/UI State pairs
//
const allStateToPropsUsingUIState = (reducerKey, initialUIState) => {
  const keys = Object.keys(initialUIState)
  return state => {
    const reducerState = state[reducerKey]
    return keys.reduce((obj, e) => {
      obj[e] = reducerState[e]
      return obj
    }, {})
  }
}

const connectWithStoreBase = (
  options
) => {
  let {
    uiComponent,
    reduxOptions,
    storeIsDefinedCallback,
    reducerKey,
    isDynamicReducer,
    initialState,
    mapStateToProps,
    mapDispatchToProps,
    serviceFunctions,
    serviceFunctionList,
    selectors,
    selectorList,
    initialUIState,
    noStoreParameterOnServiceFunctions,
    mergeProps
  } = options

  if (process.env.NODE_ENV !== 'production') {
    if (uiComponent === undefined) {
      throw new Error('connectWithStore: options.uiComponent cannot be undefined.')
    }
    if (storeIsDefinedCallback && typeof storeIsDefinedCallback !== 'function') {
      throw new Error(`connectWithStore: options.storeIsDefinedCallback must be a function.`)
    }
    if (selectors !== undefined && initialUIState !== undefined) {
      throw new Error('connectWithStore: Cannot export both selectors and initialUIState.')
    }
    let displayName = ''
    if (uiComponent !== undefined) {
      if (uiComponent.displayName !== undefined) {
        displayName = uiComponent.displayName
      } else {
        displayName = uiComponent.name
      }
    }
    if (selectorList !== undefined) {
      selectorList.forEach(e => {
        if (e.keylist !== undefined) {
          e.keylist.forEach(key => {
            if (typeof e.selectors[key] !== 'function') {
              throw new Error(`connectWithStore ${displayName}: The selectors key ${key} is not in the selectors ${e.keylist.toString()}.`)
            }
          })
        }
      })
    }
    if (serviceFunctionList !== undefined) {
      serviceFunctionList.forEach(e => {
        if (e.keylist !== undefined) {
          e.keylist.forEach(key => {
            if (typeof e.serviceFunctions[key] !== 'function') {
              throw new Error(`connectWithStore ${displayName}: The serviceFunctions key ${key} is not in the serviceFunctionList ${e.keylist.toString()}.`)
            }
          })
        }
      })
    }
  }

  // Default initialState (reducer state) to initialUIState (component props state).
  if (initialState === undefined) {
    initialState = initialUIState
  }

  // Default initialUIState (component props state) to initialState (reducer state).
  if (initialUIState === undefined) {
    initialUIState = initialState
  }

  const withRef = reduxOptions && reduxOptions.withRef
  if (initialState !== undefined) {
    initialState = { ...initialState }
  }

  // If mapStateToProps is defined by the consumer then keep it no matter what.
  if (mapStateToProps === undefined) {
    if (selectorList !== undefined) {
      mapStateToProps = allStateToPropsUsingSelectorList(selectorList)
    } else if (selectors !== undefined) {
      mapStateToProps = allStateToPropsUsingSelectors(selectors)
    } else if (reducerKey !== undefined && initialUIState !== undefined) {
      // This is for efficiency. initialUIState and initialState are the same so
      // mapStateToProps simply returns the entire reducerKey state.
      if (Object.keys(initialUIState).length === Object.keys(initialState).length) {
        mapStateToProps = allStateToProps(reducerKey)
      } else {
        mapStateToProps = allStateToPropsUsingUIState(reducerKey, initialUIState)
      }
    }
  }

  // If mapDispatchToProps is defined by the consumer then keep it no matter what.
  if (mapDispatchToProps === undefined) {
    if (serviceFunctionList !== undefined) {
      mapDispatchToProps = allServiceFunctionsToPropsUsingServiceFunctionList(serviceFunctionList)
    } else if (serviceFunctions !== undefined) {
      if (noStoreParameterOnServiceFunctions) {
        mapDispatchToProps = allServiceFunctionsToProps(serviceFunctions)
      } else {
        mapDispatchToProps = allServiceFunctionsToPropsWithStore(serviceFunctions)
      }
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
      if (isDynamicReducer !== false && this.context.store.isDynamicReducerLoading()) {
        // This will build the reducer and add it to the reducers object.
        if (reducerKey !== undefined && initialState !== undefined) {
          this.context.store.addReducer(reducerKey, initialState)
        }
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

/*
options object parameter

reducerKey - (required) The key in the redux store for this module
initialState - (required) The initial state that will be used in the reducer for initialization.
initialUIState - (optional) If this is specified then simpler-redux will build a mapStateToProps
  function based on the keys in this object.
selectors - (optional) If this is specified then simpler-redux will build a mapStateToProps
  function based on the selectors object.
selectorList - (Optionsl) An array of {selectors, keylist[list of selector keys]}. This allows
  combining selectors from different modules into one in order to build a mapStateToProps that
  includes key/values from other reducers keys including the component reducer selectors. If you
  specify keylist then you can include only a subset of the selectors indtead of all of them.
serviceFunctions - (optional) If this is specified then simpler-redux will build a mapDispatchToProps
  function based on the keys in this object. These will be the service functions exposed to the
  the react component in the props.
serviceFunctionList` - An array of {serviceFunctions, keylist[list of serviceFunctions keys],
  withStore}. This allows combining serviceFunctions from different modules into one in order
  to build a mapDispatchToProps that includes key/values from other module serviceFunctions.
  The keylist allows you to select only a subset of the associated service functions. The withStore
  set to true will cause the store to be the first parameter for all the service functions when
  called with the UI parameters following after.
noStoreParameterOnServiceFunctions = true (Optional) - By default, simpler-redux injects the store as the
  first parameter when any service function is called by the UI. The UI parameters follow.
  If this is set to true then simpler-redux will not do this store injection.
storeIsDefinedCallback(store, stateAccessors) - (Optional) If this is specified then simpler-redux will call
  this function with the simpler redux store as a parameter when the store becomes available to the react
  component. Use this to call the simpler-redux stateAccessors in order to gain access to
  setState, getState and reducerState.
  Example:
  let setState, reducerState
  export const storeIsDefinedCallback = (store, stateAccessors) =>
    ({setState, reducerState} = stateAccessors(store, reducerKey, initialState))
isDynamicReducer - (Optional) This supports dynamic reducer loading. For this, simpler-redux
    automatically takes care of building the reducer and loading it into the reducers object.

Note: If you present any redux state in the react component then you must define and export either
  a selectors object or an initialUIState object. Otherwise, you will not have any state in
  the props of the react component.
*/
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
