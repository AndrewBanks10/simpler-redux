export const reducerKey = 'counter.10'

let simplerStore
export const storeIsDefinedCallback = store => {
  simplerStore = store
}

export const initialState = {
  remove: true
}

export const selectors = {
  remove: state => state[reducerKey].remove
}

export const exportedServiceFunctions = {
  remove: () =>
    simplerStore.setRState(reducerKey, { remove: true })
}
