import React from 'react'
import { Provider } from 'react-redux'
import store from './reduxstore'
import Counter from './Counter'
import WrapCounter1 from './WrapCounter1'

export default () =>
  <Provider store={store}>
    <div>
      <Counter testProp={'test'} />
      <WrapCounter1 />
    </div>
  </Provider>
