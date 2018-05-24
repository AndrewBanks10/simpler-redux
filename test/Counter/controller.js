import { connectWithStore, allServiceFunctionsToPropsWithStore, allStateToProps } from '../../test/test'
import Counter from './view'
import { serviceFunctions, reducerKey, storeIsDefinedCallback } from './model'

export default connectWithStore(
  Counter,
  allStateToProps(reducerKey),
  allServiceFunctionsToPropsWithStore(serviceFunctions),
  undefined,
  undefined,
  storeIsDefinedCallback
)
