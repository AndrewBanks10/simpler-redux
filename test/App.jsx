import React from 'react'
import { Provider } from 'react-redux'
import store from './reduxstore'
import Counter from './Counter'
import Counter2 from './Counter2'
import Counter3 from './Counter3'
import Counter4 from './Counter4'
import Counter5 from './Counter5'
import Counter6 from './Counter6'
import Counter7 from './Counter7'
import Counter8 from './Counter8'
import WrapCounter1 from './WrapCounter1'

export default () =>
  <Provider store={store}>
    <div>
      <Counter testProp={'test'} />
      <WrapCounter1 />
      <Counter2 />
      <Counter3 />
      <Counter4 />
      <Counter5 />
      <Counter6 />
      <Counter7 />
      <Counter8 />
    </div>
  </Provider>
