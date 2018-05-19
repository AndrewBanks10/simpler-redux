import { generalReducer } from '../lib/simpler-redux'
import { initialState as counterInitialState, reducerKey as counterReducerKey } from './State Management/Counter'

export default {
  [counterReducerKey]: generalReducer(counterReducerKey, counterInitialState)
}
