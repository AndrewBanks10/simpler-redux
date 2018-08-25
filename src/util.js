let totalMSTPCalcs = 0
let totalMSTPCache = 0
let useDefaultMSTPCacheOnlyLogging = false

const showMessage = msg =>
  console.log(msg)

export const shallowSubObjectCompare = (obj, subObj, subObjectkeys) => {
  const len = subObjectkeys.length
  for (let i = 0; i < len; ++i) {
    const key = subObjectkeys[i]
    if (subObj[key] !== obj[key]) {
      return false
    }
  }
  return true
}

export const shallowCopy = (obj, copykeys) => {
  if (copykeys === undefined) {
    copykeys = Object.keys(obj)
  }
  let subObj = {}
  const len = copykeys.length
  for (let i = 0; i < len; ++i) {
    const key = copykeys[i]
    subObj[key] = obj[key]
  }
  return subObj
}

const displayMessage = obj => {
  if (!obj.prevState) {
    showMessage(obj.msg)
  } else {
    showMessage(`${obj.msg}
prevState: %onextState: %o`,
    obj.prevState,
    obj.nextState
    )
  }

  // Give the stats as performance feedback to developers.
  showMessage(`totalMSTPCalcs=${totalMSTPCalcs}, totalMSTPCache=${totalMSTPCache}`)
}

const mapStateToPropsCache = obj => {
  totalMSTPCache++
  if (useDefaultMSTPCacheOnlyLogging) {
    showMessage(`totalMSTPCache=${totalMSTPCache}`)
  } else {
    displayMessage(obj)
  }
}

const mapStateToPropsCalc = obj => {
  totalMSTPCalcs++
  if (useDefaultMSTPCacheOnlyLogging) {
    showMessage(`totalMSTPCalcs=${totalMSTPCalcs}`)
  } else {
    displayMessage(obj)
  }
}

export const defaultOptions = options => {
  if (options === undefined) {
    return
  }
  options = { ...options }
  useDefaultMSTPCacheOnlyLogging = options.useDefaultMSTPCacheOnlyLogging
  if (!options.mapStateToPropsCache) {
    options.mapStateToPropsCache = () => { }
  }
  if (!options.mapStateToPropsCalc) {
    options.mapStateToPropsCalc = () => { }
  }
  if (options.useDefaultMSTPCacheLogging || options.useDefaultMSTPCacheOnlyLogging) {
    options.mapStateToPropsCalc = mapStateToPropsCalc
    options.mapStateToPropsCache = mapStateToPropsCache
  }
  return options
}
