## Redux library to simplify and reduce redux code. 

### Advantages
- Simple react style setState and getState functions for redux state management.
- 100% compatibility with your current react-redux code base.
- Automatic generation of mapStateToProps so that you do not have to write any.
- Automatic generation of mapDispatchToProps so that you do not have to write any.
- Automatic generation of the reducer so that you do not have to write any.
- Reduced code size and code complexity as compared to react-redux.
- Each reducer contains only one compare at each redux state transition which puts a small burden on performance.
- Ability to handle a react component's life cycle events in a simple way in the model code separate from the react UI.
- Complete separation of the UI from the business code according to a MVC standard.
- Simple implementations for shared state management and shared business code without requiring additional reducers.
- Thunk middleware is not required. Asynchronous UI calls are handled in the same way as synchronous UI calls.

### Installation
`npm install simpler-redux`

### Basics
#### _registerSimplerRedux_
**Description**
`registerSimplerRedux(reduxStore)` - Wrap this around your redux `createStore` call. It returns an enhanced reduxStore object with the redux store as its prototype.
**Parameters**
`reduxStore` - The redux store that is returned by createStore.
**Return Value**
A simpler redux store. Add this as a store prop to the react-redux Provider element.

#### _setRState_
**Description**
`simplerReduxStore.setRState(reducerKey, objectToMerge, [type])` - Merge the objectToMerge at the redux state object `reduxState[reducerKey]`.
**Parameters**
-   `reducerKey` - Redux reducer key name. All state transitions will occur at `reduxState[reducerKey]`.
-   `objectToMerge` - This object will be merged at `reduxState[reducerKey]`.
-   `type` - Optional string name to identify the state change. This is the same thing as the action constant. It defaults to the `reducerKey`.

**Return Value**
None

#### _getRState_
**Description**
`simplerReduxStore.getRState(reducerKey)` - Returns the state at  `reduxState[reducerKey]`.
**Parameters**
`reducerKeyName` - Redux reducer key name.
**Return Value**
The state at `reduxState[reducerKey]`.

#### _generalReducer_
**Description**
`generalReducer(reducerKey, initialState)` - Returns a reducer function that manages the redux state transitions at `reduxState[reducerKey]`. Add this and the reducerKeyName to your root reducer object.
**Parameters**
-   `reducerKey` - Redux reducer key name. All state transitions will occur at `reduxState[reducerKey]`.
-   `initialState` - This object will be merged at `reduxState[reducerKey]` for the initial state.

**Return Value**
A reducer function that manages the state transitions at `reducerKey`.

