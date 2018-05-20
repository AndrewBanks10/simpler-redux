import { connectWithStore, allServiceFunctionsToProps, allStateToProps } from '../../test/test'
import Counter from '../Views/Counter'
import { serviceFunctions, reducerKey } from '../State Management/Counter'

export default connectWithStore(
  Counter,
  allStateToProps(reducerKey),
  allServiceFunctionsToProps(serviceFunctions)
)
