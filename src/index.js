import {
  makeSharedModuleKeyName,
  stateAccessors,
  buildSelectorsFromUIState,
  setStateFunction,
  getStateFunction,
  generalReducer,
  registerSimplerRedux
} from './simpler-redux'

import {
  connectWithStore,
  connectLifeCycleComponentWithStore,
  allStateToProps,
  allServiceFunctionsToProps
} from './react-simpler-redux'

export {
  makeSharedModuleKeyName,
  stateAccessors,
  setStateFunction,
  getStateFunction,
  generalReducer,
  registerSimplerRedux,
  allStateToProps,
  allServiceFunctionsToProps,
  connectWithStore,
  connectLifeCycleComponentWithStore,
  buildSelectorsFromUIState
}