#### _connectWithStore_
**Description**
Applies the redux connect function and returns a react HOC with the simpler-redux store in the props as `props.store`. This connects your UI component with your business code `selectors` and `serviceFunctions`.
```javascript
connectWithStore({
    uiComponent,
    mapStateToProps,
    mapDispatchToProps,
    selectors,
    serviceFunctions,
    mergeProps,
    reduxOptions,
    storeIsDefinedCallback,
    noStoreParameterOnServiceFunctions,
    reducerKey,
    initialUIState
})
```
**Object Parameters**
-   `uiComponent` - The react component that will be wrapped such that service functions and slices of state will be in the props.
-   `mapStateToProps` - You can write your own mapStateToProps but it is recommended that you use the selecters instead. Then a mapStateToProps will be automatically generated, based on the selectors object, and supplied to the redux connect function.
-   `mapDispatchToProps` - You can write your own mapDispatchToProps but it is recommended that you use the serviceFunctions instead. Then a mapDispatchToProps will be automatically generated, based on the serviceFunctions object, and supplied to the redux connect function.
-   `selectors` - The `selectors` is an object of functions that returns slices of the state at the reducerKey. It is used to build a mapStateToProps function for the redux connect. Below is an example.
```javascript
// All keys in selectors will be in the props of the react component.
// Each entry is a function that takes the entire redux state as a parameter
// and then returns a slice of the state[reducerKey].
export const selectors = {
  counter: state => state[reducerKey].counter
}
```
-   `serviceFunctions` - The `serviceFunctions` is an object of functions that cause state changes at the reducerKey. It is used to build a mapDispatvchToProps function for the redux connect. Below is an example.
```javascript
// All keys in serviceFunctions will be in the props of the react component.
// Each entry is a function that takes the simpler-redux store as a parameter
// and then performs state transitions by using store.setRState.
// The functions may be synchronous or asynchronous and thunking middleware
// is not required.
export const serviceFunctions = {
  // Below is an example of an synchronous call.
  increment: store => store.setRState(reducerKey, { counter: store.getRState(reducerKey).counter + 1 }, 'increment')
},
  // Below is an example of an asynchronous call.
  asyncCall: store => {
    store.setRState(reducerKey, { isBusy: true })
    someAsyncCall(
      data => store.setRState(reducerKey, { isBusy: false, data })
    )
  }
```
-   `mergeProps` - Redux connect `mergeProps` parameter.
-   `reduxOptions` - Redux connect `options` parameter.
-   `storeIsDefinedCallback` - Once the module's react component render is called for the first time, this callback will be invoked with the simpler redux store as a parameter. So it will be called before any possible user interactions.
-   `noStoreParameterOnServiceFunctions` - Used in conjunction with `storeIsDefinedCallback`. This will cause simpler-redux to not add the store parameter when calling the service functions. This should not be used for shared modules.
-   `reducerKey` - Used only in conjunction with `initialUIState`. When both of these are specified simpler-redux will build the mapStateToProps function directly from the keys in `initialUIState`.
-   `initialUIState` - Used only in conjunction with `reducerKey`. When both of these are specified simpler-redux will build the mapStateToProps function directly from the keys in `initialUIState`. This can be only used when your react component props only needs state from the declarative state definition `initialUIState`.

**Return Value**
None

#### _connectLifeCycleComponentWithStore_

**Description**
The `connectLifeCycleComponentWithStore` function has the same object parameters as `connectWithStore` above and performs the same functions. However, it also allows you to implement react life cycle events in your `serviceFunctions` object. This allows you to move the react life cycle business code out of the UI and into the business code module. Below is an example of what can be done in `serviceFunctions`.
```javascript
export const serviceFunctions = {
  componentDidMount: store => console.log('componentDidMount'),
  onConstructor: store => console.log('onConstructor'),
  componentWillUnmount: store => console.log('onComponentWillUnmount'),
  onRender: store => console.log('onRender')
}
```

#### _stateAccessors_
**Description**
`stateAccessors(store, reducerKey[, initialState])` - Returns a `setState` and `getState` in an object that provides easier state management without having to provide a store or reducerKey. If you pass in initialState then it will also return reducerState which is a proxy to the reducerKey state. For getting state, reducerState.key is equivalent to getState().key. For setting state, reducerState.key = 1 is equivalent to setState({key: 1}). It is really just syntactic sugar for the getState and setState functions. The funciton stateAccessors should only be called as below in the storeIsDefinedCallback described above. Make sure to supply storeIsDefinedCallback to connectLifeCycleComponentWithStore or connectWithStore.
```javascript
let setState, getState, reducerState
export const storeIsDefinedCallback = store =>
  ({setState, getState, reducerState} = stateAccessors(store, reducerKey, initialState))

// Below are examples of using the functions.
let counter = getState().counter
setState({isBusy: true})
reducerState.counter++
counter = reducerState.counter
reducerState.counter = 10
```
#### _buildSelectorsFromUIState_
**Description**
`buildSelectorsFromUIState(reducerKey, uiInitialState) ` - Builds a  selectors object from uiInitialState and returns that object.
**Parameters**
-   `reducerKey` - Redux reducer key name.
-   `uiInitialState` - uiInitialState should only contain keys that you want in the props of the react component.

**Return Value**
A UI selectors object.

