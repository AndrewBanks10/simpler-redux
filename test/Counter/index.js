import { connectWithStore, allStateToProps } from '../../test/test'
import uiComponent from './view'
import * as modelDefinition from './model'

export default connectWithStore({
  uiComponent,
  ...modelDefinition,
  mapStateToProps: allStateToProps(modelDefinition.reducerKey)
})
