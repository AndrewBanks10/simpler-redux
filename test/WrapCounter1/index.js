import { connectWithStore, generalReducer } from '../../test/test'
import uiComponent from './view'
import * as modelDefinition from './model'

export default connectWithStore({ uiComponent, ...modelDefinition })
export const reducerKey = modelDefinition.reducerKey
export const reducer = generalReducer(modelDefinition.reducerKey, modelDefinition.initialState)
export const exportedServiceFunctions = modelDefinition.exportedServiceFunctions
