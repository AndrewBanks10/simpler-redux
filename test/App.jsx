import React from 'react'
import { Provider } from 'react-redux'
import store from './reduxstore'
import Counter from './Containers/Counter'

export default () =>
  <Provider store={store}>
    <Counter />
  </Provider>
