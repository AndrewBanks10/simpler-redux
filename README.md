## Redux library to simplify and reduce redux code. 

### Advantages
- Eliminates the redux asynchrouous problem. Thunk libraries are unnecessary.
- Similar interface as react's component state management.
- Eliminates the need for writing reducers.
- Eliminates the need for action constants.
- Simplifies your state management code.
- Simple to integrate with your existing react/redux project.

### Installation
`npm install --save simpler-redux`

### Basics
1. `registerSimplerRedux(reduxStore)` - Wrap this around your redux `createStore` call. It returns an enhanced reduxStore object with the redux store as its prototype. 
2. `reduxStore.setRState(reducerKeyName, objectToMerge, [type])` - Merge the objectToMerge at the redux state object `reduxState[reducerKeyName]`.
    -   `reducerKeyName` - Redux reducer key name. All state transitions will occur at `reduxState[reducerKeyName]`.
    -   `objectToMerge` - This object will be merged at `reduxState[reducerKeyName]`.
    -   `type` - Optional string name to identify the state change. This is the same thing as the action constant.
3. `reduxStore.getRState(reducerKeyName)` - Returns the state at  `reduxState[reducerKeyName]`.
4. `generalReducer(reducerKeyName, initialState)` - Returns a reducer that manages the redux state transitions at `reduxState[reducerKeyName]`. Add this to your root reducer object.
    -   `reducerKeyName` - Redux reducer key name. All state transitions will occur at `reduxState[reducerKeyName]`.
    -   `initialState` - This object will be merged at `reduxState[reducerKeyName]` for the initial state.
5. `connectWithStore(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    options)` - Applies the redux connect function and returns a react HOC with the redux store in the props as `props.store`. Then the ownProps argument of the mapDispatchToProps function will contain the redux store. See the example below.

### Similarity to react's component state management
-   State transition
    -   React - `this.setState(objToMerge)`.  React does not guarantee that the state changes are applied immediately.
    - simpler-redux - `reduxStore.setRState(reducerKey, objToMerge, [type])`. This is an immediate command.
-   Get state
    -   React - `let x = this.state.x`
    -   simpler-redux - `let x = reduxStore.getRState(reducerKey)`

### Sample usage
Container code located at `src/Containers/Counter.js
```javascript
import {connectWithStore} from 'simpler-redux'
import Counter from '../Views/Counter'
import { selectors, setters } from '../StateManagement/Counter'

const mapStateToProps = state =>
  ({counter: selectors.getCounter(state)})

const mapDispatchToProps = (dispatch, ownProps) =>
  ({increment: () => setters.increment(ownProps.store)})

export default connectWithStore(
  Counter,
  mapStateToProps,
  mapDispatchToProps
)
```
State management code located at `src/StateManagement/counter.js
```javascript
export const reducerKey = 'counter.1'
const counterKey = 'counter'

export const initialState = {
  [counterKey]: 0
}
// Selectors always take in the entire redux state object as would be available in
// mapStateToProps.
export const selectors = {
  getCounter: state =>
    state[reducerKey][counterKey]
}
// Setters always take in the simpler-redux enhanced redux store as would be
// available in mapDispatchToProps at the second argument ownProps.store.
export const setters = {
  increment: store =>
    store.setRState(reducerKey, { [counterKey]: store.getRState(reducerKey)[counterKey] + 1 }, 'increment')
}

```
View code located at src/Views/counter.js
```javascript
import React from 'react'
export default ({counter, increment}) =>
  <div>
    <div>Counter: {counter}</div>
    <button onClick={increment}>Increment</button>
  </div>
```
Reducer code located at `src/reducers.js`. Simpler-redux builds the reducer for you.
```javascript
import { generalReducer } from 'simpler-redux'
import { initialState as counterInitialState, reducerKey as counterReducerKey } from './StateManagement/Counter'

export default {
  [counterReducerKey]: generalReducer(counterReducerKey, counterInitialState)
}
```
Redux store code located at `src/reduxstore.js`.
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
import Counter from './Containers/Counter'

