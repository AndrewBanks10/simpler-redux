import { connectLifeCycleComponentWithStore, allStateToProps } from '../../test/test'
import Counter from './view'
import { serviceFunctions, reducerKey, storeIsDefinedCallback } from './model'

export default connectLifeCycleComponentWithStore({
  uiComponent: Counter,
  mapStateToProps: allStateToProps(reducerKey),
  serviceFunctions,
  storeIsDefinedCallback
})