### Similarity to react's component state management
-   State transition
    -   React - `this.setState(objToMerge)`.  React does not guarantee that the state changes are applied immediately.
    - simpler-redux - `simplerReduxStore.setRState(reducerKey, objToMerge, [type])`. This is an immediate command.
-   Get state
    -   React - `let x = this.state.x`
    -   simpler-redux - `let x = simplerReduxStore.getRState(reducerKey)`

### Shared state management support
With shared state management, you can write one module that performs state management and then any simpler-redux MVC module code can simply include the functionality into the initialState, selectors and serviceFunctions by using an import of the shared modules functions and writing just three lines of code.
#### _makeSharedModuleKeyName_
**Description**
`makeSharedModuleKeyName(key, options)` - In order to avoid state and prop key collisions, this function returns the concatenation of the `key` followed by `options.id`.
**Parameters**
- `key` - The key that is used by the shared module as either a state key or service function key.
- `options` - An object with a key suffix at the id key in the object. For example, `options.key ='AsyncModule'`.
- 
**Return Value**
The return value is the concatenation of the `key` followed by `options.id`.

### Sample usage of simpler-redux
The model code is located at `src/Counter/model.js. This code manages the state for the reducerKey. It also is responsible for performing asynchronous operations and managing the state through those transactions. So, the model code contains the state management and the business logic.
```javascript
import { generalReducer } from 'simpler-redux'

export const reducerKey = 'counter.1'
const counterKey = 'counter'

const initialState = {
  [counterKey]: 0
}
// Selectors always take in the entire redux state object.
// So, state[reducerKey] is the state object at the reducerKey.
// simpler-redux constructs a mapStateToProps from this object and
// calls redux connect using the constructed mapStateToProps.
// The keys below will be in the props of the react component.
export const selectors = {
  [counterKey]: state =>
    state[reducerKey][counterKey]
}
// serviceFunctions always takes the simpler-redux enhanced redux store as the first parameter.
// Other parameters supplied by the react component come after.
// simpler-redux constructs a mapDispatchToProps from this object and
// calls redux connect using the constructed mapDispatchToProps.
// The keys below will be in the props of the react conponent and
// whenever the UI call the function in the props like say increment, 
// the increment function below will called with the store as a parameter
// and the UI parameters follow after that.
export const serviceFunctions = {
  increment: store =>
    store.setRState(reducerKey, { [counterKey]: store.getRState(reducerKey)[counterKey] + 1 }, 'increment')
}

// Simpler-redux builds the reducer for you. Add reducerKey and reducer to your global reducer object. 
export const reducer = generalReducer(reducerKey, initialState)
```
The View code is located at src/Counter/view.js. It should only display information received in the props and call functions supplied by the props. This code is responsible for display only. Any functional behavior should be supplied by the model to the controller and then into the props of the view where is is simply called by the view.
```javascript
import React from 'react'

export default ({counter, increment}) =>
  <div>
    <div>Counter: {counter}</div>
    <button onClick={increment}>Increment</button>
  </div>
```
The controller code is located at `src/Counter/controller.js`. This is generally the same for all controllers so it is basically a copy and paste.
```javascript
import {connectWithStore} from 'simpler-redux'
import Component from './view'
import { selectors, serviceFunctions } from './model'

// Use connectLifeCycleComponentWithStore to handle react life cycle events in the serviceFunctions object in the model code.
export default connectWithStore({
  uiComponent: Component,
  selectors,
  serviceFunctions
})
```
Note that the above controller code does not contain any intelligence. Its purpose is simply to connect the model code to the view code without knowing anything about the details of either's implementions. Therefore, this technique removes any side effects of changing the model code or underlying state. Also, this code can be copy and pasted for any component because it does the same thing for most simpler-redux component modules.
The src/Counter/index.js code exports features of the simpler-redux MVC module to the outside.
```javascript
import Container from './controller'
import { reducerKey, reducer } from './model'
export default Container
export { reducerKey, reducer }
```
Note above that index.js and controller.js are going to be pretty much the same for any simpler-redux MVC module. So, you really only have to write the model.js and view.jsx code.

The reducer code located at `src/reducers.js`.
```javascript
import { reducerKey as counterReducerKey, reducer as counterReducer } from './Counter'

