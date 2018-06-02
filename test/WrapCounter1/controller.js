import { connectWithStore } from '../../test/test'
import WrapCounter1 from './view'
import { storeIsDefinedCallback, selectors } from './model'

export default connectWithStore({
  uiComponent: WrapCounter1,
  selectors,
  storeIsDefinedCallback
})
