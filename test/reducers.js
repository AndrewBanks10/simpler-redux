import { reducerKey as counterReducerKey, reducer as counterReducer } from './Counter'
import { reducerKey as counter1ReducerKey, reducer as counter1Reducer } from './Counter1'
import { reducerKey as wrapCounter1ReducerKey, reducer as wrapCounter1Reducer } from './WrapCounter1'

export default {
  [counterReducerKey]: counterReducer,
  [counter1ReducerKey]: counter1Reducer,
  [wrapCounter1ReducerKey]: wrapCounter1Reducer
}
