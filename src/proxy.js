const proxyDefined = () =>
  typeof Proxy !== 'undefined'

const getReducerKeyValue = (simplerReduxStore, reducerKey, key) => {
  return simplerReduxStore.getRState(reducerKey)[key]
}

const setReducerKeyValue = (simplerReduxStore, reducerKey, key, value) => {
  simplerReduxStore.setRState(reducerKey, { [key]: value })
  return true
}

const defineProxyGetSet = (obj, simplerReduxStore, reducerKey, key) => {
  Object.defineProperty(
    obj,
    key, {
      get: () =>
        getReducerKeyValue(simplerReduxStore, reducerKey, key),
      set: value =>
        setReducerKeyValue(simplerReduxStore, reducerKey, key, value)
    }
  )
}

const simulateProxy = (simplerReduxStore, reducerKey, initialState) => {
  const obj = {}
  Object.keys(initialState).forEach(key => {
    defineProxyGetSet(obj, simplerReduxStore, reducerKey, key)
  })
  return obj
}

const getProxyHandler = reducerKey => {
  return {
    get: (simplerReduxStore, key) =>
      getReducerKeyValue(simplerReduxStore, reducerKey, key),
    set: (simplerReduxStore, key, value) =>
      setReducerKeyValue(simplerReduxStore, reducerKey, key, value)
  }
}

export default (simplerReduxStore, reducerKey, initialState) => {
  if (proxyDefined()) {
    return new Proxy(simplerReduxStore, getProxyHandler(reducerKey))
  }
  return simulateProxy(simplerReduxStore, reducerKey, initialState)
}