export default () =>
  <Provider store={store}>
    <Counter />
  </Provider>
```

So, with simpler-redux the abstraction is the same as with the state management logic of react, you think in terms of transitioning the state and getting the current state. On the other hand in redux, you think in terms of action constants, action creators and reducers which is clearly more complex leading to more complex and harder to maintain code.

Moreover, take a look at the path to state transition generated by simpler-redux. When you perform the increment function above, this translates to the following.

```javascript
const makeSetRState = reduxStore => {
  return (reducerKey, objToMerge, type) => {
    reduxStore.dispatch({
      reducerKey,
      objToMerge,
      type
    })
  }
}
```
So, makeSetRState calls redux dispatch with the reducerKey given in the action object. The general reducer supplied by simpler-redux is below.
```javascript
export const generalReducer = (reducerKey, initialState) => {
  return (state = { ...initialState }, action) => {
    if (action.reducerKey === reducerKey) {
      return { ...state, ...action.objToMerge }
    }
    return state
  }
}
```
Note the simplicity and the only test performed by the reducer is to compare the reducerKey to the reducerKey in the closure of the general reducer.

Consider the problem with the design of redux. It encourages you to place a collection of action compare case statements in the reducer and every reducer is run for every state transition. So, as your app becomes larger, it will eventually become the case that there will be a delay between a user caused state change to viewing that state change because of the large number of compares that must be performed in the reducers. So, simpler-redux helps alleviate this design flaw since only one compare is required per reducer.

In addition, assume you wanted to share reducer logic under redux. Then the "redux way" is to create a reducer factory that accepts a prefix to the action constant and then returns a reducer with that prefix in the closure. But, this method also increases the number of reducers thereby reducing performance even more.

However, take a look at the simpler-redux way of sharing state management code. Although it is silly, the below will create sharable increment state management code to demonstrate its effectiveness.

Below is the sharable code.

```javascript
let defaultKey = 'counter'

export const setDefaultKey = key =>
  (defaultKey = key)

export const getInitialState = () => ({
  [defaultKey]: 1
})

export const selectors = {
  getCounter: (state, reducerKey) => 
    (state[reducerKey][defaultKey])
}

export const setters = {
  increment: (store, reducerKey) =>
    store.setRState(reducerKey, { [defaultKey]: store.getRState(reducerKey)[defaultKey] + 1 }, 'increment')
}
```
The sharable code manages the state at the defaultKey given a reducerKey. This defaultKey can be changed from consumer code with setDefaultKey in the event that this key conflicts with the current app.

Next is the code that consumes the above.
```javascript
import {
  getInitialState as commonGetinitialState,
  selectors as commonSelectors,
  setters as commonSetters
} from './Common/Counter'

export const reducerKey = 'counter.2'

// Initialize the state at the managed key as required by the sharable code.
export const initialState = {
  ...commonGetinitialState()
}

// Make calls to the sharable code to get the current state.
export const selectors = {
  getCounter: state =>
    commonSelectors.getCounter(state, reducerKey)
}

// Make calls to the sharable code to transition the current state.
export const setters = {
  increment: store =>
    commonSetters.increment(store, reducerKey)
}
```

Here are the advantages of the above implementation.
1. No additional reducers are required which would degrade performance.
2. The consumer does not participate in the state management at the defaultKey thereby satisfying a separation of concerns.
3. Your organization can collect this sharable state management code into libraries so that you do not have to repeat yourself in various projects.
4. The sharable code and the consumer code share the same paradigm (initialState, selectors, setters). Therefore, the code is easy to understand.
5. This technique is simpler and easier to maintain as compared to the "redux way".

So with simpler-redux state management you only need to think about three simple concepts:
1. initialState to initialize the state at the reducer key.
2. selectors to get slices of the current state at the reducer key.
3. setters to state transition slices of the current state at the reducer key.