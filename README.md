### Redux library to simplify and reduce redux code. 

### Advantages
- Eliminates the redux asynchrouous problem. Thunk libraries are unnecessary.
- Similar interface as react's component state management.
- Eliminates the need for reducers.
- Eliminates the need for action constants.
- Simplifies your state management code.
- Simple to integrate with your existing react/redux project.

### Installation
`npm install --save simpler-redux`

### Basics
1. `register(reduxStore)` - Call this right after redux `createStore`.
2. `setState(reducerKeyName, objectToMerge, [type])` - Merge the objectToMerge at the redux state object `reduxState[reducerKeyName]`.
    -   `reducerKeyName` - Redux reducer key name. All state transitions will occur at `reduxState[reducerKeyName]`.
    -   `objectToMerge` - This object will be merged at `reduxState[reducerKeyName]`.
    -   `type` - Optional string name to identify the state change. This is the same thing as the action constant.
3. `getState(reducerKeyName)` - Returns the state at  `reduxState[reducerKeyName]`.
4. `generalReducer(reducerKeyName, initialState)` - Returns a reducer that manages the redux state transitions at `reduxState[reducerKeyName]`. Use this in your root reducer object.
    -   `reducerKeyName` - Redux reducer key name. All state transitions will occur at `reduxState[reducerKeyName]`.
    -   `initialState` - This object will be merged at `reduxState[reducerKeyName]` for the initial state.

### Similarity to react's component state management
-   State transition
    -   React - `this.setState(objToMerge)`.  React does not guarantee that the state changes are applied immediately.
    - simpler-redux - `setState(reducerKey, objToMerge, [type])`. This is an immediate command.
-   Get state
    -   React - `let x = this.state.x`
    -   simpler-redux - `let x = getState(reducerKey)`
### Usage
First, perform the following where you configure your redux store.
```javascript
import { register } from 'simpler-redux'

const reduxStore = createStore(combineReducers(reducersObject))
register(reduxStore)
```
The above completely integrates simpler-redux with your current redux project.

Use the below in your traditional action file.
```javascript
import { setState, getState } from 'simpler-redux'

// Note that a reducerKey must be defined.
export const reducerKey = 'AsyncApp'

// You normally do this.
export const initialState = {
  subreddit: 'reactjs'
}

// Calling selectSubreddit will do all the work to change the redux state at the key reducerKey according to the redux state transition methods.
export const selectSubreddit = subreddit =>
  setState(reducerKey, {subreddit}, 'selectSubreddit')
```
Note above, to transition the redux state at reduxState['AsyncApp'] so that the key subreddit is changed in reduxState['AsyncApp'], call selectSubreddit as above. Note that the "type" is 'selectSubreddit'. So your redux logging function will record a type of 'selectSubreddit' which makes it easier to directly identify exactly where the state was changed.
The code `setState(reducerKey, {subreddit}, 'selectSubreddit')` translates first to the following.
```javascript
reduxStore.dispatch({
  reducerName,
  objToMerge,
  type
})
```
For this case,
- reducerName === 'AsyncApp'
- objToMerge === {subreddit}
- type === 'selectSubreddit'

The simpler-redux general reducer for 'AsyncApp' is called by redux and the following is performed.
```javascript
// Note that reducerKey is in the closure for the below function that was built by simpler-redux.
function (state, action) {
  if (action.reducerKey === reducerKey) {
    return Object.assign({}, state, action.objToMerge)
  }
  return state
}
```
You no longer need to define reducers since simpler-redux builds your reducers for you. So, in your global reducer collection file, perform the following.
```javascript
import { generalReducer } from 'simpler-redux'
import { initialState as asyncAppInitialState, reducerKey as asyncAppReducerKey } from '../Actions/AsyncApp'

const reducersObject = {
  [asyncAppReducerKey]: generalReducer(asyncAppReducerKey, asyncAppInitialState)
}

export default reducersObject
```
Finally, your mapDispatchToProps will no longer need to call dispatch. So, your react component would perform the following.
```javascript
import {
  selectSubreddit
} from '../Actions/AsyncApp'

const mapDispatchToProps = () => {
  return {
    selectSubreddit: subreddit => {
      selectSubreddit(subreddit)
    }
  }
}
```
