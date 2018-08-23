import { connectWithStore } from '../../test/test'
import uiComponent from './view'
import * as modelDefinition from './model'

export default connectWithStore({ uiComponent, ...modelDefinition })
export const selectors = modelDefinition.selectors
export const reducerKey = modelDefinition.reducerKey
