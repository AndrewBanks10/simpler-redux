import React from 'react'
import { Provider } from 'react-redux'
import store from './reduxstore'
import Counter from './Containers/Counter'

const App = () =>
  <Provider store={store}>
    <Counter />
  </Provider>

export default App