export default {
  [counterReducerKey]: counterReducer
}
```
The redux store code is located at `src/reduxstore.js`.
```javascript
import reducersObject from './reducers'
import { createStore, combineReducers } from 'redux'
import { registerSimplerRedux } from 'simpler-redux'

export default registerSimplerRedux(createStore(combineReducers(reducersObject)))
```
Last, below is the App code located at `src/App.jsx`.
```javascript
import React from 'react'
import { Provider } from 'react-redux'
import store from './reduxstore'
import Counter from './Counter'

export default () =>
  <Provider store={store}>
    <Counter />
  </Provider>
```
### Sample usage of simpler-redux shared state management code
##### Shared module
Below is the style of code that would be written for shared state management. The state keys and service function keys all will have an input module id appended to the end of the keys. This prevents key collisions in the props of react components and keys in the reducer key state.
```javascript
import { makeSharedModuleKeyName } from 'simpler-redux'
const counterKey = 'counter'
const incrementKey = 'increment'

const makeCounterKey = options =>
  makeSharedModuleKeyName(counterKey, options)

// The key below is 'counter' + options.id. This way the consumer of the
// shared module can make the keys what they want to avoid key collisions.
export const getInitialState = options => ({
  [makeCounterKey(options)]: 0
})

// The key below is 'counter' + options.id
export const getSelectors = (reducerKey, options) => {
  return {
    [makeCounterKey(options)]: state => state[reducerKey][makeCounterKey(options)]
  }
}

// All shared module serviceFunction functions have the following signature.
export const getServiceFunctions = (reducerKey, options) => {
  return {
    [makeSharedModuleKeyName(incrementKey, options)]: store => {
      // Change the state at 'counter' + options.id 
      store.setRState(
        reducerKey,
        { [makeCounterKey(options)]: store.getRState(reducerKey)[makeCounterKey(options)] + 1 }
      )
    }
  }
}
```
##### Consumer module
Next is the code that consumes the above shared module.
```javascript
import { generalReducer } from 'simpler-redux'
import {
  getServiceFunctions as sharedCounterGetServiceFunctions,
  getSelectors as sharedCounterGetSelectors,
  getInitialState as sharedCounterInitialState
} from '../SharedModel/Counter'

export const reducerKey = 'counter.1'
const asyncModuleId = 'CounterModule'
const baseOptions = { id: asyncModuleId }

const initialState = {
  ...sharedCounterInitialState(baseOptions)
}

export const selectors = {
  ...sharedCounterGetSelectors(reducerKey, baseOptions)
}

export const serviceFunctions = {
  ...sharedCounterGetServiceFunctions(reducerKey, baseOptions)
}

export const reducer = generalReducer(reducerKey, initialState)
```
Here are the advantages of the above implementation.
1. No additional reducers are required which would degrade performance.
2. The consumer does not participate in the state management.
3. Your organization can collect this sharable state management code into libraries so that you do not have to repeat yourself in various projects.
4. The sharable code and the consumer code share the same paradigm (initialState, selectors, serviceFunctions). Therefore, the code is easy to understand.
5. This technique is simpler and easier to maintain as compared to the shared state management of redux.

So with simpler-redux state management you only need to think about three simple concepts:
1. initialState to initialize the state at the reducer key.
2. selectors to get slices of the current state at the reducer key.
3. serviceFunctions to state transition slices of the current state at the reducer key or call asynchronous functions.

Note that simpler-redux also converts react-redux into an MVC implementation for the react UI. As most will know, MVC is the correct way to implement user interface code. In the simpler-redux case, MVC is as follows.
1. The view is the stateless react component.
2. The model is the state management and service function code.
3. The controller is responsible for providing the connections between the view and model.
