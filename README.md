### Redux library to simplify and reduce redux code. 

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
// Selectors always take in the entire redux state object like would be available in
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

