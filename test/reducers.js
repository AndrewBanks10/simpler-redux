import { reducerKey as counterReducerKey, reducer as counterReducer } from './Counter'
import { reducerKey as counter1ReducerKey, reducer as counter1Reducer } from './Counter1'
import { reducerKey as wrapCounter1ReducerKey, reducer as wrapCounter1Reducer } from './WrapCounter1'
import { reducerKey as counter2ReducerKey, reducer as counter2Reducer } from './Counter2'

export default {
  [counterReducerKey]: counterReducer,
  [counter1ReducerKey]: counter1Reducer,
  [counter2ReducerKey]: counter2Reducer,
  [wrapCounter1ReducerKey]: wrapCounter1Reducer
}
