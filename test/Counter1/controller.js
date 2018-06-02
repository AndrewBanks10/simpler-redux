import { connectLifeCycleComponentWithStore } from '../../test/test'
import Counter1 from './view'
import { serviceFunctions, selectors } from './model'

export default connectLifeCycleComponentWithStore({
  uiComponent: Counter1,
  selectors,
  serviceFunctions
})
