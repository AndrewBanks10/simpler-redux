import { connectLifeCycleComponentWithStore } from '../../test/test'
import uiComponent from './view'
import { serviceFunctions, reducerKey, initialState, storeIsDefinedCallback } from './model'

export default connectLifeCycleComponentWithStore({
  uiComponent,
  initialUIState: initialState,
  reducerKey,
  serviceFunctions,
  storeIsDefinedCallback,
  noStoreParameterOnServiceFunctions: true
})
