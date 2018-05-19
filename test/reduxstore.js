import reducersObject from './reducers'
import { createStore, combineReducers } from 'redux'
import { registerSimplerRedux } from '../lib/simpler-redux'

export default registerSimplerRedux(createStore(combineReducers(reducersObject)))
